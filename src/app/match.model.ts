import { User } from './user.model';

export class Match {
  private _matchId: number;
  private _gamesWonPlayer1Set1: number;
  private _gamesWonPlayer1Set2: number;
  private _gamesWonPlayer1Set3: number;
  private _gamesWonPlayer2Set1: number;
  private _gamesWonPlayer2Set2: number;
  private _gamesWonPlayer2Set3: number;
  private _player1Won: boolean;
  private _player2Won: boolean;

  constructor(private _player1: User, private _player2: User) {}

  get player1(): User {
    return this._player1;
  }
  get player2(): User {
    return this._player2;
  }
  get gamesWonPlayer1Set1(): number {
    return this._gamesWonPlayer1Set1;
  }
  get gamesWonPlayer1Set2(): number {
    return this._gamesWonPlayer1Set2;
  }
  get gamesWonPlayer1Set3(): number {
    return this._gamesWonPlayer1Set3;
  }
  get gamesWonPlayer2Set1(): number {
    return this._gamesWonPlayer2Set1;
  }
  get gamesWonPlayer2Set2(): number {
    return this._gamesWonPlayer2Set2;
  }
  get gamesWonPlayer2Set3(): number {
    return this._gamesWonPlayer2Set3;
  }
  get player1Won(): boolean {
    return this._player1Won;
  }
  get player2Won(): boolean {
    return this._player2Won;
  }

  set player1(value: User) {
    this._player1 = value;
  }
  set player2(value: User) {
    this._player2 = value;
  }
  set gamesWonPlayer1Set1(value: number) {
    this._gamesWonPlayer1Set1 = value;
  }
  set gamesWonPlayer1Set2(value: number) {
    this._gamesWonPlayer1Set2 = value;
  }
  set gamesWonPlayer1Set3(value: number) {
    this._gamesWonPlayer1Set3 = value;
  }
  set gamesWonPlayer2Set1(value: number) {
    this._gamesWonPlayer2Set1 = value;
  }
  set gamesWonPlayer2Set2(value: number) {
    this._gamesWonPlayer2Set2 = value;
  }
  set gamesWonPlayer2Set3(value: number) {
    this._gamesWonPlayer2Set3 = value;
  }
  set player1Won(value: boolean) {
    this._player1Won = value;
  }
  set player2Won(value: boolean) {
    this._player2Won = value;
  }

  static fromJSON(json: any): Match {
    return new Match(
      json.player1,
      json.player2
    );
  }
}
