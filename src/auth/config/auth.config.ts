import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_TOKEN_SECRET,
  jwtTokenExpiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
}));
