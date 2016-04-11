'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-06
 * @author Liang <liang@maichong.it>
 */

class OrderItem extends service.Model {

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }
}
exports.default = OrderItem;
OrderItem.label = 'Order Item';
OrderItem.defaultColumns = 'title,order,createdAt';
OrderItem.defaultSort = '-sort';
OrderItem.nocreate = true;
OrderItem.disabled = true;
OrderItem.noremove = true;
OrderItem.fields = {
  title: {
    label: 'Title',
    type: String,
    require: true
  },
  order: {
    label: 'Order',
    ref: 'Order',
    index: true
  },
  goods: {
    label: 'Goods',
    ref: 'alaska-goods.Goods',
    optional: true
  },
  createdAt: {
    label: '添加时间',
    type: Date
  }
};