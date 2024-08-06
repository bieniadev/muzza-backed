import { AuthService } from '../services/auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import authConfig from '../config/auth.config';
import { ConfigType } from '@nestjs/config';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { Id } from '../../common/bases/base.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
    private readonly usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
    });
  }

  async validate({ sub }: { sub: Id }) {
    const user = await this.usersRepository.findById(sub);

    if (!user) throw new UnauthorizedException();

    return {
      _id: user._id,
      email: user.email,
      username: user.username,
    };
  }
}
