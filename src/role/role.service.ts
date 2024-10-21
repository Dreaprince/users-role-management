import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service'; 

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}


  async create(createRoleDto: CreateRoleDto): Promise<any> {
    const newRole = await this.prisma.role.create({
      data: createRoleDto,
    });

    return {
      statusCode: '00',
      message: 'Role created successfully',
      data: {
        role: newRole,
      },
    };
  }

  async findAll(): Promise<any> {
    const roles = await this.prisma.role.findMany();
    
    return {
      statusCode: '00',
      message: 'Roles fetched successfully',
      data: {
        roles,
      },
    };
  }

  async findOne(id: number): Promise<any> {
    const role = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return {
      statusCode: '00',
      message: 'Role fetched successfully',
      data: {
        role,
      },
    };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<any> {
    const existingRole = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    const updatedRole = await this.prisma.role.update({
      where: { id },
      data: {
        name: updateRoleDto.name,
        permissions: updateRoleDto.permissions,
      },
    });

    return {
      statusCode: '00',
      message: 'Role updated successfully',
      data: {
        role: updatedRole,
      },
    };
  }

  async remove(id: number): Promise<any> {
    const existingRole = await this.prisma.role.findUnique({
      where: { id },
    });

    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    await this.prisma.role.delete({
      where: { id },
    });

    return {
      statusCode: '00',
      message: 'Role deleted successfully',
      data: null,
    };
  }

}

  


