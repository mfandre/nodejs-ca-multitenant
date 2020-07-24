import { ConnectionManager } from './connection-manager';

export class KnexManager {

  private static connectionManager: ConnectionManager;

  public static getConnectionManager(): ConnectionManager {
    if ( this.connectionManager ) {
      return this.connectionManager;
    }

    return this.connectionManager = new ConnectionManager();
  }
}