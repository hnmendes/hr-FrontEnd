import { Gender } from "./enums/gender";
import { Team } from "./enums/team";

export class People {
    id: string;
    name: string;
    birthDate: Date;
    gender: Gender;
    email: string;
    startDate: Date;
    cpf: string;
    team: Team;
}
