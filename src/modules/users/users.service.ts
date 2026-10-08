import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import {hash} from 'bcryptjs';
import { UsersRepository } from '../../shared/database/repositories/users.repositories.js';

@Injectable()
export class UsersService {

  constructor(private readonly usersRepo: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {

    const { name, email, password } = createUserDto;

    const emailTaken = await this.usersRepo.findByEmail(email);

    if (emailTaken) {
      throw new ConflictException('Este e-mail já está cadastrado');
    }

    const hashedPassword = await hash(password, 10);

    const user = await  this.usersRepo.create({
      name,
      email,
      password: hashedPassword,
      categories: (mutator) =>
      mutator.create([
          // Income
          {name: 'Salário', icon: 'travel', type: 'INCOME'},
          {name: 'Freelance', icon: 'freelance', type: 'INCOME'},
          {name: 'Outro', icon: 'other', type: 'INCOME'},
          // Expense
          {name: 'Casa', icon: 'Home', type: 'EXPENSE'},
          {name: 'Alimentação', icon: 'food', type: 'EXPENSE'},
          {name: 'Educação', icon: 'education', type: 'EXPENSE'},
          {name: 'Lazer', icon: 'fun', type: 'EXPENSE'},
          {name: 'Mercado', icon: 'grocery', type: 'EXPENSE'},
          {name: 'Roupas', icon: 'clothes', type: 'EXPENSE'},
          {name: 'Transporte', icon: 'transport', type: 'EXPENSE'},
          {name: 'Viagem', icon: 'travel', type: 'EXPENSE'},
          {name: 'Outro', icon: 'other', type: 'EXPENSE'}
        ]),
    });
    
    return user;
  }
}
