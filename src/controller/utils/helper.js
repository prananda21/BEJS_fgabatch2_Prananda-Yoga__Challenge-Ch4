import EnvConfig from '../../provider/envConfig';
import JWTToken from '../../provider/jwt';

export const generateLoginToken = (payload) => {
  const access_token = JWTToken.generateToken(
    payload,
    Number(
      EnvConfig.config().ACCESS_TOKEN_EXPIRED,
    ),
    EnvConfig.config().ACCESS_TOKEN_SECRET,
  );
  const refresh_token = JWTToken.generateToken(
    payload,
    Number(
      EnvConfig.config().REFRESH_TOKEN_EXPIRED,
    ),
    EnvConfig.config().REFRESH_TOKEN_SECRET,
  );

  return { access_token, refresh_token };
};
