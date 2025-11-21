import { Module } from '@nestjs/common';
import { EncomiendasService } from './encomiendas.service';
import { EncomiendasController } from './encomiendas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encomienda } from './entities/encomienda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Encomienda])],
  controllers: [EncomiendasController],
  providers: [EncomiendasService],
  exports: [TypeOrmModule],
})
export class EncomiendasModule {}
