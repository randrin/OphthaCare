export class Admin {
    public id: number;
    public nomAdmin: boolean;
    public prenomAdmin: string;
    public pseudoAdmin: string;
    public roleAdmin: string;
    public activeAdmin: string;
    public lastLoginAdmin: string;
    public registrationAdmin: string;

    constructor(
      id: number,
      nomAdmin: string,
      prenomAdmin: string,
      pseudoAdmin: string,
      roleAdmin: string,
      activeAdmin: string,
      lastLoginAdmin: string,
      registrationAdmin: string
      ) { }
  }
