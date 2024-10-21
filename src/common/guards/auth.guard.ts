// src/common/guards/auth.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    return Boolean(request.user); // Check if the user is authenticated
  }
}
