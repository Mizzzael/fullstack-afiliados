import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import UserEntity from '../entities/user.entity';
import CreateUserDto from '../../infra/dto/create-user.dto';
import { hash } from 'bcrypt';
import CreateUserSuccess from '../contracts/create-user-success';
import UpdateUserDto from '../../infra/dto/update-user.dto';
import EmailExist from '../contracts/email-exist';

@Injectable()
class UserUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async checkEmail(email: string) {
    const CheckIfEmailExist = await this.userRepository.find({
      where: {
        email,
      },
    });

    const response: EmailExist = {
      exist: CheckIfEmailExist.length > 0,
      status: HttpStatus.OK,
    };

    return response;
  }

  async createUser(newUser: CreateUserDto): Promise<CreateUserSuccess> {
    try {
      const User = new UserEntity();
      User.active = true;
      User.email = newUser.email;
      User.name = newUser.name;
      User.password = await hash(newUser.password, 12);
      const newUserResponse = await this.userRepository.save(User);

      const response: CreateUserSuccess = {
        email: newUserResponse.email,
        name: newUserResponse.name,
        message: 'Sucesso!',
        status: HttpStatus.CREATED,
      };

      return response;
    } catch (e) {
      return {
        email: newUser.email,
        name: newUser.name,
        message: 'Error!',
        status: HttpStatus.BAD_REQUEST,
        error: e.message,
      };
    }
  }

  async updateUser(userId: number, userData: UpdateUserDto) {
    const User = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    User.name = userData.name || User.name;
    User.email = userData.email || User.email;

    const UpdatedUser = await this.userRepository.save(User);

    const response: CreateUserSuccess = {
      email: UpdatedUser.email,
      name: UpdatedUser.name,
      message: 'Sucesso!',
      status: HttpStatus.OK,
    };

    return response;
  }

  async userInfos(userId: number) {
    const User = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    const response: CreateUserSuccess = {
      email: User.email,
      name: User.name,
      message: 'Sucesso!',
      status: HttpStatus.OK,
    };

    return response;
  }
}

export default UserUseCase;
