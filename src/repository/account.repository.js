import { prisma } from '../database/prisma.js';
import generateNumericId from '../provider/crypto.js';

class AccountRepository {
  static create = (
    user_id,
    interest_rate,
    type,
  ) => {
    const account = prisma.account.create({
      data: {
        user: {
          connect: {
            id: user_id,
          },
        },
        number: generateNumericId(10),
        balance: 0,
        interest_rate: interest_rate,
        type: {
          connect: {
            id: type,
          },
        },
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            email: true,
            is_verified: true,
          },
        },
        number: true,
        balance: true,
        interest_rate: true,
        type: {
          select: { id: true, description: true },
        },
      },
    });

    return account;
  };

  static find = (account_id, user_id) => {
    const account = prisma.account.findFirst({
      where: {
        id: account_id,
        user_id: user_id || null,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            email: true,
            is_verified: true,
          },
        },
        number: true,
        balance: true,
        interest_rate: true,
        type: {
          select: {
            id: true,
            description: true,
          },
        },
      },
    });

    return account;
  };

  static findByUserId = (user_id, type) => {
    const account = prisma.account.findFirst({
      where: {
        user: { id: user_id },
        type: { id: type },
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            email: true,
            is_verified: true,
          },
        },
        number: true,
        balance: true,
        interest_rate: true,
        type: {
          select: {
            id: true,
            description: true,
          },
        },
      },
    });

    return account;
  };

  static findByNumber = (number) => {
    const account = prisma.account.findFirst({
      where: { number: number },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            email: true,
            is_verified: true,
          },
        },
        number: true,
        balance: true,
        interest_rate: true,
        type: {
          select: {
            id: true,
            description: true,
          },
        },
      },
    });

    return account;
  };

  static findAll = (user_id) => {
    const accounts = prisma.account.findMany({
      where: { user: { id: user_id } },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            email: true,
            is_verified: true,
          },
        },
        number: true,
        balance: true,
        interest_rate: true,
        type: {
          select: {
            id: true,
            description: true,
          },
        },
      },
    });

    return accounts;
  };

  static updateBalance = (
    account_id,
    number,
    balance,
  ) => {
    const account = prisma.account.update({
      where: { id: account_id, number: number },
      data: { balance: balance },
      select: {
        id: true,
        user: { select: { id: true } },
        number: true,
      },
    });

    return account;
  };
}

export default AccountRepository;
