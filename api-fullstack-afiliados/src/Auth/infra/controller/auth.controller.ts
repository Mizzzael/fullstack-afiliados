import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import AuthUsecase from '../../domain/usecases/auth.usecase';
import AuthDto from '../dto/auth.dto';
import LoginNotFound from '../../domain/contracts/login-not-found';
import { Response } from 'express';

@Controller({
  path: 'auth/',
})
class AuthController {
  constructor(private authUseCase: AuthUsecase) {}

  @Post('/login')
  async login(
    @Body() login: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authUseCase.signIn(login.email, login.password);
    if (result === null) {
      response.status(HttpStatus.UNAUTHORIZED);
      const res: LoginNotFound = {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Usuário ou senha incorretos.',
      };
      return res;
    }

    response.status(result.status);
    return result;
  }
}

export default AuthController;
