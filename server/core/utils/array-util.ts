export class ArrayUtil {

  removerDuplicadosENulos(arr: Array<any>) {

    if ( arr ) {
      for ( let i = 0; i < arr.length; i++ ) {
        if ( !arr[i] ) {
          delete arr[i];
        }
      }

      try {
        return arr.filter( (o, index) => {
          const _o = JSON.stringify(o);
          return index === arr.findIndex(obj => {
            return JSON.stringify(obj) === _o;
          })
        })
      }
      catch (e) {
        return arr;
      }
    }
  }

}