import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('encomiendas')
export class Encomienda {
  @PrimaryGeneratedColumn()
  id: number;

  /*
    @Column({ type: 'varchar', length: 20, unique: true })
    codigo_seguimiento: string;
    Podría hacerse con string usando uuid.
    Haría falta la librería y ver para generarlo antes de las inserciones con
    @BeforeInsert()
    */

  @Column({ type: 'varchar', length: 20 })
  estado: string;

  @Column({ type: 'date' })
  fecha_prep: string;

  @Column({ type: 'varchar', length: 50 })
  ubicacion_prep: string;

  @Column({ type: 'date', nullable: true })
  fecha_desp: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ubicacion_desp: string;

  @Column({ type: 'date', nullable: true })
  fecha_trans: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ubicacion_trans: string;

  @Column({ type: 'date', nullable: true })
  fecha_entrega: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ubicacion_entrega: string;
}
