import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe
} from '@nestjs/common';
import { EncomiendasService } from './encomiendas.service';
import { CreateEncomiendaDto } from './dto/create-encomienda.dto';
import { UpdateEncomiendaDto } from './dto/update-encomienda.dto';

@Controller('encomiendas')
export class EncomiendasController {
  constructor(private readonly encomiendasService: EncomiendasService) { }

  // ==========================================
  // 1. ENDPOINTS ESTÁNDAR (CRUD)
  // ==========================================

  @Post()
  create(@Body() createEncomiendaDto: CreateEncomiendaDto) {
    // Al llamar a este, el servicio asigna automáticamente "En Recepción"
    return this.encomiendasService.create(createEncomiendaDto);
  }

  @Get()
  findAll() {
    return this.encomiendasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.encomiendasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEncomiendaDto: UpdateEncomiendaDto
  ) {
    // Este úsalo solo para corregir datos (ej. corregir nombre mal escrito)
    return this.encomiendasService.update(id, updateEncomiendaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.encomiendasService.remove(id);
  }

  // ==========================================
  // 2. ENDPOINTS DE TRANSICIÓN DE ESTADO
  // Estos endpoint requieren que envíes la "ubicacion" en el Body
  // ==========================================

  // Ruta: PATCH /encomiendas/1/despacho
  @Patch(':id/despacho')
  moverADespacho(
    @Param('id', ParseIntPipe) id: number,
    @Body('ubicacion') ubicacion: string
  ) {
    return this.encomiendasService.moverADespacho(id, ubicacion);
  }

  // Ruta: PATCH /encomiendas/1/transito
  @Patch(':id/transito')
  moverATransito(
    @Param('id', ParseIntPipe) id: number,
    @Body('ubicacion') ubicacion: string
  ) {
    return this.encomiendasService.moverATransito(id, ubicacion);
  }

  // Ruta: PATCH /encomiendas/1/entregado
  @Patch(':id/entregado')
  marcarEntregado(
    @Param('id', ParseIntPipe) id: number,
    @Body('ubicacion') ubicacion: string
  ) {
    return this.encomiendasService.marcarEntregado(id, ubicacion);
  }
}