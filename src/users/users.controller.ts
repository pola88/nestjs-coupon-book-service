import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto.email);
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findUserWithCodes(id);
  }
}
