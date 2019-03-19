import { User } from './user.model';
import { Match } from './match.model';

export class Tournament {
  private _tournamentId: number;
  constructor(
    private _name: string,
    private _endDate: Date,
    private _startDate: Date,
    private _gender: string,
    private _participants: User[],
    private _matches: Match[]
  ) {}

  get name(): string {
    return this._name;
  }
  get endDate(): Date {
    return this._endDate;
  }
  get startDate(): Date {
    return this._startDate;
  }
  get gender(): string {
    return this._gender;
  }
  get participants(): User[] {
    return this._participants;
  }
  get matches(): Match[] {
    return this._matches;
  }

  
  set name(value:string){
      this._name = value;
  }
  set endDate(value: Date){
      this._endDate = value;
  }
  set startDate(value: Date){
      this._startDate = value;
  }
  set gender(value:string){
      this._gender = value;
  }
  set participants(value: User[]){
      this._participants = value;
  }
  set matches(value: Match[]){
      this._matches = value;
  }
}
