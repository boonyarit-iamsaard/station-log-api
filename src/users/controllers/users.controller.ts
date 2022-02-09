import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
    const users = (await this.usersService.find()).map(
      (user) => new User(user),
    );

    if (!users.length) throw new NotFoundException('Users not found');

    return users;
  }

  @Get(':id')
  async findOne(@Param() { id }: FindOneParams) {
    const existingUser = new User(
      await this.usersService.findOne({ where: { id } }),
    );

    if (!existingUser) throw new NotFoundException('User not found');

    return existingUser;
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    const createdUser = new User(await this.usersService.create(user));

    if (!createdUser) throw new NotFoundException('User not found');

    return createdUser;
  }

  @Put(':id')
  async update(@Param() { id }: FindOneParams, @Body() user: UpdateUserDto) {
    const updatedUser = new User(await this.usersService.update(id, user));

    if (!updatedUser) throw new NotFoundException('User not found');

    return updatedUser;
  }

  @Delete(':id')
  async delete(@Param() { id }: FindOneParams) {
    const deletedUser = new User(await this.usersService.delete(id));

    if (!deletedUser) throw new NotFoundException('User not found');

    return deletedUser;
  }
}
