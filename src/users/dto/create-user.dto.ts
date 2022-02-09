import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { BaseUserDto } from './base-user.dto';

export class CreateUserDto extends BaseUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
