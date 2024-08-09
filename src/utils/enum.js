export const HttpStatusCode = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  REDIRECT: 302,
  BAD_REQUEST: 400,
  UNAUTHORIZATION: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TO_MANY_REQUEST: 429,
  INTERNAL_SERVER: 500,
  Service_Unavailable: 503,
};

export const HttpStatusMessage = {
  SUCCESS_REGISTER: 'berhasil registrasi',
  SUCCESS_CREATE_USER_CREDENTIAL:
    'berhasil membuat credential user',
  SUCCESS_FOUND_USER:
    'berhasil menemukan data user',
  SUCCESS_UPDATE_USER:
    'berhasil memperbarui data user',

  SUCCESS_CREATE_ADDRESS:
    'berhasil membuat data alamat user',
  SUCCESS_FOUND_ADDRESS:
    'berhasil menemukan data address user',

  SUCCESS_CREATE_ACCOUNT:
    'berhasil membuat data akun user',
  SUCCESS_FOUND_ACCOUNT:
    'berhasil menemukan data account user',

  SUCCESS_FOUND_TX:
    'berhasil menemukan data transaksi',
  SUCCESS_TX_TRANFER:
    'berhasil melakukan transfer',

  SUCCESS_LOGIN: 'berhasil login, selamat datang',

  // Error
  VALIDATION_ERROR: 'data tidak valid',
  NOT_FOUND_ERROR: 'data tidak ditemukan',
  DUPLICATE_ERROR:
    'data duplikat tidak bisa digunakan',
  WRONG_EMAIL_PASSWORD:
    'email atau password salah',

  REGEX_NUMBER: 'data harus berupa angka',
};
