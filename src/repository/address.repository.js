import { prisma } from '../database/prisma.js';

class AddressRepository {
  static create = (
    street,
    district,
    regency,
    province,
    country,
    postal_code,
    address_type,
    user_id,
  ) => {
    const address = prisma.address.create({
      data: {
        street: street,
        district: district,
        regency: regency,
        province: province,
        country: country,
        postal_code: postal_code,
        address_type: address_type,
        user_id: user_id,
      },
      select: {
        id: true,
        street: true,
        regency: true,
        province: true,
        country: true,
        postal_code: true,
        type: {
          select: { id: true, description: true },
        },
        user: {
          select: {
            id: true,
            email: true,
            is_verified: true,
          },
        },
      },
    });

    return address;
  };

  static get = (user_id, address_id) => {
    const address = prisma.address.findUnique({
      where: {
        id: address_id,
        user: { id: user_id },
      },
      select: {
        id: true,
        street: true,
        regency: true,
        province: true,
        country: true,
        postal_code: true,
        type: {
          select: { id: true, description: true },
        },
        user: {
          select: {
            id: true,
            email: true,
            is_verified: true,
          },
        },
      },
    });

    return address;
  };
}

export default AddressRepository;
