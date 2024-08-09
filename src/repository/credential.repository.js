import { prisma } from '../database/prisma.js';

class CredentialRepository {
  static create = (
    first_name,
    last_name,
    phone,
    birth_place,
    birth_date,
    national_id,
    is_employeed,
    job,
    mother_name,
    user_id,
  ) => {
    const user = prisma.credential.create({
      data: {
        first_name: first_name,
        last_name: last_name,
        phone_number: phone,
        birth_place: birth_place,
        birth_date: birth_date,
        national_id: national_id,
        is_employeed: is_employeed,
        job: job,
        mother_name: mother_name,
        user: {
          connect: {
            id: user_id,
          },
        },
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        phone_number: true,
        birth_place: true,
        birth_date: true,
        job: true,
        mother_name: true,
        user: {
          select: {
            id: true,
            email: true,
            is_verified: true,
          },
        },
      },
    });

    return user;
  };

  static findById = (id) => {
    const user = prisma.credential.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        phone_number: true,
        birth_place: true,
        birth_date: true,
        job: true,
        mother_name: true,
        user: {
          select: {
            id: true,
            email: true,
            is_verified: true,
          },
        },
      },
    });

    return user;
  };

  static findByName = (first_name, last_name) => {
    const user = prisma.credential.findFirst({
      where: {
        first_name,
        last_name,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        phone_number: true,
        birth_place: true,
        birth_date: true,
        job: true,
        mother_name: true,
        user: {
          select: {
            id: true,
            email: true,
            is_verified: true,
          },
        },
      },
    });

    return user;
  };
}

export default CredentialRepository;
