/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-06
 * @author Liang <liang@maichong.it>
 */

const BALANCE = service.service('balance');

export default class OrderItem extends service.Model {
  static label = 'Order Item';
  static defaultColumns = 'title order goods skuDesc price discount total quantity createdAt';
  static defaultSort = '-sort';
  static nocreate = true;
  static noedit = true;
  static noremove = true;

  static fields = {
    pic: {
      label: 'Main Picture',
      type: 'image',
      required: true
    },
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
    sku: {
      label: 'SKU',
      ref: 'alaska-goods.Sku',
      optional: true
    },
    skuDesc: {
      label: 'SKU Desc',
      type: String
    },
    currency: {
      label: 'Currency',
      type: 'select',
      options: BALANCE.currencies,
      default: BALANCE.defaultCurrency.value
    },
    price: {
      label: 'Price',
      type: Number
    },
    discount: {
      label: 'Discount',
      type: Number
    },
    quantity: {
      label: 'Quantity',
      type: Number
    },
    shipping: {
      label: 'Shipping',
      type: Number
    },
    total: {
      // total = (discount || price) * quantity
      label: 'Total Amount',
      type: Number
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
