import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

// Declaration merging for Express Request
declare global {
  namespace Express {
    interface Request {
      user?: any; // Ensure user is defined here
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Auth token is not supplied or invalid format');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new UnauthorizedException('Invalid token');
      }
      req.user = decoded; // Attach the decoded user info to request
      next();
    });
  }
}
