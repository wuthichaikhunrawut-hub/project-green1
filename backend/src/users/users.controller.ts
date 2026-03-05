import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put, Query, Headers } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: string) {
    return this.usersService.findAll(role);
  }

  // Profile endpoints
  @Get('profile/me')
  getProfile(@Headers('x-user-id') userId: string) {
    return this.usersService.findOne(userId);
  }

  @Patch('profile/me')
  updateProfile(
    @Headers('x-user-id') userId: string,
    @Body() updateData: any // In real app, use a mapped DTO
  ) {
    return this.usersService.update(userId, updateData);
  }

  @Post()
  create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
