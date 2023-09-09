import { HttpStatus } from '@nestjs/common';

interface CreateUserSuccess {
  status: HttpStatus;
  name: string;
  email: string;
  message: string;
}

export default CreateUserSuccess;
