import { MyConnectionManager } from "./my-connection-manager";

export class MyKnex {

  private static connectionManager: MyConnectionManager;

  public static getConnectionManager(): MyConnectionManager {
    if ( this.connectionManager ) {
      return this.connectionManager;
    }

    return this.connectionManager = new MyConnectionManager();
  }
}