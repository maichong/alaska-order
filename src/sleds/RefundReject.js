/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-09
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

/**
 * 退款审核拒绝
 */
export default class RefundReject extends alaska.Sled {
  /**
   * @param data
   *        data.order  {Order}
   */
  async exec(data) {
    let order = data.order;
    if (order.shipped) {
      order.state = 500;
    } else {
      order.state = 400;
    }
    order.refundTimeout = null;
    await order.save();
    order.createLog('Refund rejected');
  }
}
