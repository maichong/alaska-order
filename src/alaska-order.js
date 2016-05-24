/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-06
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export default class OrderService extends alaska.Service {
  constructor(options, alaska) {
    options = options || {};
    options.dir = options.dir || __dirname;
    options.id = options.id || 'alaska-order';
    super(options, alaska);
  }

  preLoadConfig() {
    let PAYMENT = this.alaska.service('alaska-payment', true);
    if (PAYMENT) {
      PAYMENT.addConfigDir(__dirname + '/config/alaska-payment');
    }
  }
}
