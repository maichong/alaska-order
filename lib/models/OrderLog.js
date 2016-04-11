'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-06
 * @author Liang <liang@maichong.it>
 */

class OrderLog extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = OrderLog;
OrderLog.label = 'Order Log';
OrderLog.defaultColumns = 'title,order,createdAt';
OrderLog.defaultSort = '-createdAt';
OrderLog.disabled = true;
OrderLog.fields = {
  title: {
    label: 'Title',
    type: String,
    require: true
  },
  order: {
    label: 'Order',
    type: 'relationship',
    ref: 'Order',
    index: true
  },
  state: {
    label: 'State',
    type: 'select',
    number: true,
    options: service.config('status')
  },
  createdAt: {
    label: '添加时间',
    type: Date
  }
};