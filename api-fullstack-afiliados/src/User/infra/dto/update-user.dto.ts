import CreateUserDto from './create-user.dto';
import { PartialType } from '@nestjs/swagger';

class UpdateUserDto extends PartialType(CreateUserDto) {}

export default UpdateUserDto;
