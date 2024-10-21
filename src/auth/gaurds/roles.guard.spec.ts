// src/auth/guards/roles.guard.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesGuard, Reflector],
    }).compile();

    rolesGuard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should return true if no roles are required', () => {
    const context = createMockExecutionContext();
    jest.spyOn(reflector, 'get').mockReturnValue(undefined);
    expect(rolesGuard.canActivate(context)).toBe(true);
  });

  it('should return true if user has the required role', () => {
    const context = createMockExecutionContext({ roles: ['Admin'] });
    jest.spyOn(reflector, 'get').mockReturnValue(['Admin']);
    expect(rolesGuard.canActivate(context)).toBe(true);
  });

  it('should return false if user does not have the required role', () => {
    const context = createMockExecutionContext({ roles: ['User'] });
    jest.spyOn(reflector, 'get').mockReturnValue(['Admin']);
    expect(rolesGuard.canActivate(context)).toBe(false);
  });

  it('should return false if user has no roles', () => {
    const context = createMockExecutionContext({ roles: [] });
    jest.spyOn(reflector, 'get').mockReturnValue(['Admin']);
    expect(rolesGuard.canActivate(context)).toBe(false);
  });

  it('should return false if user is undefined', () => {
    const context = createMockExecutionContext(undefined);
    jest.spyOn(reflector, 'get').mockReturnValue(['Admin']);
    expect(rolesGuard.canActivate(context)).toBe(false);
  });

  function createMockExecutionContext(user = { roles: [] }): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          user,
        }),
      }),
    } as unknown as ExecutionContext;
  }
});
