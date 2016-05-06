/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-06
 * @author Liang <liang@maichong.it>
 */

export default {
  prefix: '/order',
  services: [{
    id: 'alaska-user',
    alias: 'user'
  }, {
    id: 'alaska-balance',
    alias: 'balance'
  }, {
    id: 'alaska-settings',
    alias: 'settings'
  }],
  status: [{
    label: 'Order_New',
    value: 200
  }, {
    label: 'Order_Payed',
    value: 300
  }, {
    label: 'Order_Confirmed',
    value: 400
  }, {
    label: 'Order_Shipped',
    value: 500
  }, {
    label: 'Order_Done',
    value: 600
  }, {
    label: 'Order_Refund',
    value: 800
  }, {
    label: 'Order_Failed',
    value: 900
  }]
};
