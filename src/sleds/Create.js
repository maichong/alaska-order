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
   *        data.pre    [boolean]
   *        data.user   [User] 用户
   *        data.orders [Order] 前置钩子生成的订单
   */
  async exec(data) {
    let orders = data.orders;
    if (!orders || !orders.length) {
      //前置钩子未生成任何订单
      service.error('Can not create any order');
    }
    if (!data.pre) {
      for (let order of orders) {
        for (let item of order.items) {
          await item.save();
        }
        await order.save();
        order.createLog('Created');
      }
    }
    return data;
  }
}
