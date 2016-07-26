/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-09
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

/**
 * 支付订单
 */
export default class Pay extends alaska.Sled {
  /**
   * @param data
   *        data.order  {Order}
   */
  async exec(data) {
    let order = data.order;
    if (order.state === 200) {
      order.state = 300;
    }
    order.paymentTimeout = null;
    await order.save();
    order.createLog('Order payed');
  }
}
