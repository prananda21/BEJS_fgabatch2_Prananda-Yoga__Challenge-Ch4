import passport from 'passport';
import Strategy from 'passport-google-oauth20';
import EnvConfig from '../envConfig';

passport.use(
  new Strategy(
    {
      clientID: EnvConfig.config().GA_CLIENT_ID,
      clientSecret:
        EnvConfig.config().GA_CLIENT_SECRET,
      callbackURL:
        'http://localhost:3000/auth/google/callback',
    },
    (
      access_token,
      refresh_token,
      profile,
      done,
    ) => {
      return done(null, profile);
    },
  ),
);
