/* eslint-disable no-useless-catch */
/* eslint-disable brace-style */
import jsonwebtoken from 'jsonwebtoken';
import { parseStringToNumber } from '../../utils/helper';

class JWTToken {
  generateToken = (
    payload,
    expiresIn,
    secret,
  ) => {
    const parseExpireToNumber =
      parseStringToNumber(expiresIn);
    return jsonwebtoken.sign(payload, secret, {
      expiresIn: parseExpireToNumber,
    });
  };

  decodeToken = (token, secret) => {
    try {
      const decoded = jsonwebtoken.decode(
        token,
        secret,
      );
      return decoded;
    } catch (error) {
      throw error;
    }
  };
}

export default new JWTToken();
