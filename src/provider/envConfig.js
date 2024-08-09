import { configDotenv } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class EnvConfig {
  static config() {
    configDotenv({
      path: path.join(__dirname, '../../.env'),
    });

    const APP_PORT =
      EnvConfig.#getEnv('APP_PORT');
    const ACCESS_TOKEN_EXPIRED =
      EnvConfig.#getEnv('ACCESS_TOKEN_EXPIRED');
    const ACCESS_TOKEN_SECRET = EnvConfig.#getEnv(
      'ACCESS_TOKEN_SECRET',
    );
    const REFRESH_TOKEN_EXPIRED =
      EnvConfig.#getEnv('REFRESH_TOKEN_EXPIRED');
    const REFRESH_TOKEN_SECRET =
      EnvConfig.#getEnv('REFRESH_TOKEN_SECRET');
    const GA_CLIENT_ID = EnvConfig.#getEnv(
      'GA_CLIENT_ID',
    );
    const GA_CLIENT_SECRET = EnvConfig.#getEnv(
      'GA_CLIENT_SECRET',
    );

    return {
      APP_PORT,
      ACCESS_TOKEN_EXPIRED,
      ACCESS_TOKEN_SECRET,
      REFRESH_TOKEN_EXPIRED,
      REFRESH_TOKEN_SECRET,
      GA_CLIENT_ID,
      GA_CLIENT_SECRET,
    };
  }

  static #getEnv(key) {
    const value = process.env[key];
    if (value === undefined) {
      throw new Error(
        `Failed get environment ${key}`,
      );
    }
    return value;
  }
}

export default EnvConfig;
