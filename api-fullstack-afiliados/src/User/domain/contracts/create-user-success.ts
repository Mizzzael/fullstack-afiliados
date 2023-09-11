import { HttpStatus } from '@nestjs/common';

interface CreateUserSuccess {
  status: HttpStatus;
  name: string;
  email: string;
  message: string;
  error?: string;
}

export default CreateUserSuccess;
