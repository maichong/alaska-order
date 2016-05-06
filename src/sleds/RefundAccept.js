/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-09
 * @author Liang <liang@maichong.it>
 */

/**
 * 同意退款请求
 */
export default class RefundAccept extends service.Sled {
  /**
   * @param data
   *        data.order  {Order}
   */
  async exec(data) {
    let order = data.order;
    order.state = 900;
    order.refundTimeout = null;
    let currency = order.currency;
    let payed = order.payed;
    await order.save();
    order.createLog('Order refunded');
    return order;
  }
}
