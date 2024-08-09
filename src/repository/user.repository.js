import hashing from '../provider/bcrypt.js';
import { prisma } from '../database/prisma.js';

class UserRepository {
  static create = (email, password, pin) => {
    const user = prisma.user.create({
      data: {
        email: email,
        password: hashing(password),
        pin: hashing(pin),
      },
      select: {
        id: true,
        email: true,
        is_verified: true,
      },
    });

    return user;
  };

  static findById = (id) => {
    const user = prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        is_verified: true,
      },
    });

    return user;
  };

  static findByEmail = (email) => {
    const user = prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        is_verified: true,
      },
    });

    return user;
  };

  static findAll = () => {
    const user = prisma.user.findMany({
      select: {
        id: true,
        email: true,
        is_verified: true,
        addresses: true,
        accounts: true,
      },
    });

    return user;
  };

  static update = (id, data) => {
    const updateData = {};
    if (data.email) updateData.email = data.email;
    if (data.password) {
      updateData.password = hashing(
        data.password,
      );
    }
    if (data.pin) {
      updateData.pin = hashing(data.pin);
    }

    const user = prisma.user.update({
      where: { id: id },
      data: {
        email: updateData.email,
        password: updateData.password,
        pin: updateData.pin,
      },
      select: {
        id: true,
        email: true,
        is_verified: true,
      },
    });

    return user;
  };

  static _findUser = (email) => {
    const user = prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        is_verified: true,
        password: true,
      },
    });

    return user;
  };
}

export default UserRepository;
