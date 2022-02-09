import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FindOneParams } from '../../common/utils/find-one-params';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async find() {
    return (await this.usersService.find()).map((user) => new User(user));
  }

  @Get(':id')
  async findOne(@Param() { id }: FindOneParams) {
    return new User(await this.usersService.findOne({ where: { id } }));
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return new User(await this.usersService.create(user));
  }

  @Put(':id')
  async update(@Param() { id }: FindOneParams, @Body() user: UpdateUserDto) {
    return new User(await this.usersService.update(id, user));
  }

  @Delete(':id')
  async delete(@Param() { id }: FindOneParams) {
    return new User(await this.usersService.delete(id));
  }
}
