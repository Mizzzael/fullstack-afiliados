import { HttpStatus } from '@nestjs/common';

interface EmailExist {
  status: HttpStatus;
  exist: boolean;
}

export default EmailExist;
