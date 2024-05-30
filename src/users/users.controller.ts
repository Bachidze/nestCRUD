import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './users.dto';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Get('/:id')
  getUserById(@Param('id') id) {
    console.log(id, 'id');
    return this.usersService.getUserById(Number(id));
  }
  @Post()
  createUSer(@Body() user: UserDTO) {
    return this.usersService.createUser(user);
  }
  @Delete('/:id')
  deleteUser(@Param('id') id) {
    return this.usersService.deleteUser(Number(id));
  }
  @Put('/:id')
  updateUser(@Param('id') id, @Body() user: UserDTO) {
      return this.usersService.updateUser(Number(id), user);
  }
}
