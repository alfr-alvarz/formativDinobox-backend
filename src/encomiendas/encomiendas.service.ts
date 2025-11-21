import { Injectable } from '@nestjs/common';
import { CreateEncomiendaDto } from './dto/create-encomienda.dto';
import { UpdateEncomiendaDto } from './dto/update-encomienda.dto';

@Injectable()
export class EncomiendasService {
  create(createEncomiendaDto: CreateEncomiendaDto) {
    return 'This action adds a new encomienda';
  }

  findAll() {
    return `This action returns all encomiendas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} encomienda`;
  }

  update(id: number, updateEncomiendaDto: UpdateEncomiendaDto) {
    return `This action updates a #${id} encomienda`;
  }

  remove(id: number) {
    return `This action removes a #${id} encomienda`;
  }
}
