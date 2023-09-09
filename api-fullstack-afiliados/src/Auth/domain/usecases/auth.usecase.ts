import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import UserEntity from '../../../User/domain/entities/user.entity';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import LoginSuccess from '../contracts/login-success';

@Injectable()
class AuthUsecase {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
        active: true,
      },
    });

    if (!user) return null;
    const checkPass = await compare(pass, user.password);
    if (!checkPass) return null;
    const payload = { sub: user.id, username: user.name };
    const response: LoginSuccess = {
      token: await this.jwtService.signAsync(payload),
      status: HttpStatus.OK,
    };

    return response;
  }
}

export default AuthUsecase;
