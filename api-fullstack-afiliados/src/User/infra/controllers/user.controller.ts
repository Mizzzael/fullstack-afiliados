import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import createUserDto from '../dto/create-user.dto';
import userUsecase from '../../domain/usecase/user.usecase';
import { Response } from 'express';
import createUserSuccess from '../../domain/contracts/create-user-success';
import createUserFail from '../../domain/contracts/create-user-fail';
import CreateUserFail from '../../domain/contracts/create-user-fail';
import UpdateUserDto from '../dto/update-user.dto';
import AuthGuard from '../../../Auth/domain/usecases/guard.usecase';
import { ApiHeader } from '@nestjs/swagger';

@Controller({
  path: '/user',
})
class UserController {
  constructor(private userRepository: userUsecase) {}
  @Post('/create')
  async createUser(
    @Body() body: createUserDto,
    @Res() res: Response,
  ): Promise<void | Error> {
    try {
      const NewUser = await this.userRepository.createUser(body);

      if (!NewUser || NewUser.error) {
        throw new Error('Error in NewUser object.');
      }

      res.status(HttpStatus.CREATED);
      const successResponse: createUserSuccess = {
        email: NewUser.email,
        name: NewUser.name,
        message: NewUser.message,
        status: HttpStatus.CREATED,
        error: NewUser.error,
      };

      res.json(successResponse);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST);
      const failResponse: createUserFail = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Erro ao tentar criar este usuário.',
        error: e.message,
      };
      res.json(failResponse);
    }
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateUser(
    @Body() body: UpdateUserDto,
    @Res() res: Response,
    @Request() req,
  ) {
    try {
      const response = await this.userRepository.updateUser(req.user.sub, body);
      res.status(response.status);
      res.json(response);
    } catch (e) {
      const response: CreateUserFail = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Erro ao editar este usuário.',
        error: e as string,
      };
      res.status(response.status);
      res.json(response);
    }
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  async me(@Res() res: Response, @Request() req) {
    try {
      const User = await this.userRepository.userInfos(req.user.sub);
      res.status(User.status);
      res.json(User);
    } catch (e) {
      const response: CreateUserFail = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Erro ao consultar as informações desse usuário',
        error: e.message,
      };

      res.status(response.status);

      res.json(response);
    }
  }

  @Post('/email')
  async checkEmail(
    @Body() checkEmail: { email: string },
    @Res() res: Response,
  ) {
    try {
      const response = await this.userRepository.checkEmail(checkEmail.email);
      res.status(response.status);
      res.json(response);
    } catch (e) {
      const response: CreateUserFail = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Erro ao checar esse e-mail',
        error: e.message,
      };
      res.status(response.status);
      res.json(response);
    }
  }
}

export default UserController;
