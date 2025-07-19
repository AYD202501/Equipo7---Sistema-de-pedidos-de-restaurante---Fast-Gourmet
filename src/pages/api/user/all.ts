import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/config/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  const session = await getServerSession(req, res, authOptions);
  const userRole = session?.user?.role;
  if (!session || (userRole !== "admin" && userRole !== "ADMIN")) return res.status(401).end();

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      direccion: true,
      celular: true,
      rol: true,
    },
  });
  res.status(200).json(users);
}
