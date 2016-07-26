/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-09
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

/**
 * 退款申请超时,退款应当自动通过
 */
export default class RefundTimeout extends alaska.Sled {
  /**
   * @param data
   *        data.order  {Order}
   */
  async exec(data) {
    let order = data.order;
    order.state = 900;
    order.refundTimeout = null;
    await order.save();
    order.createLog('Order refunded');
  }
}
