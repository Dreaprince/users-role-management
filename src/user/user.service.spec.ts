import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  const mockUser = {
    id: 1,
    firstName: 'Toheeb',
    lastName: 'Odusoga',
    email: 'toheebodus@gmail.com',
    passwordHash: 'hashedpassword',
    roles: [], // Add roles for completeness
  };

  const mockPrismaService = {
    user: {
      findUnique: jest.fn().mockResolvedValue(mockUser),
      findMany: jest.fn().mockResolvedValue([mockUser]),
      update: jest.fn().mockResolvedValue(mockUser),
      delete: jest.fn().mockResolvedValue(null),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAllWithRoles', () => {
    it('should return all users with roles', async () => {
      const result = await userService.findAllWithRoles();
      expect(result.statusCode).toBe('00');
      expect(result.data.users).toHaveLength(1);
      expect(result.data.users[0]).not.toHaveProperty('passwordHash'); // Ensure passwordHash is excluded
    });
  });

  describe('assignRole', () => {
    it('should assign a role to a user', async () => {
      const result = await userService.assignRole(1, 2);
      expect(result.statusCode).toBe('00');
      expect(result.data.user).toHaveProperty('id', 1);
      expect(prismaService.user.update).toHaveBeenCalled();
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null); // Simulate non-existing user

      await expect(userService.assignRole(999, 2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const result = await userService.deleteUser(1);
      expect(result).toEqual({
        statusCode: '00',
        message: 'User deleted successfully',
        data: null,
      });
      expect(prismaService.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null); // Mock user not found
      await expect(userService.deleteUser(999)).rejects.toThrow(NotFoundException);
    });
  });
});
