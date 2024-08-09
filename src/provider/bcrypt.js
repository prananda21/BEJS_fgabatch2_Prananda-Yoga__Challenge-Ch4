import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);

export const hashing = (password) => {
  return bcrypt.hashSync(password, salt);
};

export const compare = (password, compareTo) => {
  return bcrypt.compareSync(password, compareTo);
};
