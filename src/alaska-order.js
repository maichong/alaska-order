/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-06
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export default class OrderService extends alaska.Service {
  constructor(options, alaska) {
    options = options || {};
    options.dir = __dirname;
    options.id = 'alaska-order';
    super(options, alaska);
  }
}
