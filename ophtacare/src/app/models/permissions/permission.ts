export class Permission {
  subscribe(arg0: (response: any) => void) {
    throw new Error("Method not implemented.");
  }
  public createItem: boolean;
  public readItem: boolean;
  public updateItem: boolean;
  public deleteItem: boolean;
  public downloadItem: boolean;

  constructor(
    createItem: boolean,
    readItem: boolean,
    updateItem: boolean,
    deleteItem: boolean,
    downloadItem: boolean,
  ) {

  }
}
