import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const session = await getServerSession(req, res, authOptions);
  const userRole = session?.user?.role;
  if (!session || (userRole !== "admin" && userRole !== "ADMIN")) return res.status(401).end();

  const { name, email, image, direccion, celular, rol } = req.body;
  if (!name || !email || !rol) return res.status(400).json({ error: "Faltan campos obligatorios" });

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        image,
        direccion,
        celular,
        rol,
      },
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ error: "No se pudo crear el usuario. ¿Email ya registrado?" });
  }
}
