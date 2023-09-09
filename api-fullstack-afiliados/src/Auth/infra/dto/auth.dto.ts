import { Injectable } from '@nestjs/common';

@Injectable()
class AuthDto {
  readonly email: string;
  readonly password: string;
}

export default AuthDto;
