import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const session = await getServerSession(req, res, authOptions);
  if (!session || (session.user?.role !== "ADMIN" && session.user?.role !== "admin")) return res.status(401).end();

  const { id } = req.body;
  if (!id) return res.status(400).json({ error: "Falta el id del usuario" });

  await prisma.user.delete({ where: { id } });
  res.status(200).json({ ok: true });
}
