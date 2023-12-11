import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReservaModel } from "./Reserva";
import { TurnoModel } from "./Turno";

@Entity()
export class ReunionModel{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    organizador: string;

    @Column()
    descripcion: string;

    @OneToMany(() => TurnoModel, turno => turno.reunion, {eager: true, cascade: true})
    turnos: TurnoModel[];

    @OneToMany(() => ReservaModel, reserva => reserva.reunion, {eager: true, cascade: true})
    reservas: ReservaModel[];

    constructor(organizador: string, descripcion: string, turnos: TurnoModel[], reservas: ReservaModel[]){
        this.organizador = organizador;
        this.descripcion = descripcion;
        this.turnos = turnos;
        this.reservas = reservas;
    }

}