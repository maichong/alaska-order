/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-06
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export default class Reject extends alaska.Sled {
  /**
   * @param data
   *        data.order  {Order}
   */
  async exec(data) {
    let order = data.order;
    if (order.state === 300) {
      order.state = 900;
    }
    if (!order.failure) {
      order.failure = 'Rejected';
    }
    await order.save();
    order.createLog('Order rejected');
  }
}
