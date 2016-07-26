/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-09
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

/**
 * 审核订单
 */
export default class Confirm extends alaska.Sled {
  /**
   * @param data
   *        data.order  {Order}
   */
  async exec(data) {
    let order = data.order;
    if (order.state === 300) {
      order.state = 400;
    }
    await order.save();
    order.createLog('Order confirmed');
  }
}
