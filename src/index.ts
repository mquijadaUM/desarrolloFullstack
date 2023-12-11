import { AppDataSource } from "./data-source"
import { ReunionModel } from "./entity/Reunion"
import { ReservaModel } from "./entity/Reserva"
import { TurnoModel } from "./entity/Turno"

/*AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)
    console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const users = await AppDataSource.manager.find(User)
    console.log("Loaded users: ", users)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))*/

AppDataSource.initialize().then(async () => {

    // const photo = new Photo()
    // photo.name = "Me and Bears"
    // photo.description = "I am near polar bears"
    // photo.filename = "photo-with-bears.jpg"
    // photo.views = 1
    // photo.isPublished = true

    // await AppDataSource.manager.save(photo)
    // console.log("Photo has been saved. Photo id is", photo.id)

    // const savedPhotos = await AppDataSource.manager.find(Photo)
    // console.log("All photos from the db: ", savedPhotos)

    /* const photo = new Photo()
    photo.name = "Me and Bears"
    photo.description = "I am near polar bears"
    photo.filename = "photo-with-bears.jpg"
    photo.views = 1
    photo.isPublished = true

    const photoRepository = AppDataSource.getRepository(Photo)

    await photoRepository.save(photo)
    console.log("Photo has been saved")

    const savedPhotos = await photoRepository.find()
    console.log("All photos from the db: ", savedPhotos) */

    /* const photoRepository = AppDataSource.getRepository(Photo) */
    /* const allPhotos = await photoRepository.find()
    console.log("All photos from the db: ", allPhotos)

    const firstPhoto = await photoRepository.findOneBy({
        id: 3,
    })
    console.log("First photo from the db: ", firstPhoto)

    const meAndBearsPhoto = await photoRepository.findOneBy({
        name: "Me and Bears",
    })
    console.log("Me and Bears photo from the db: ", meAndBearsPhoto)

    const allViewedPhotos = await photoRepository.findBy({ views: 1 })
    console.log("All viewed photos: ", allViewedPhotos)

    const allPublishedPhotos = await photoRepository.findBy({ isPublished: true })
    console.log("All published photos: ", allPublishedPhotos)

    const [photos, photosCount] = await photoRepository.findAndCount()
    console.log("All photos: ", photos)
    console.log("Photos count: ", photosCount)

    const photoToUpdate = await photoRepository.findOneBy({
        id: 3,
    })
    photoToUpdate.name = "Me, my friends and polar bears"
    await photoRepository.save(photoToUpdate) */

    /* const photoToRemove = await photoRepository.findOneBy({
        id: 5,
    })
    await photoRepository.remove(photoToRemove) */

    // create a photo
/*const photo = new Photo()
photo.name = "Me and Bears"
photo.description = "I am near polar bears"
photo.filename = "photo-with-bears.jpg"
photo.views = 1
photo.isPublished = true

// create a photo metadata
const metadata = new PhotoMetadata()
metadata.height = 640
metadata.width = 480
metadata.compressed = true
metadata.comment = "cybershoot"
metadata.orientation = "portrait"
metadata.photo = photo // this way we connect them

// get entity repositories
const photoRepository = AppDataSource.getRepository(Photo)
const metadataRepository = AppDataSource.getRepository(PhotoMetadata)

// first we should save a photo
await photoRepository.save(photo)

// photo is saved. Now we need to save a photo metadata
await metadataRepository.save(metadata)

// done
console.log(
    "Metadata is saved, and the relation between metadata and photo is created in the database too",
)*/

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
