import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { Role } from '../../common/types/role.enum';

export class BaseUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @IsArray()
  @IsEnum(Role, { each: true })
  @IsNotEmpty()
  roles: Role[];
}
