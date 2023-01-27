export class ShowingModel {
    id!: number;
    hall_id!: number;
    date!: Date;
    movie_id!: number;
    taken_seats!: ShowingSeats[];
}

export class ShowingSeats {
    row!: number;
    seat!: number;
    is_taken: boolean = false;
}