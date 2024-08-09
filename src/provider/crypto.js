import { randomBytes } from 'crypto';

const generateNumericId = (length) => {
  const bytes = randomBytes(length);
  return Array.from(bytes)
    .map((byte) => (byte % 10).toString())
    .join('');
};

export default generateNumericId;
