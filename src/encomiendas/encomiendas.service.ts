import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEncomiendaDto } from './dto/create-encomienda.dto';
import { UpdateEncomiendaDto } from './dto/update-encomienda.dto';
import { Encomienda } from './entities/encomienda.entity';

// Definimos los estados para evitar errores de tipeo
export enum EstadoEncomienda {
  RECEPCION = 'En Recepción',
  DESPACHO = 'En Despacho',
  TRANSITO = 'En Tránsito',
  ENTREGADO = 'Entregado',
}

@Injectable()
export class EncomiendasService {
  constructor(
    @InjectRepository(Encomienda)
    private encomiendaRepo: Repository<Encomienda>,
  ) {}

  // Helper para obtener la fecha actual formato YYYY-MM-DD
  private getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * CREAR: Inicializa siempre en estado "En Recepción"
   * Asume que el DTO trae la 'ubicacion_prep' u otros datos iniciales
   */
  async create(createEncomiendaDto: CreateEncomiendaDto): Promise<Encomienda> {
    const nuevaEncomienda = this.encomiendaRepo.create({
      ...createEncomiendaDto, // Copia los datos que vienen del frontend
      estado: EstadoEncomienda.RECEPCION, // Forza el estado inicial
      fecha_prep: this.getCurrentDate(), // Asigna fecha actual
      // Si el DTO no trae la ubicación, deberías manejarlo aquí o en el DTO
    });

    return await this.encomiendaRepo.save(nuevaEncomienda);
  }

  async findAll(): Promise<Encomienda[]> {
    return await this.encomiendaRepo.find();
  }

  async findOne(id: number): Promise<Encomienda> {
    const encomienda = await this.encomiendaRepo.findOneBy({ id });
    if (!encomienda) {
      throw new NotFoundException(`La encomienda con ID #${id} no existe`);
    }
    return encomienda;
  }

  /**
   * UPDATE GENÉRICO:
   * Usar si se necesita corregir un dato (ej. un nombre mal escrito),
   * pero para cambiar estados preferir los métodos de abajo.
   */
  async update(
    id: number,
    updateEncomiendaDto: UpdateEncomiendaDto,
  ): Promise<Encomienda> {
    const encomienda = await this.findOne(id);
    // TypeORM merge actualiza los campos que vengan en el DTO sobre la entidad
    this.encomiendaRepo.merge(encomienda, updateEncomiendaDto);
    return await this.encomiendaRepo.save(encomienda);
  }

  async remove(id: number): Promise<void> {
    const encomienda = await this.findOne(id);
    await this.encomiendaRepo.remove(encomienda);
  }

  // ==========================================
  // MÉTODOS ESPECÍFICOS DE CAMBIO DE ESTADO
  // ==========================================

  async moverADespacho(id: number, ubicacion: string): Promise<Encomienda> {
    const encomienda = await this.findOne(id);
    encomienda.estado = EstadoEncomienda.DESPACHO;
    encomienda.fecha_desp = this.getCurrentDate();
    encomienda.ubicacion_desp = ubicacion;
    return await this.encomiendaRepo.save(encomienda);
  }

  async moverATransito(id: number, ubicacion: string): Promise<Encomienda> {
    const encomienda = await this.findOne(id);
    encomienda.estado = EstadoEncomienda.TRANSITO;
    encomienda.fecha_trans = this.getCurrentDate();
    encomienda.ubicacion_trans = ubicacion;
    return await this.encomiendaRepo.save(encomienda);
  }

  async marcarEntregado(id: number, ubicacion: string): Promise<Encomienda> {
    const encomienda = await this.findOne(id);
    encomienda.estado = EstadoEncomienda.ENTREGADO;
    encomienda.fecha_entrega = this.getCurrentDate();
    encomienda.ubicacion_entrega = ubicacion;
    return await this.encomiendaRepo.save(encomienda);
  }
}
