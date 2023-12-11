import "reflect-metadata"
import { DataSource } from "typeorm"

import { ReunionModel } from "./entity/Reunion";
import { TurnoModel } from "./entity/Turno";
import { ReservaModel } from "./entity/Reserva";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [ReunionModel, TurnoModel, ReservaModel],
    migrations: [],
    subscribers: [],
})
