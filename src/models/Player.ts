import { Schema} from "@colyseus/schema";

export class Player extends Schema {
    id: string | undefined;
    name: string | undefined;
    color: string | undefined;
    admin: boolean | undefined;
    inGame: boolean = false;
    score: number = 0;
    roundDone: boolean = false;
    lastGuessLat: number = 0;
    lastGuessLng: number = 0;
    lastDistance: number | undefined;
    lastScore: number = 0;
    lastTimeNeeded: number | undefined;
    disconnectedPreviously = false;
    disconnectedCurrently = false;
    timeJoined: number = 0;
}