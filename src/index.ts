console.log("Hello World");

// Tipos de datos

type Profesor = string;
type Alumno = string;

class Turno {
    private _inicio: Date;
    private _duracionMinutos: number;
    private _cupo: number;

    constructor(inicio: Date, duracionMinutos: number, cupo: number){
        this._inicio = inicio;
        this._duracionMinutos = duracionMinutos;
        this._cupo = cupo;
    }    

    get cupo(): number {
        return this._cupo;
    }

    get inicio(): Date {
        return this._inicio;
    }

    get duracionMinutos(): number {
        return this._duracionMinutos;
    }

    get fin(): Date {
        return new Date(this._inicio.getTime() + this._duracionMinutos * 60 * 1000);
    }

    estaSolapada(turno:Turno) : boolean {
        return (this._inicio >= turno.inicio && this._inicio < turno.fin) 
        || (this.fin > turno.inicio && this.fin <= turno.fin)
    }
}

class Reserva {
    private _alumno: Alumno;
    private _turno: Turno;

    constructor(alumno:Alumno, turno:Turno){
        this._alumno = alumno;
        this._turno = turno;
    }

    get alumno():Alumno {
        return this._alumno;
    }

    get turno():Turno {
        return this._turno;
    }
}

class Reunion {
    private _organizador: Profesor;
    private _descripcion: string;
    private _turnos: Turno[];
    private _reservas: Reserva[];

    constructor(organizador:Profesor, descripcion:string){
        this._organizador = organizador;
        this._descripcion = descripcion;
        this._turnos = [];
        this._reservas = [];
    }

    get organizador(): Profesor {
        return this._organizador;
    }

    get descripcion(): string {
        return this._descripcion;
    }

    get turnos(): Turno[] {
        return [...this._turnos];
    }

    get reservas(): Reserva[] {
        return [...this._reservas];
    }

    get inicio(): Date | null {
        return this._turnos.length > 0 ? this._turnos[0].inicio : null;
    }

    get fin(): Date | null {
        return this._turnos.length > 0 ? this._turnos[this._turnos.length - 1].fin : null;
    }

    agregarTurno(turno:Turno): void{
        console.log("Probando a agregar el turno con Hora de inicio: [" + turno.inicio + "] y hora de fin [" + turno.fin + "]")
        const solapada = this._turnos.some(t => t.estaSolapada(turno)) ;
        if(!solapada){
            this._turnos.push(turno);
            this._turnos.sort((a, b) => a.inicio.getTime() - b.inicio.getTime());
            console.log("Turno agregado con éxito")
        } else {
            console.log("El turno se solapa con algunos existentes en la reunión");
        }
    }

    haReservado(alumno:Alumno): boolean {
       return this.reservas.some(r => r.alumno === alumno);
    }

    isTurnoEnReunion(turno: Turno):boolean{
        return this._turnos.some(t => t == turno);
    }

    turnoDisponible(turno: Turno): boolean | null {
        if(this.isTurnoEnReunion(turno)){
            return  this.numeroReservas(turno) < turno.cupo;
        } else {
            new Error("El turno no es de esta reunión")
        }
    }

    turnosDisponibles(): boolean {
        return this._turnos.some(turno => this.turnoDisponible(turno));
    }

    numeroReservas(turno:Turno): number {
        return this._reservas.filter(reserva => reserva.turno === turno).length;
    }

    reservasAlumno(alumno:Alumno):number{
        return this._reservas.filter(reserva => reserva.alumno === alumno).length;
    }

    reservar(alumno:Alumno, turno:Turno){
        if(this.isTurnoEnReunion(turno) 
            && this.reservasAlumno(alumno) === 0
            && this.turnoDisponible(turno)){
                const reserva:Reserva = new Reserva(alumno,turno);
                this._reservas.push(reserva);
        } else {
            console.log("No ha sido posible crear la reserva");
        }
    }

    reservarPrimerTurnoLibre(alumno: Alumno): void{
        if(this.reservasAlumno(alumno) > 0){
            throw new Error("El alumno ya tiene reserva en la reunión");
        }

        const turnoDisp = this._turnos.find(turno => this.turnoDisponible(turno));

        if(!turnoDisp) {
            throw new Error("No hay turnos disponibles para reservar");
        }

        const nuevaReserva = new Reserva(alumno, turnoDisp);
        this._reservas.push(nuevaReserva);
    }

}
// ... Código anterior ...

// Ejemplo de uso
const reunion = new Reunion('Profesor', 'Reunión de ejemplo');

const turno1 = new Turno(new Date(2023, 10, 1, 10, 0), 60, 1);
const turno2 = new Turno(new Date(2023, 10, 1, 11, 0), 30, 2);
const turno3 = new Turno(new Date(2023, 10, 1, 12, 0), 45, 2);

reunion.agregarTurno(turno1);
reunion.agregarTurno(turno2);
reunion.agregarTurno(turno3);

// Reservar en un turno específico
reunion.reservar('Alumno1', turno1);

// Reservar en el primer turno libre
reunion.reservarPrimerTurnoLibre('Alumno2');

// Mostrar el número de reservas para cada turno
console.log('Número de reservas por turno:');
reunion.turnos.forEach(turno => {
    const numeroReservas = reunion.numeroReservas(turno);
    console.log(`Turno ${turno.inicio.toLocaleTimeString()} - ${numeroReservas} reserva(s)`);
});

// Mostrar todas las reservas
console.log('\nReservas de la reunión:', reunion.reservas);
