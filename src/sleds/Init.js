/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-05-06
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';
import service from '../';
import SETTINGS from 'alaska-settings';

export default class Init extends alaska.Sled {
  exec() {
    SETTINGS.register({
      id: 'order.paymentTimeout',
      title: 'Payment Timeout',
      service: service.id,
      group: 'Order',
      type: 'NumberFieldView',
      value: 3600,
      options: {
        addonAfter: 'Second'
      }
    });
    SETTINGS.register({
      id: 'order.receiveTimeout',
      title: 'Receive Timeout',
      service: service.id,
      group: 'Order',
      type: 'NumberFieldView',
      value: 86400 * 10,
      options: {
        addonAfter: 'Second'
      }
    });
    SETTINGS.register({
      id: 'order.refundTimeout',
      title: 'Refund Timeout',
      service: service.id,
      group: 'Order',
      type: 'NumberFieldView',
      value: 86400 * 2,
      options: {
        addonAfter: 'Second'
      }
    });
  }
}
