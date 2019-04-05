import { User } from './user.model';

export class Match {
  constructor(
    private _winnerFullName: string,
    private _winnerId: number,
    private _loserFullName: string,
    private _loserId: number
  ) {}

  get winnerFullName(): string {
    return this._winnerFullName;
  }

  get winnerId(): number {
    return this._winnerId;
  }

  get loserFullName(): string {
    return this._loserFullName;
  }

  get loserId(): number {
    return this._loserId;
  }

  set winnerFullName(value: string) {
    this._winnerFullName = value;
  }

  set winnerId(value: number) {
    this._winnerId = value;
  }

  set loserFullName(value: string) {
    this._loserFullName = value;
  }

  set loserId(value: number) {
    this._loserId = value;
  }

  static fromJSON(json: any): Match {
    return new Match(
      json.winnerFullName,
      json.winnerId,
      json.loserFullName,
      json.loserId
    );
  }
}
