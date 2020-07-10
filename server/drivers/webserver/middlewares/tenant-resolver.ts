import { Request, Response } from 'express';

const getConnectionBySlug = require('../../../db/sql/connectionManager').getConnectionBySlug
const getNamespace = require('continuation-local-storage').getNamespace

export class TenantResolver {

  /**
  * Get the connection instance for the given tenant's slug and set it to the current context.
  **/
  resolver(req: Request, res: Response, next: any) {
    const slug = req.headers.slug;

    if (!slug) {
      console.log("No tenant setted")
      res.json({ message: `Please provide tenant's slug to connect.` });
      return;
    }
    if (next) {
      next();
    }
  }
  
}