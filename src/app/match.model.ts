import { User } from './user.model';

export class Match {
  constructor(
    private _loserFullName: string,
    private _loserId: number,
    private _matchId: number,
    private _winnerFullName: string,
    private _winnerId: number,
    private _winnerSet1: number,
    private _winnerSet2: number,
    private _winnerSet3: number,
    private _loserSet1: number,
    private _loserSet2: number,
    private _loserSet3: number
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

  get matchId(): number {
    return this._matchId;
  }

  get winnerSet1():number{
    return this._winnerSet1;
  }

  get winnerSet2():number{
    return this._winnerSet2;
  }
  
  get winnerSet3():number{
    return this._winnerSet3;
  }

  get loserSet1():number{
    return this._loserSet1;
  }

  get loserSet2():number{
    return this._loserSet2;
  }

  get loserSet3():number{
    return this._loserSet3;
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
      json.loserFullName,
      json.loserId,
      json.matchId,
      json.winnerFullName,
      json.winnerId,
      json.winnerSet1, 
      json.winnerSet2, 
      json.winnerSet3,
      json.loserSet1,
      json.loserSet2,
      json.loserSet3 
    );
  }
}
