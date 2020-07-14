import { Path, GET } from 'typescript-rest'

@Path('/oi')
export class TesteRota {

  @GET
  @Path('/xablau')
  xablau(): string {
    return "Hello ";
  }

}