import { AppDataSource } from "./data-source"
import { ReunionModel } from "./entity/Reunion"
import { ReservaModel } from "./entity/Reserva"
import { TurnoModel } from "./entity/Turno"

const reunionRepository = AppDataSource.getRepository(ReunionModel);
const turnoRepository = AppDataSource.getRepository(TurnoModel);
const reservaRepository = AppDataSource.getRepository(ReservaModel);

//limpiar la base de datos
await reservaRepository.clear();
await turnoRepository.clear();
await reunionRepository.clear();

const organizadorConst = "Juan Perez";
const descripcion = "Reunion de prueba";
const turnos = [];
const reservas = [];

const reunion = new ReunionModel(organizadorConst, descripcion, turnos, reservas);

const inicio = new Date();
const fin = new Date();
const duracionEnMinutos = 60;
const cupo = 10;
const turno = new TurnoModel(inicio,fin, duracionEnMinutos, cupo, reunion);


reunion.turnos.push(turno);

// actualizar reunion con el turno

const alumno = "Gerónimo Martínez";
const reserva = new ReservaModel(alumno, turno, reunion);

reunion.reservas.push(reserva);

await reunionRepository.save(reunion);

//encuentra la reunion por organizador
const reunionByOrganizador = await reunionRepository.findOneBy({
    organizador: organizadorConst,
});

console.log("Id de la reunión del organizador: "+ organizadorConst, reunionByOrganizador.id);


//encuentra la reunion por id
const reunionById = await reunionRepository.findOneBy({
    id: reunionByOrganizador.id,
});

//comprueba que ambas reuniones son iguales
console.log("Son Iguales? ", reunionByOrganizador.id === reunionById.id);

//mostrar la reunion
console.log("Reunion antes de borrar: ", reunionById);

// borra las listas de turnos y reservas de la reunion
const reservasToDelete = reunionById.reservas;
const turnosToDelete = reunionById.turnos;
reunionById.reservas = [];
reunionById.turnos = [];

// borra las reservas
await reservaRepository.remove(reservasToDelete);

// borra los turnos
await turnoRepository.remove(turnosToDelete);

//mostrar la reunion
console.log("Reunion después de borrar: ", reunionById);

//actualiza la reunion
await reunionRepository.save(reunionById);

// crea un turno nuevo a las 10:00
const inicio2 = new Date();
inicio2.setHours(10);
inicio2.setMinutes(0);
const fin2 = new Date();
fin2.setHours(11);
fin2.setMinutes(0);
const duracionEnMinutos2 = 60;
const cupo2 = 10;
const turno2 = new TurnoModel(inicio2,fin2, duracionEnMinutos2, cupo2, reunionById);

// crea una reserva nueva
const alumno2 = "Ricardo Fort";
const reserva2 = new ReservaModel(alumno2, turno2, reunionById);

// añadir el turno y la reserva a la reunion
reunionById.turnos.push(turno2);
reunionById.reservas.push(reserva2);

// guardar la reunion
await reunionRepository.save(reunionById);

//recuperar la reunion
const reunionById2 = await reunionRepository.findOneBy({
    id: reunionById.id,
});

//mostrar la reunion
console.log("Reunion después de actualizar: ", reunionById2);

// crea un turno nuevo a las 11:00
const inicio3 = new Date();
inicio3.setHours(11);
inicio3.setMinutes(0);
const fin3 = new Date();
fin3.setHours(12);
fin3.setMinutes(0);
const duracionEnMinutos3 = 60;
const cupo3 = 10;
const turno3 = new TurnoModel(inicio3,fin3, duracionEnMinutos3, cupo3, reunionById);

// añaide el turno a la reunion
reunionById.turnos.push(turno3);

// guardar la reunion
await reunionRepository.save(reunionById);

//recuperar la reunion
const reunionById3 = await reunionRepository.findOneBy({
    id: reunionById.id,
});

//mostrar la reunion
console.log("Reunion después de actualizar: ", reunionById3);

//borrar la reunion
await reunionRepository.remove(reunionById);


}).catch(error => console.log(error))
