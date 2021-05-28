
//getConnectionBySlug = require('../../../db/sql/connectionManager').getConnectionBySlug

let tenantResolver = module.exports = {}

/**
 * Get the connection instance for the given tenant's slug and set it to the current context.
**/
tenantResolver.resolve = (req, res, next) => {
  const slug = req.headers.slug;

  if (!slug) {
    console.log("No tenant setted")
    res.json({ message: `Please provide tenant's slug to connect.` });
    return;
  }

  next();
}