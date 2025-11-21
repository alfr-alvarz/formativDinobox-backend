import {
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEncomiendaDto {
  @ApiProperty({
    description: 'Estado inicial de la encomienda',
    example: 'En Recepción',
    maxLength: 20,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  estado: string;

  // Decidido utilizar 'date' en vez de 'timestamptz' y por ello es string.

  @ApiProperty({
    description: 'Fecha de preparación (formato YYYY-MM-DD)',
    example: '2025-11-21',
    format: 'date',
  })
  @IsNotEmpty()
  @IsISO8601()
  fecha_prep: string;

  @ApiProperty({
    description: 'Ubicación donde se recibe el paquete',
    example: 'Sucursal Santiago Centro',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  ubicacion_prep: string;

  // --- CAMPOS OPCIONALES (Futuros) ---

  @ApiProperty({
    description: 'Fecha de despacho (Opcional al crear)',
    example: '2025-11-22',
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty() //si se envía el campo no puede estar vacío.
  fecha_desp?: string;

  @ApiProperty({
    description: 'Ubicación de despacho (Opcional al crear)',
    example: 'Centro de Distribución Norte',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  ubicacion_desp?: string;

  @ApiProperty({
    description: 'Fecha de tránsito (Opcional al crear)',
    example: '2025-11-23',
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  fecha_trans?: string;

  @ApiProperty({
    description: 'Ubicación actual en tránsito (Opcional al crear)',
    example: 'Ruta 68 - Km 40',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  ubicacion_trans?: string;

  @ApiProperty({
    description: 'Fecha de entrega final (Opcional al crear)',
    example: '2025-11-24',
    required: false,
  })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
  fecha_entrega?: string;

  @ApiProperty({
    description: 'Lugar donde se entregó (Opcional al crear)',
    example: 'Domicilio del Cliente',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  ubicacion_entrega?: string;
}
