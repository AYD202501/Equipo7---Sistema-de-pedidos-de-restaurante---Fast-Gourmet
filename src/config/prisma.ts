// Ruta del archivo: src/config/prisma.ts

import { PrismaClient } from '@prisma/client';

// Esta variable global almacenará la instancia de Prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// Creamos una única instancia de PrismaClient y la reutilizamos.
// Si 'global.prisma' no existe, crea una nueva. Si existe, la reutiliza.
const prisma = global.prisma || new PrismaClient();

// En un entorno que no sea de producción, asignamos la instancia a la variable global.
// Esto evita que Next.js cree una nueva instancia con cada recarga en caliente (hot-reload).
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;