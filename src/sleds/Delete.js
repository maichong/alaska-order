/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-13
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';

export default class Delete extends alaska.Sled {
  /**
   * @param data
   *        data.order  {Order}
   *        [data.ctx]
   *        [data.admin]
   */
  async exec(data) {
    let order = data.order;
    if (data.admin) {
      order.adminDeleted = true;
      await order.save();
    } else {
      order.userDeleted = true;
      await order.save();
      order.createLog('Deleted');
    }
  }
}
