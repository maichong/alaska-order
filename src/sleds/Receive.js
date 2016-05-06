/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-09
 * @author Liang <liang@maichong.it>
 */

export default class Receive extends service.Sled {
  /**
   * @param data
   *        data.order  {Order}
   */
  async exec(data) {
    let order = data.order;
    if (order.state === 500) {
      order.state = 600;
    }
    order.receiveTimeout = null;
    await order.save();
    order.createLog('Order received');
    return order;
  }
}
