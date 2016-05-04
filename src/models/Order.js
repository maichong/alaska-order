/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-06
 * @author Liang <liang@maichong.it>
 */

const BALANCE = service.service('balance');
import OrderLog from './OrderLog';

export default class Order extends service.Model {
  static label = 'Order';
  static defaultColumns = 'pic title user total state createdAt';
  static defaultSort = '-createdAt';
  static searchFields = 'title';
  //static nocreate = true;
  static noremove = true;

  static populations = {
    items: {
      path: 'items'
    }
  };

  static scopes = {
    list: '*'
  };

  static api = {
    list: 3,
    count: 3,
    show: 3,
    create: 3
  };

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
    address: {
      label: 'Address',
      type: Object
    },
    currency: {
      label: 'Currency',
      type: 'select',
      options: BALANCE.currencies,
      default: BALANCE.defaultCurrency.value
    },
    shipping: {
      //邮费,不包含在total中,由各个OrderItem.shipping相加
      label: 'Shipping',
      type: Number,
      default: 0
    },
    total: {
      //由各个OrderItem.total相加而得,不包含邮费
      label: 'Total Amount',
      type: Number
    },
    pay: {
      label: 'Pay Amount',
      type: Number
    },
    payed: {
      label: 'Payed Amount',
      type: Number,
      default: 0
    },
    state: {
      label: 'State',
      type: 'select',
      number: true,
      default: 200,
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
    let log = new OrderLog({ title, order: this });
    log.save();
    return log;
  }

  /**
   * 判断某个GoodsItem能不能合并到此订单
   * @param {OrderItem} item
   * @returns {boolean}
   */
  canAppendItem(item) {
    return true;
  }
}
