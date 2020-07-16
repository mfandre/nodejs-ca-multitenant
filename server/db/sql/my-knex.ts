import { MyConnectionManager } from "./my-connection-manager";

export class MyKnex {

  private connectionManager: MyConnectionManager;

  public getConnectionManager(): MyConnectionManager {
    if ( this.connectionManager ) {
      return this.connectionManager;
    }

    return this.connectionManager = new MyConnectionManager();
  }
}