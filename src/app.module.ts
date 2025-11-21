import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { EncomiendasModule } from './encomiendas/encomiendas.module';
import { Encomienda } from './encomiendas/entities/encomienda.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3307'),
      username: process.env.DB_USERNAME || 'mysql',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Encomienda],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    EncomiendasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
