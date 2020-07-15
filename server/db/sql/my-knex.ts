import { MyConnectionManager } from "./my-connection-manager";

export class MyKnex {

  private connectionManager: MyConnectionManager;

  public constructor() {

    this.connectionManager = new MyConnectionManager();

    this.connectionManager.connectAllDb().then((data) => {
      // console.log(connectionManager.connectionMap)
    }).catch(error => {
        console.log("Can't connect to common tenant database");
        console.log(error);
    });
  }

  public getConnectionManager(): MyConnectionManager {
    return this.connectionManager;
  }


}