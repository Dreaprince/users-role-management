import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

describe('AuthService', () => {
    let authService: AuthService;
    let prismaService: PrismaService;

    const mockUser = {
        id: 1,
        firstName: 'Toheeb',
        lastName: 'Odusoga',
        email: 'toheebodus@gmail.com',
        passwordHash: 'hashedPassword',
        createdAt: new Date(),
        roles: [],
    };

    const mockPrismaService = {
        user: {
            findUnique: jest.fn().mockResolvedValue(mockUser),
            create: jest.fn().mockResolvedValue(mockUser),
        },
    };
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          { provide: PrismaService, useValue: mockPrismaService },
        ],
      }).compile();
  
      authService = module.get<AuthService>(AuthService);
      prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(authService).toBeDefined();
    });

    describe('register', () => {
        it('should register a new user', async () => {
            jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
            const result = await authService.register({
                firstName: 'Toheeb',
                lastName: 'Odusoga',
                email: 'toheebodus@gmail.com',
                passwordHash: 'plainPassword',
            });

            expect(result).toHaveProperty('statusCode', '00');
            expect(result.data.user).toHaveProperty('id', 1);
            expect(prismaService.user.create).toHaveBeenCalled();
        });

        it('should throw ConflictException if email already exists', async () => {
            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser); // Simulate existing user

            await expect(authService.register({
                firstName: 'Toheeb',
                lastName: 'Odusoga',
                email: 'toheebodus@gmail.com',
                passwordHash: 'plainPassword',
            })).rejects.toThrow(ConflictException);
        });
    });

    describe('login', () => {
        it('should login a user and return a token', async () => {
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(true); // Simulate password match
            const result = await authService.login({
                username: 'toheebodus@gmail.com',
                password: 'plainPassword',
            });

            expect(result).toHaveProperty('statusCode', '00');
            expect(result.data.user).toHaveProperty('id', 1);
            expect(result.data.accessToken).toBeDefined();
            expect(prismaService.user.findUnique).toHaveBeenCalled();
        });

        it('should throw BadRequestException if credentials are invalid', async () => {
            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser);
            jest.spyOn(bcrypt, 'compare').mockResolvedValue(false); // Simulate password mismatch

            await expect(authService.login({
                username: 'toheebodus@gmail.com',
                password: 'wrongPassword',
            })).rejects.toThrow(BadRequestException);
        });

        it('should throw BadRequestException if user does not exist', async () => {
            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null); // Simulate non-existing user

            await expect(authService.login({
                username: 'unknown@example.com',
                password: 'plainPassword',
            })).rejects.toThrow(BadRequestException);
        });
    });
});
