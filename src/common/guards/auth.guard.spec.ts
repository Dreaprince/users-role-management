// src/auth/guards/auth.guard.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from './auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  it('should return true if user is authenticated', () => {
    const context = createMockExecutionContext({ user: {} });
    expect(authGuard.canActivate(context)).toBe(true);
  });

  it('should return false if user is not authenticated', () => {
    const context = createMockExecutionContext({});
    expect(authGuard.canActivate(context)).toBe(false);
  });

  it('should return false if user is null', () => {
    const context = createMockExecutionContext(null);
    expect(authGuard.canActivate(context)).toBe(false);
  });

  function createMockExecutionContext(user: any): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          user, // This will simulate the user object from the request
        }),
      }),
    } as unknown as ExecutionContext;
  }
});
