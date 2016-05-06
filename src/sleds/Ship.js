/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-09
 * @author Liang <liang@maichong.it>
 */

import moment from 'moment';

const SETTINGS = service.service('settings');

/**
 * 发货操作
 */
export default class Ship extends service.Sled {
  /**
   * @param data
   *        data.order  {Order}
   */
  async exec(data) {
    let order = data.order;
    if (order.state === 400) {
      order.state = 500;
    }
    if (order.state === 500 && !order.receiveTimeout) {
      let receiveTimeout = await SETTINGS.get('receiveTimeout');
      order.receiveTimeout = moment().add(receiveTimeout, 's').toDate();
    }
    order.shipped = true;
    await order.save();
    order.createLog('Order shipped');
    return order;
  }
}
