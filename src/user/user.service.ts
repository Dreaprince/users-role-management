import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async findAllWithRoles(): Promise<any> {
    // Fetch all users along with their roles
    const users = await this.prisma.user.findMany({
      include: {
        roles: true,
      },
    });

    const userResponses = users.map(user => {
      const { passwordHash, ...rest } = user;
      return { ...rest };
    });

    return {
      statusCode: '00',
      message: 'Users fetched successfully',
      data: {
        users: userResponses,
      },
    };
  }


  async assignRole(userId: number, roleId: number): Promise<any> {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Assign role to user
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        roles: {
          connect: { id: roleId },
        },
      },
    });

    // Return updated user without passwordHash
    const updatedUser = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: true,
      },
    });

    const { passwordHash, ...rest } = updatedUser; // Exclude passwordHash

    return {
      statusCode: '00',
      message: 'Role assigned successfully',
      data: {
        user: rest, 
      },
    };
  }


  async deleteUser(id: number): Promise<any> {
    // Check if the user exists
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Delete the user
    await this.prisma.user.delete({
      where: { id },
    });

    return {
      statusCode: '00',
      message: 'User deleted successfully',
      data: null,
    };
  }
}
