import { Module } from '@nestjs/common';
import authUsecase from './domain/usecases/auth.usecase';
import UserModule from '../User/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: '86400s',
      },
    }),
    UserModule,
  ],
  providers: [authUsecase],
  exports: [authUsecase],
})
class AuthModule {}

export default AuthModule;
