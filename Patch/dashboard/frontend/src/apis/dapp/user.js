'use strict';

import createError from 'http-errors';
import { ethToObject, strToBytes32, strToHex, hexToStr } from '@/apis/dapp/utils';
import utils from '@/common/utils';
import config from '@/apis/dapp/config';

class User {

  constructor(ewallet, addr, abi) {
    this.ewallet = ewallet;
    this.addr = addr;
    this.abi = abi;
    // this.instance = ewallet.contract(addr, abi);
  };

  init(addr, abi) {
    this.addr = addr;
    this.abi = abi;
  };

  // DONE
  _buildPolicyKey(keys, keyPrefix) {
    let maxIndex = -1;
    keys.forEach((key) => {
    });
  };

  // DONE
  _preRemove(data) {
  };

  async install(func = null) {
    try {
    } catch (error) {
      throw error;
    }
  };
  async statistics(statId) {
  }
}

export default User;
