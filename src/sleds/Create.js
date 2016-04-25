/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-06
 * @author Liang <liang@maichong.it>
 */

import Order from '../models/Order';

/**
 * 下单Sled
 */
export default class Create extends service.Sled {

  /**
   * @param data 订单数据对象
   */
  async exec(data) {
    let order = new Order(data);
    await order.save();
    return order;
  }
}
