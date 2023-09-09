import { HttpStatus } from '@nestjs/common';

interface LoginSuccess {
  token: string;
  status: HttpStatus;
}

export default LoginSuccess;
