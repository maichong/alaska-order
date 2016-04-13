/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-06
 * @author Liang <liang@maichong.it>
 */

const BALANCE = service.service('balance');
import OrderLog from './OrderLog';

export default class Order extends service.Model {
  static label = 'Order';
  static defaultColumns = 'pic,title,user,price,state,createdAt';
  static defaultSort = '-createdAt';
  //static nocreate = true;
  static noremove = true;

  static fields = {
    title: {
      label: 'Title',
      type: String,
      required: true
    },
    user: {
      label: 'User',
      type: 'relationship',
      ref: 'user.User',
      noedit: true,
      index: true
    },
    type: {
      label: 'Type',
      type: 'select',
      options: []
    },
    pic: {
      label: 'Picture',
      type: 'image'
    },
    items: {
      label: 'Order Items',
      type: ['OrderItem'],
      noedit: true
    },
    currency: {
      label: 'Currency',
      type: 'select',
      options: BALANCE.currencies,
      default: BALANCE.defaultCurrency.value
    },
    price: {
      label: 'Price',
      type: Number,
      default: 0
    },
    payed: {
      label: 'Payed',
      type: Number,
      default: 0
    },
    state: {
      label: 'State',
      type: 'select',
      number: true,
      options: service.config('status')
    },
    failure: {
      label: 'Failure Reason',
      type: String
    },
    createdAt: {
      label: 'Created At',
      type: Date
    },
    expireAt: {
      label: 'Expire At',
      type: Date
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
  }

  /**
   * [async] 创建并保存订单日志
   * @param title
   * @returns {*}
   */
  createLog(title) {
    return new OrderLog({ title, order: this }).save();
  }
}
