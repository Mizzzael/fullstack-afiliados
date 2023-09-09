import { HttpStatus } from '@nestjs/common';

interface LoginNotFound {
  status: HttpStatus;
  message: string;
}

export default LoginNotFound;
