import { ShowingModel } from "./showing.model";

export class MovieModel {
    id!: number;
    title!: string;
    description!: string;
    length!: number;
    genre!: number;
    poster!: string;
}

export class MovieWithShowings extends MovieModel {
    showings!: ShowingModel[];
}