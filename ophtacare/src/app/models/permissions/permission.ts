export class Permission {
  public idPermission: number;
  public nomPermission: string;
  public createPermission: boolean;
  public readPermission: boolean;
  public updatePermission: boolean;
  public deletePermission: boolean;
  public downloadPermission: boolean;

  constructor(
    idPermission: number,
    nomPermission: string,
    createPermission: boolean,
    readPermission: boolean,
    updatePermission: boolean,
    deletePermission: boolean,
    downloadPermission: boolean,
  ) {

  }
}
