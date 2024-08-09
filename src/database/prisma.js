import { PrismaClient } from '@prisma/client';
import { logger } from '../provider/logger.js';

export const prisma = new PrismaClient({
  log: [
    // { emit: "event", level: "query" },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ],
});

prisma.$on('error', (e) => {
  logger.error(e.message || e);
});

prisma.$on('warn', (w) => {
  logger.warning(w.message || w);
});

// prisma.$on("query", (q) => {
//     logger.query(q)
// })

prisma.$on('info', (i) => {
  logger.info(i.message || i);
});
