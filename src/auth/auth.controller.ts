import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Options,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { Public } from './decorator/public.decorator';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { User } from './decorator/getUser.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInAuthDto: SignInAuthDto) {
    return this.authService.signIn(signInAuthDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    return this.authService.signUp(signUpAuthDto);
  }

  @Get('profile')
  getUserProfile(@User() user: any) {
    return user;
  }

  @Public()
  @Options('login')
  options() {
    return {};
  }
}
