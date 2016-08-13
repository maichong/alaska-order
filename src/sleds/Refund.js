/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-09
 * @author Liang <liang@maichong.it>
 */

import moment from 'moment';
import alaska from 'alaska';
import service from '../';
import SETTINGS from 'alaska-settings';

/**
 * 用户申请退款
 */
export default class Refund extends alaska.Sled {
  /**
   * @param data
   *        data.order  {Order}
   *        data.reason string
   *        data.amount number
   */
  async exec(data) {
    let order = data.order;
    if ([400, 500, 800].indexOf(order.state) < 0) service.error('Order state error');
    order.state = 800;

    if (!order.refundTimeout) {
      let refundTimeout = await SETTINGS.get('refundTimeout');
      order.refundTimeout = moment().add(refundTimeout, 's').toDate();
    }
    order.refundReason = data.reason;
    order.refundAmount = data.amount;
    await order.save();
    order.createLog('Apply refund');
  }
}
