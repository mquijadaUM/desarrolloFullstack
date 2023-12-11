import { on } from "events";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ReunionModel } from "./Reunion";
import { TurnoModel } from "./Turno";

@Entity()
export class ReservaModel {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    alumno: string;
    
    @ManyToOne(type => TurnoModel, {onDelete: "CASCADE"})
    @JoinColumn({name: "turno_id"})
    turno: TurnoModel;

    @ManyToOne(() => ReunionModel, reunion => reunion.reservas, {onDelete: "CASCADE"})
    @JoinColumn({name: "reunion_id"})
    reunion: ReunionModel;
    

    constructor(alumno: string, turno: TurnoModel, reunion: ReunionModel){
        this.alumno = alumno;
        this.turno = turno;
        this.reunion = reunion;
    }
}