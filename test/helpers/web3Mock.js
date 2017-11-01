/**
 * Created by mostafa on 7/26/17.
 */
export default () => ({
  modal: {
    web3: {
      eth: {
        contract: abi => ({ at: address => ({
          abi: [],
          address,
          LogBuy: (customArgs, options) => ({
            stopWatching: () => {
              abi;
            },
            options,
          }),
        }),
        }),
      },
      toAscii: () => 'ASCII',
    },
  },
  blocks: {
    number: '0x3e38b2',
  },

});
