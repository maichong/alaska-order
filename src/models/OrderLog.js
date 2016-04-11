/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-06
 * @author Liang <liang@maichong.it>
 */

export default class OrderLog extends service.Model {

  static label = 'Order Log';
  static defaultColumns = 'title,order,createdAt';
  static defaultSort = '-createdAt';
  static disabled = true;

  static fields = {
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

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }
}
