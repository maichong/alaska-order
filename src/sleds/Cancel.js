/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-09
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

/**
 * 买家取消订单
 */
export default class Cancel extends alaska.Sled {
  /**
   * @param data
   *        data.order  {Order}
   */
  async exec(data) {
    let order = data.order;
    order.state = 900;
    order.failure = 'Canceled';
    await order.save();
    order.createLog('Canceled');
  }
}
