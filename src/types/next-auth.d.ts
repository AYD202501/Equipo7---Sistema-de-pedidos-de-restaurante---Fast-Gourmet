// src/types/next-auth.d.ts
import { DefaultSession } from "next-auth";

// Extiende el módulo 'next-auth' para añadir nuestras propiedades personalizadas
declare module "next-auth" {
  /**
   * Este es el tipo para el objeto de la sesión que se devuelve
   * desde useSession(), getSession(), etc.
   */
  interface Session {
    user?: {
      id: string;
      role: string; // Aquí definimos el tipo para 'role'
    } & DefaultSession["user"]; // Mantenemos las propiedades originales (name, email, image)
  }
}