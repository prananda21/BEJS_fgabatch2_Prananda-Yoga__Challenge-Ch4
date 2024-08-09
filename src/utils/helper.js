import { APIError } from '../error/APIError';
import { HttpStatusMessage } from './enum';

export const parseStringToNumber = (value) => {
  const number = Number(value);
  if (isNaN(number)) {
    throw new APIError(
      HttpStatusMessage.REGEX_NUMBER,
    );
  }

  return number;
};
