import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpAuthDto } from './dto/signup-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInAuthDto: SignInAuthDto) {
    const { email, password } = signInAuthDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
      avatar: user.avatar,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }

  async signUp(signUpAuthDto: SignUpAuthDto) {
    const user = await this.prisma.user.create({
      data: signUpAuthDto,
    });
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
      avatar: user.avatar,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }
}
