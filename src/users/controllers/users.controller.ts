import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SessionAuthGuard } from '../../auth/guards/session-auth.guard';
import { FindOneParams } from '../../common/utils/find-one-params';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(SessionAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async find() {
    const users = await this.usersService.find();

    if (!users.length) throw new NotFoundException('Users not found');

    return users.map((user) => new User(user));
  }

  @Get(':id')
  async findOne(@Param() { id }: FindOneParams) {
    const existingUser = await this.usersService.findOne({ where: { id } });

    if (!existingUser) throw new NotFoundException('User not found');

    return new User(existingUser);
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    const createdUser = await this.usersService.create(user);

    if (!createdUser) throw new NotFoundException('User not found');

    return new User(createdUser);
  }

  @Put(':id')
  async update(@Param() { id }: FindOneParams, @Body() user: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, user);

    if (!updatedUser) throw new NotFoundException('User not found');

    return new User(updatedUser);
  }

  @Delete(':id')
  async delete(@Param() { id }: FindOneParams) {
    const deletedUser = await this.usersService.delete(id);

    if (!deletedUser) throw new NotFoundException('User not found');

    return new User(deletedUser);
  }
}
