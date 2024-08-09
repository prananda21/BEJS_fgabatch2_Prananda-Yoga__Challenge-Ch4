/* eslint-disable brace-style */
import { prisma } from '../database/prisma.js';
import { DuplicateDataError } from '../error/DuplicateDataError.js';
import { NotFoundError } from '../error/NotFoundError.js';
import { ValidationError } from '../error/ValidationError.js';
import AccountRepository from '../repository/account.repository.js';
import UserRepository from '../repository/user.repository.js';
import {
  HttpStatusCode,
  HttpStatusMessage,
} from '../utils/enum.js';
import {
  accountSchema,
  findAccountSchema,
  findAllAccountSchema,
} from '../utils/validation/account.validation.js';

class AccountController {
  static create = async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const { interest_rate, type } = req.body;

      const { value, error } =
        accountSchema.validate({
          user_id: user_id,
          interest_rate: interest_rate,
          type: type,
        });

      if (error) throw new ValidationError();

      const userExist =
        await UserRepository.findById(user_id);
      if (!userExist) throw new NotFoundError();

      const accExist =
        await AccountRepository.findByUserId(
          user_id,
          type,
        );
      if (accExist) {
        throw new DuplicateDataError();
      }

      const account = await prisma.$transaction([
        AccountRepository.create(
          value.user_id,
          value.interest_rate,
          value.type,
        ),
      ]);

      return res
        .status(HttpStatusCode.CREATED)
        .json({
          status: true,
          message:
            HttpStatusMessage.SUCCESS_CREATE_ACCOUNT,
          data: account,
        });
    } catch (error) {
      if (
        error instanceof ValidationError ||
        error instanceof DuplicateDataError ||
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

  static find = async (req, res, next) => {
    try {
      const { user_id, account_id } = req.params;

      const { value, error } =
        findAccountSchema.validate({
          user_id: user_id,
          account_id: account_id,
        });

      if (error) throw new ValidationError();

      let account = await AccountRepository.find(
        value.account_id,
        value.user_id,
      );

      if (account === null) {
        account = [];
      }

      return res.status(HttpStatusCode.OK).json({
        status: true,
        message:
          HttpStatusMessage.SUCCESS_FOUND_ACCOUNT,
        data: account,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
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

  static findAll = async (req, res, next) => {
    try {
      const { user_id } = req.params;

      const { value, error } =
        findAllAccountSchema.validate({
          user_id: user_id,
        });

      if (error) throw new ValidationError();

      let accounts =
        await AccountRepository.findAll(
          value.user_id,
        );
      if (accounts === null) accounts = [];

      return res.status(HttpStatusCode.OK).json({
        status: true,
        message:
          HttpStatusMessage.SUCCESS_FOUND_ACCOUNT,
        data: accounts,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
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

export default AccountController;
