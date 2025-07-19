import NextAuth, { NextAuthOptions } from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@/config/prisma'

export const authOptions: NextAuthOptions = {
    // Activa los logs de depuración de next-auth
    debug: true,

    adapter: PrismaAdapter(prisma),

    providers: [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID || '',
            clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
            issuer: process.env.AUTH0_ISSUER_BASE_URL
        })
    ],

    // Forzamos la estrategia a JWT para tener más control
    session: {
        strategy: "jwt",
    },

    callbacks: {
        // Este callback se llama cuando se crea o actualiza un token JWT
        async jwt({ token, user, account, profile }) {
            console.log("--- JWT CALLBACK ---");
            console.log("TOKEN:", JSON.stringify(token, null, 2));
            console.log("USER:", JSON.stringify(user, null, 2));
            console.log("ACCOUNT:", JSON.stringify(account, null, 2));
            console.log("PROFILE:", JSON.stringify(profile, null, 2));

            // Si es un inicio de sesión nuevo, persistimos el rol y el id en el token
            if (user) {
                // Si el usuario tiene email 'admin', sincroniza el rol en la base de datos
                if (user.email === 'admin') {
                    try {
                        await prisma.user.update({
                            where: { email: 'admin@admin.com' },
                            data: { rol: 'ADMIN' },
                        });
                        token.role = 'ADMIN';
                    } catch (e) {
                        console.error('Error actualizando rol admin:', e);
                    }
                } else {
                    token.role = (user as any).rol;
                }
                token.id = user.id;
                token.direccion = (user as any).direccion;
                token.celular = (user as any).celular;
                token.metodoPago = (user as any).metodoPago;
            }
            return token;
        },

        // Este callback se llama para crear el objeto de sesión que verá el cliente
        async session({ session, token }) {
            console.log("--- SESSION CALLBACK ---");
            console.log("SESSION ANTES:", JSON.stringify(session, null, 2));
            console.log("TOKEN RECIBIDO:", JSON.stringify(token, null, 2));

            // Añadimos los datos del token a la sesión
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.direccion = token.direccion as string;
                session.user.celular = token.celular as string;
                session.user.metodoPago = token.metodoPago as string;
            }

            console.log("SESSION DESPUÉS:", JSON.stringify(session, null, 2));
            return session;
        }
    },

    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);