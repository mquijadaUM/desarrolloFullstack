import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ReunionModel } from "./Reunion";

@Entity()
export class TurnoModel{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    inicio: Date;

    @Column()
    fin: Date;

    @Column()
    duracionEnMinutos: number;

    @Column()
    cupo: number;

    @ManyToOne(() => ReunionModel, reunion => reunion.turnos, {onDelete: "CASCADE"})
    @JoinColumn({name: "reunion_id"})
    reunion: ReunionModel;

    constructor(inicio: Date, fin: Date, duracionEnMinutos: number, cupo: number, reunion: ReunionModel){
        this.inicio = inicio;
        this.fin = fin;
        this.duracionEnMinutos = duracionEnMinutos;
        this.cupo = cupo;
        this.reunion = reunion;
    }
}