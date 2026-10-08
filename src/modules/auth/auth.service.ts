import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticateDto } from './dtos/authenticate.dto.js';
import { UsersRepository } from '../../shared/database/repositories/users.repositories.js';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService
  ) {}

  async authenticate(authenticateDto: AuthenticateDto) {
    const { email, password } = authenticateDto;
    const user = await this.usersRepo.findByEmail(email);

    if(!user){
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if(!isPasswordValid){
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({ sub: user.id });

    return { accessToken };
  }

}
