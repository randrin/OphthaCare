export class Patient {
    public idPatient: number;
    public nomPatient: string;
    public prenomPatient: string;
    public sexePatient: string;
    public dateNaisPatient: string;
    public addressePatient: string;
    public emailPatient: string;
    public agePatient: number;
    public numTelPatient: number;
    public numFixePatient: number;
    public domicilePatient: string;
    public infoSupplPatient: string;
    public codePostPatient: number;

    constructor (
        id: number,
        nomPatient: string,
        prenomPatient: string,
        sexePatient: string,
        dateNaisPatient: string,
        emailPatient: string,
        addressePatient: string,
        agePatient: number,
        numTelPatient: string,
        numFixePatient: number,
        domicilePatient: number,
        infoSupplPatient: string,
        codePostPatient: number,
    ) {

    }
}