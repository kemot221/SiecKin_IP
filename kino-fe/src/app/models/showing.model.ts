export class ShowingModel {
    id!: number;
    hall_id!: number;
    time!: Date;
    movie_id!: number;
}

export class ShowingSeats {
    row!: number;
    seat!: number;
    is_taken: boolean = false;
}