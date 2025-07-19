import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/config/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).end();

    const { id, name, address, phone, paymentMethod, rol } = req.body;
    const data: any = {};
    if (name) {data.name = name;}
    if (address) {data.direccion = address;}
    if (phone) {data.celular = phone;}
    if (paymentMethod) {data.metodoPago = paymentMethod;}
    if (rol && (session.user?.role === "ADMIN" || session.user?.role === "admin")) data.rol = rol;

    const where = id && (session.user?.role === "ADMIN" || session.user?.role === "admin")
      ? { id }
      : { email: session?.user?.email || '' };

    await prisma.user.update({
        where,
        data,
    });
    res.status(200).json({ ok: true });
}