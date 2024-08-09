/* eslint-disable brace-style */
import { APIError } from '../error/APIError';
import { NotFoundError } from '../error/NotFoundError';
import { ValidationError } from '../error/ValidationError';
import { compare } from '../provider/bcrypt';
import EnvConfig from '../provider/envConfig';
import UserRepository from '../repository/user.repository';
import {
  HttpStatusCode,
  HttpStatusMessage,
} from '../utils/enum';
import Response from '../utils/response/response';
import { loginSchema } from '../utils/validation/auth.validation';
import { generateLoginToken } from './utils/helper';

class AuthController {
  static login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { value, error } =
        loginSchema.validate({
          email: email,
          password: password,
        });

      if (error) {
        throw new ValidationError();
      }

      const user = await UserRepository._findUser(
        value.email,
      );

      if (!user) {
        throw new NotFoundError();
      }

      const checkPassword = await compare(
        value.password,
        user.password,
      );

      if (!checkPassword) {
        throw new APIError(
          HttpStatusMessage.WRONG_EMAIL_PASSWORD,
        );
      }

      const payload = {
        id: user.id,
        email: user.email,
      };

      const { access_token, refresh_token } =
        generateLoginToken(payload);

      // set-cookie for token
      res.cookie('access_token', access_token, {
        maxAge:
          Number(
            EnvConfig.config()
              .ACCESS_TOKEN_EXPIRED,
          ) * 1000,
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      });

      res.cookie('refresh_token', refresh_token, {
        maxAge:
          Number(
            EnvConfig.config()
              .REFRESH_TOKEN_EXPIRED,
          ) * 3000,
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      });

      return res
        .status(HttpStatusCode.OK)
        .json(
          Response.success(
            true,
            HttpStatusMessage.SUCCESS_LOGIN,
            null,
          ),
        );
    } catch (error) {
      const errorToThrow = [
        ValidationError,
        APIError,
        NotFoundError,
      ];
      if (
        errorToThrow.some(
          (errClass) => error instanceof errClass,
        )
      ) {
        return res
          .status(error.code)
          .json(
            Response.error(false, error.message),
          );
      } else {
        next(error);
      }
    }
  };

  static logout = (req, res, next) => {};
}

export default AuthController;
