/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-06
 * @author Liang <liang@maichong.it>
 */

import alaska from 'alaska';
import service from '../';

export default class OrderLog extends alaska.Model {

  static label = 'Order Log';
  static icon = 'hourglass-2';
  static defaultColumns = 'title order createdAt';
  static defaultSort = '-createdAt';
  static nocreate = true;
  static noedit = true;
  static noremove = true;

  static fields = {
    title: {
      label: 'Title',
      type: String,
      required: true,
      translate: true
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
