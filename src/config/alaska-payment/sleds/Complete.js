/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-24
 * @author Liang <liang@maichong.it>
 */

const ORDER = service.service('alaska-order');
const Order = service.model('alaska-order.Order');

export async function pre() {
  let payment = data.payment;
  if (!payment.orders || !payment.orders.length) return;
  for (let order of payment.orders) {
    if (!order.save) {
      order = await Order.findById(order);
    }
    if (payment.orders.length === 1) {
      order.payed += payment.amount;
    } else if (!order.payed) {
      //多个订单一起支付
      order.payed = order.pay;
    } else {
      //多个订单一起支付,并且当前订单中已经有已支付金额
      //异常情况
    }
    await ORDER.run('Pay', { order });
  }
}
