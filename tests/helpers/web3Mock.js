/**
 * Created by mostafa on 7/26/17.
 */
export default () => ({
  modal: {
    web3: {
      eth : {
        contract : (abi) => {
          return { at : (address) => {
            return {
              abi : [] ,
              address:address ,
              LogBuy : (customArgs , options ) =>{
                return {
                  stopWatching: () => {

                  },
                  options:options
                }
              }
            };
          }
          }
        }
      },
      toAscii : () => {
        return "ASCII";
      }
    }
  },
  blocks:{
    number : 1234667
  }

});
