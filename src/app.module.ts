import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { PrismaModule } from './prisma/prisma.module';
import * as cors from 'cors';


@Module({
  imports: [
    PrismaModule,
    UserModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService], 
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors())
      .forRoutes('*');
      
    consumer
      .apply(AuthMiddleware)
      .exclude(
        '/',
        '/auth/login',
        '/auth/register',
      )
      .forRoutes('*');
  }
}





