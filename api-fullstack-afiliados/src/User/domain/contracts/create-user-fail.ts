import { HttpStatus } from '@nestjs/common';

interface CreateUserFail {
  status: HttpStatus;
  message: string;
  error: string;
}

export default CreateUserFail;
