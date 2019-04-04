export class Admin {
    public id: number;
    public active: boolean;
    public pseudoAdmin: string;
    public role: string;
    public prenomAdmin: string;
    public nomAdmin: string;

    constructor(
      id: number,
      active: boolean,
      pseudoAdmin: string,
      password: string,
      role: string,
      prenomAdmin: string,
      nomAdmin: string) { }
  }
