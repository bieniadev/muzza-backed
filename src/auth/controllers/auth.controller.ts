import { UserFromRequest } from './../../users/types/user-from-request';

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from '../dtos/auth-payload.dto';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';

import { RequestUser } from 'src/common/decorators/request-user.decorator';
import { RegisterPayloadDto } from '../dtos/register-payload.dto';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Body() {}: AuthPayloadDto, @RequestUser() user: UserFromRequest) {
    return this.authService.logIn(user);
  }

  @Post('/register')
  register(@Body() registerPayloadDto: RegisterPayloadDto) {
    return this.authService.register(registerPayloadDto);
  }
}
