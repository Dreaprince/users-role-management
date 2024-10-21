import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

describe('RoleService', () => {
    let roleService: RoleService;
    let prismaService: PrismaService;

    const mockRole = {
        id: 1,
        name: 'Admin',
        permissions: ['READ', 'WRITE'],
    };

    const mockPrismaService = {
        role: {
            findUnique: jest.fn().mockResolvedValue(mockRole),
            create: jest.fn().mockResolvedValue(mockRole),
            findMany: jest.fn().mockResolvedValue([mockRole]),
            update: jest.fn().mockResolvedValue(mockRole),
            delete: jest.fn().mockResolvedValue(null),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RoleService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        roleService = module.get<RoleService>(RoleService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(roleService).toBeDefined();
    });

    describe('create', () => {
      it('should create a new role', async () => {
          const result = await roleService.create({
              name: 'Admin',
              permissions: ['READ', 'WRITE', 'DELETE'],
          });

          expect(result).toHaveProperty('statusCode', '00'); // Ensure this matches your actual response structure
          expect(result.data.role).toHaveProperty('id', 1);
          expect(prismaService.role.create).toHaveBeenCalled();
      });
  });

  describe('findAll', () => {
    it('should return all roles', async () => {
        const result = await roleService.findAll();
        expect(result).toHaveProperty('statusCode', '00'); // Ensure this matches your actual response structure
        expect(result.data.roles).toHaveLength(1);
    });
});

    describe('findOne', () => {
        it('should return a specific role', async () => {
            const result = await roleService.findOne(1);
            expect(result).toEqual(mockRole);
            expect(prismaService.role.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
            
        });

        it('should throw NotFoundException if role does not exist', async () => {
            jest.spyOn(prismaService.role, 'findUnique').mockResolvedValue(null); // Simulate non-existing role

            await expect(roleService.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update a role', async () => {
            const result = await roleService.update(1, {
                name: 'SuperAdmin',
                permissions: ['READ', 'WRITE', 'DELETE'],
            });
            expect(result.statusCode).toBe('00');
            expect(prismaService.role.update).toHaveBeenCalled();
        });
    });

    describe('remove', () => {
        it('should delete a role', async () => {
            const result = await roleService.remove(1);
            expect(result.statusCode).toBe('00');
            expect(prismaService.role.delete).toHaveBeenCalled();
        });
    });
});
