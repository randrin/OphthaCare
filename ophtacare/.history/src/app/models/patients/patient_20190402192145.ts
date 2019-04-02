export class Patient {
    public idPatient: number;
    public nomPatient: string;
    public prenomPatient: string;
    public sexePatient: string;
    public dateNaisPatient: string;
    public agePatient: number;
    public numTelPatient: string;
    public numFixePatient: string;
    public domicilePatient: string;
    public infoSupplPatient: string;
    public codePostPatient: number;

    constructor (
        id: number,
        nomPatient: string,
        prenomPatient: string,
        sexePatient: string,
        dateNaisPatient: string,
        agePatient: number,
        numTelPatient: string,
        numFixePatient: string,
        domicilePatient: string,
        infoSupplPatient: string,
        codePostPatient: number,
    ) {

    }
}