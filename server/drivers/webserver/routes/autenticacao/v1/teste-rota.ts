import { Path, GET } from 'typescript-rest';

@Path('/kkk')
export class TesteRota {

    @Path('/xablau')
    @GET
    xablau(): string {
      return "Hello ";
    }

}