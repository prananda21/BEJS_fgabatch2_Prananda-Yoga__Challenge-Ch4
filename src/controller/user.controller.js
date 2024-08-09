/* eslint-disable brace-style */
import { DuplicateDataError } from '../error/DuplicateDataError.js';
import { NotFoundError } from '../error/NotFoundError.js';
import { ValidationError } from '../error/ValidationError.js';
import { prisma } from '../database/prisma.js';
import UserRepository from '../repository/user.repository.js';
import {
  HttpStatusCode,
  HttpStatusMessage,
} from '../utils/enum.js';
import {
  idSchema,
  userSchema,
  userUpdateSchema,
} from '../utils/validation/user.validation.js';

class UserController {
  static register = async (req, res, next) => {
    try {
      const { email, password, pin } = req.body;

      const { value, error } =
        userSchema.validate({
          email: email,
          password: password,
          pin: pin,
        });

      if (error) {
        throw new ValidationError(
          HttpStatusCode.BAD_REQUEST,
          error.message,
        );
      }

      const data =
        await UserRepository.findByEmail(
          value.email,
        );
      if (data) throw new DuplicateDataError();

      const user = await prisma.$transaction([
        UserRepository.create(
          value.email,
          value.password,
          value.pin,
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
        error instanceof DuplicateDataError
      ) {
        res.status(error.code).json({
          status: false,
          message: error.message,
          data: null,
        });
      } else {
        next(error);
      }
    }
  };

  static get = async (req, res, next) => {
    try {
      const { user_id } = req.params;

      const { value, error } = idSchema.validate({
        id: user_id,
      });

      if (error) {
        throw new ValidationError(
          HttpStatusCode.BAD_REQUEST,
          HttpStatusMessage.VALIDATION_ERROR,
        );
      }

      const user = await UserRepository.findById(
        value.id,
      );
      if (!user) throw new NotFoundError();

      return res
        .status(HttpStatusCode.ACCEPTED)
        .json({
          status: true,
          message:
            HttpStatusMessage.SUCCESS_FOUND_USER,
          data: user,
        });
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof NotFoundError
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

  static getAll = async (req, res, next) => {
    try {
      const user = await UserRepository.findAll();

      res.status(HttpStatusCode.ACCEPTED).json({
        status: true,
        message:
          HttpStatusMessage.SUCCESS_FOUND_USER,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const data = req.body;

      const { value, error } =
        userUpdateSchema.validate({
          id: user_id,
          email: data.email,
          password: data.password,
          pin: data.pin,
        });

      if (error) throw new ValidationError();

      const user = await UserRepository.update(
        value.id,
        value,
      );

      return res
        .status(HttpStatusCode.ACCEPTED)
        .json({
          status: true,
          message:
            HttpStatusMessage.SUCCESS_UPDATE_USER,
          data: user,
        });
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof NotFoundError
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

export default UserController;
