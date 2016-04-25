/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-06
 * @author Liang <liang@maichong.it>
 */

export default class OrderItem extends service.Model {
  static label = 'Order Item';
  static defaultColumns = 'title order createdAt';
  static defaultSort = '-sort';
  static nocreate = true;
  static disabled = true;
  static noremove = true;

  static fields = {
    title: {
      label: 'Title',
      type: String,
      required: true
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

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
