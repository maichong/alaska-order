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
  static nocreate = true;
  static noremove = true;

  static relationships = {
    items: {
      ref: 'OrderItem',
      path: 'order'
    },
    logs: {
      ref: 'OrderLog',
      path: 'order'
    }
  };

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
      static: true,
      required: true
    },
    user: {
      label: 'User',
      type: 'relationship',
      ref: 'user.User',
      static: true,
      index: true
    },
    type: {
      label: 'Type',
      type: 'select',
      static: true,
      options: []
    },
    pic: {
      label: 'Picture',
      static: true,
      type: 'image'
    },
    items: {
      label: 'Order Items',
      static: true,
      type: ['OrderItem'],
      noedit: true
    },
    address: {
      label: 'Address',
      static: true,
      type: Object
    },
    currency: {
      label: 'Currency',
      type: 'select',
      options: BALANCE.currencies,
      default: BALANCE.defaultCurrency.value,
      static: true
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
      type: Number,
      static: true
    },
    payed: {
      label: 'Payed Amount',
      type: Number,
      default: 0,
      static: true
    },
    payment: {
      label: 'Payment',
      type: 'select',
      static: true,
      options: [{
        label: 'Balance',
        value: 'balance'
      }]
    },
    refund: {
      label: 'Refunded Amount',
      type: Number,
      static: true,
      depends: 'refund'
    },
    refundReason: {
      label: 'Refund Reason',
      type: String,
      static: true,
      depends: 'refundReason'
    },
    refundAmount: {
      label: 'Refund Amount',
      type: Number,
      static: true,
      depends: 'refundAmount'
    },
    shipped: {
      label: 'Shipped',
      type: Boolean,
      static: true
    },
    state: {
      label: 'State',
      type: 'select',
      number: true,
      index: true,
      default: 200,
      options: service.config('status'),
      static: true
    },
    failure: {
      label: 'Failure Reason',
      type: String,
      depends: 'failure',
      static: true
    },
    createdAt: {
      label: 'Created At',
      type: Date,
      static: true
    },
    paymentTimeout: {
      label: 'Payment Timeout',
      type: Date,
      static: true,
      depends: 'paymentTimeout'
    },
    receiveTimeout: {
      label: 'Receive Timeout',
      type: Date,
      static: true,
      depends: 'receiveTimeout'
    },
    refundTimeout: {
      label: 'Refund Timeout',
      type: Date,
      static: true,
      depends: 'refundTimeout'
    }
  };

  preSave() {
    if (!this.createdAt) {
      this.createdAt = new Date;
    }
    this.pay = (this.total || 0) + (this.shipping || 0);
    this._logTotal = !this.isNew && this.isModified('total');
    this._logShipping = !this.isNew && this.isModified('shipping');
  }

  postSave() {
    if (this._logTotal) {
      this.createLog('Modified total price');
    }
    if (this._logShipping) {
      this.createLog('Modified shipping fee');
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
