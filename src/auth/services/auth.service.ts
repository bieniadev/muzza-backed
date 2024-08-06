import { UserFromRequest } from './../../users/types/user-from-request';
import { UsersRepository } from '../../users/repositories/users.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthPayloadDto } from '../dtos/auth-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterPayloadDto } from '../dtos/register-payload.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: UsersRepository,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = await this.usersRepository.findOne({ email });

    if (!findUser) return null;

    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);

    if (!isPasswordCorrect) return null;

    return {
      _id: findUser._id,
      email: findUser.email,
      username: findUser.username,
    };
  }

  async logIn(user: UserFromRequest) {
    const accessToken = await this.jwtService.signAsync({
      sub: user._id,
    });

    return { accessToken };
  }

  async register({ email, password, username }: RegisterPayloadDto) {
    const checkIfEmailExists = await this.usersRepository.findOne({ email });

    if (checkIfEmailExists) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersRepository.createOne({
      email,
      password: hashedPassword,
      username,
      eloPoints: 800,
    });

    return {
      _id: user._id,
      email: user.email,
      username: user.username,
    };
  }
}
