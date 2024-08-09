/* eslint-disable brace-style */
import { DuplicateDataError } from '../error/DuplicateDataError.js';
import { NotFoundError } from '../error/NotFoundError.js';
import { ValidationError } from '../error/ValidationError.js';
import { prisma } from '../database/prisma.js';
import CredentialRepository from '../repository/credential.repository.js';
import {
  HttpStatusCode,
  HttpStatusMessage,
} from '../utils/enum.js';
import { credentialSchema } from '../utils/validation/credential.validation.js';

class CredentialController {
  static create = async (req, res, next) => {
    try {
      const {
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
      } = req.body;

      const { value, error } =
        credentialSchema.validate({
          firstName: first_name,
          lastName: last_name,
          phone: phone,
          birthPlace: birth_place,
          birthDate: birth_date,
          nationalId: national_id,
          isEmployeed: is_employeed,
          job: job,
          motherName: mother_name,
          userId: user_id,
        });

      const date = new Date(value.birthDate);

      if (error) throw new ValidationError();

      const data =
        await CredentialRepository.findByName(
          value.firstName,
          value.lastName,
        );

      if (data) {
        throw new DuplicateDataError();
      }

      const user = await prisma.$transaction([
        CredentialRepository.create(
          first_name,
          last_name,
          phone,
          birth_place,
          date,
          national_id,
          is_employeed,
          job,
          mother_name,
          user_id,
        ),
      ]);

      return res
        .status(HttpStatusCode.CREATED)
        .json({
          status: true,
          message:
            HttpStatusMessage.SUCCESS_REGISTER,
          data: user,
        });
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof NotFoundError ||
        error instanceof DuplicateDataError
      ) {
        return res.status(error.code).json({
          status: false,
          message: error.message,
          data: null,
        });
      } else {
        next(error);
      }
    }
  };
}

export default CredentialController;
