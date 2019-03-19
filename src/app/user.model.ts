export class User {
  private _userId: number;

  constructor(
    private _firstName: string,
    private _familyName: string,
    private _tennisVlaanderenRanking: number,
    private _dateOfBirth: Date,
    private _password: string,
    private _phoneNumber: string,
    private _email: string,
    private _gender: string
  ) {}

  get firstName(): string {
    return this._firstName;
  }
  get familyName(): string {
    return this._familyName;
  }
  get tennisVlaanderenRanking(): number {
    return this._tennisVlaanderenRanking;
  }
  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }
  get password(): string {
    return this._password;
  }
  get phoneNumber(): string {
    return this._phoneNumber;
  }
  get email(): string {
    return this._email;
  }
  get gender(): string {
    return this._gender;
  }

  set firstName(value: string) {
    this._firstName = value;
  }
  set familyName(value: string) {
    this._familyName = value;
  }
  set tennisVlaanderenRanking(value: number) {
    this._tennisVlaanderenRanking = value;
  }
  set dateOfBirth(value: Date) {
    this._dateOfBirth = value;
  }
  set password(value: string) {
    this._password = value;
  }
  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }
  set email(value: string) {
    this._email = value;
  }
  set gender(value: string) {
    this._gender = value;
  }

  static fromJSON(json: any): User {
    return new User(
      json.firstName,
      json.familyName,
      json.tennisVlaanderenRanking,
      json.dateOfBirth,
      json.password,
      json.phoneNumber,
      json.email,
      json.gender
    );
  }
}
