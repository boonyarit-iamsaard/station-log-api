import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';
import { BaseUserDto } from './base-user.dto';

export class UpdateUserDto extends BaseUserDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsDateString()
  @IsNotEmpty()
  createdAt: Date;

  @IsDateString()
  @IsNotEmpty()
  updatedAt: Date;
}
