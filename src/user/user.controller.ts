import { Controller, Get, Post, Body, UseGuards, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RolesGuard } from 'src/auth/gaurds/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AssignRoleDto } from './dto/assign-role.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('')
  async findAll() {
    return this.userService.findAllWithRoles();
  }

  @Post('assign-role')
  // @UseGuards(RolesGuard)
  // @Roles('Admin')
  async assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return this.userService.assignRole(assignRoleDto.userId, assignRoleDto.roleId);
  }

  @Delete('/:id')
  @UseGuards(RolesGuard)
  @Roles('Admin')
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

}
