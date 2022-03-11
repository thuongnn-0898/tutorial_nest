import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    // query builder
    return await this.usersRepository.createQueryBuilder()
      // .select(['User.*'])
      .leftJoinAndSelect('User.posts', 'posts')
      .orderBy('created_at', 'DESC')
      .getMany();
    // return this.usersRepository.find({ 
    //   relations: ['posts'],
    //   order: { id: 'DESC' }
    // });
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    this.usersRepository.create(createUserInput);

    return this.usersRepository.save(createUserInput);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.createQueryBuilder()
      .leftJoinAndSelect('User.posts', 'posts')
      .where({ id })
      .getOneOrFail();
    
    return user;
    // if (user) {
    //   return user
    // }

    // throw new NotFoundException('No record found');

    // return this.usersRepository.findOneOrFail(id, { 
    //   relations: ['posts'],
    // });
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    await this.usersRepository.update(id, { ...updateUserInput });
    
    return await this.usersRepository.findOne(id);
  }

  async remove(id: number): Promise<User> {
    const user = await this.usersRepository.findOneOrFail(id);

    await this.usersRepository.softDelete(id);

    return user;
  }
}
