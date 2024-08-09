import { prisma } from '../database/prisma.js';

class TxRepository {
  static create = (
    account_id,
    amount,
    description,
    type,
  ) => {
    const tx = prisma.transaction.create({
      data: {
        account: {
          connect: {
            id: account_id,
          },
        },
        amount: amount,
        description: description,
        type: {
          connect: {
            id: type,
          },
        },
      },
      select: {
        id: true,
        amount: true,
        description: true,
        type: {
          select: {
            id: true,
            description: true,
          },
        },
        account: {
          select: {
            id: true,
            number: true,
            type: {
              select: {
                id: true,
                description: true,
              },
            },
          },
        },
      },
    });

    return tx;
  };

  static find = (tx_id) => {
    const tx = prisma.transaction.findUnique({
      where: {
        id: tx_id,
      },
      select: {
        id: true,
        amount: true,
        description: true,
        type: {
          select: {
            id: true,
            description: true,
          },
        },
        account: {
          select: {
            id: true,
            number: true,
            type: {
              select: {
                id: true,
                description: true,
              },
            },
          },
        },
      },
    });

    return tx;
  };

  static findAll = () => {
    const tx = prisma.transaction.findMany({
      select: {
        id: true,
        amount: true,
        description: true,
        type: {
          select: {
            id: true,
            description: true,
          },
        },
        account: {
          select: {
            id: true,
            number: true,
            type: {
              select: {
                id: true,
                description: true,
              },
            },
          },
        },
      },
    });

    return tx;
  };
}

export default TxRepository;
