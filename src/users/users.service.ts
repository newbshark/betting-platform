import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
    getUsers() {
  return [
    {
      id: 1,
      name: 'Vadim',
    },
    {
      id: 2,
      name: 'Alex',
    },
  ];
}

getUserById(id: string) {
  const users = [
    {
      id: 1,
      name: 'Vadim',
    },
    {
      id: 2,
      name: 'Alex',
    },
  ];

  const user = users.find(user => user.id === Number(id));

  if (!user) {
    throw new NotFoundException('User not found');
  }

  return user;
}

createUser(createUserDto: CreateUserDto) {
  return {
    id: 3,
    name: createUserDto.name,
  };


}

}


