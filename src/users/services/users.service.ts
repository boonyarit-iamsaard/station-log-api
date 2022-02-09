import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async find(options?: FindManyOptions): Promise<User[]> {
    return await this.userRepository.find(options);
  }

  async findOne(option: FindOneOptions): Promise<User> {
    return await this.userRepository.findOne(option);
  }

  async create(user: CreateUserDto): Promise<User> {
    const hashed = await bcrypt.hash(user.password, 12);
    const newUser = this.userRepository.create({ ...user, password: hashed });

    return await this.userRepository.save(newUser);
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne(id);

    if (!existingUser) return null;

    const updatedUser = this.userRepository.merge(existingUser, user);

    return await this.userRepository.save(updatedUser);
  }

  async delete(id: string): Promise<User> {
    const existingUser = await this.userRepository.findOne(id);

    if (!existingUser) return null;

    return await this.userRepository.remove(existingUser);
  }
}
