/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-27
 * @author Liang <liang@maichong.it>
 */

import Order from '../models/Order';

/**
 * 买家预创建订单
 * [body.goods] 订单商品列表
 */
exports['pre-create'] = async function (ctx) {
  let body = ctx.state.body || ctx.request.body;
  if (!body || ctx.method !== 'POST') service.error(400);
  if (!ctx.user) service.error(403);
  body.pre = true;
  body.user = ctx.user;
  body = await service.run('Create', body);
  ctx.body = {
    orders: body.orders.map(o => o.data())
  };
};

/**
 * 买家创建订单
 * [body.address] 收货地址对象
 * [body.goods] 订单商品列表
 */
export async function create(ctx) {
  let body = ctx.state.body || ctx.request.body;
  if (!body || ctx.method !== 'POST') service.error(400);
  if (!ctx.user) service.error(403);
  body.user = ctx.user;
  body = await service.run('Create', body);
  ctx.body = {
    orders: body.orders.map(o => o.data())
  };
}

/**
 * 买家确认收货
 * body.order 订单ID
 */
export async function receive(ctx) {
  let body = ctx.state.body || ctx.request.body;
  let orderId = body.order || ctx.request.body.order;
  if (!orderId || ctx.method !== 'POST') service.error(400);
  if (!ctx.user) service.error(403);
  let order;
  if (typeof orderId === 'object' && orderId instanceof Order) {
    order = orderId;
  } else {
    order = await Order.findById(orderId).where('user', ctx.user._id);
    if (!order) service.error('Order not found');
    if (order.state !== 500) service.error('Order state error');
  }
  order = await service.run('Receive', { order });
  ctx.body = order.data();
}

/**
 * 买家申请退款
 * body.order 订单ID
 * body.reason 退款原因
 * body.amount 退款金额
 */
export async function refund(ctx) {
  let order = ctx.state.order;
  let body = ctx.state.body || ctx.request.body;
  let orderId = body.order || ctx.request.body.order;
  let reason = body.reason || ctx.request.body.reason;
  let amount = body.reason || ctx.request.body.amount;
  if ((!orderId && !order) || ctx.method !== 'POST') service.error(400);
  if (!ctx.user) service.error(403);
  if (!reason) service.error('Invalid refund reason');
  if (!amount || amount > order.payed) service.error('Invalid refund amount');
  if (!order) {
    order = await Order.findById(orderId).where('user', ctx.user._id);
    if (!order) service.error('Order not found');
    if (order.state !== 400 && order.state !== 500) service.error('Order state error');
  }
  order = await service.run('Refund', { order, reason, amount });
  ctx.body = order.data();
}

/**
 * 卖家或管理员 审核订单
 * 如果是多店铺模式,并且卖家无管理员权限,前置中间件请将order对象存放在ctx.state.order,并做好状态判断
 * body.order 订单ID
 */
export async function confirm(ctx) {
  let order = ctx.state.order;
  let body = ctx.state.body || ctx.request.body;
  let orderId = body.order || ctx.request.body.order;
  if ((!orderId && !order) || ctx.method !== 'POST') service.error(400);
  if (!ctx.user) service.error(403);
  if (!order) {
    //要求商品管理权限
    await ctx.checkAbility('admin.alaska-order.order.update');
    order = await Order.findById(orderId);
    if (!order) service.error('Order not found');
    if (order.state !== 300) service.error('Order state error');
  }
  order = await service.run('Confirm', { order });
  ctx.body = order.data();
}

/**
 * 卖家或管理员 拒绝订单
 * 如果是多店铺模式,并且卖家无管理员权限,前置中间件请将order对象存放在ctx.state.order,并做好状态判断
 * body.order 订单ID
 */
export async function reject(ctx) {
  let order = ctx.state.order;
  let body = ctx.state.body || ctx.request.body;
  let orderId = body.order || ctx.request.body.order;
  if ((!orderId && !order) || ctx.method !== 'POST') service.error(400);
  if (!ctx.user) service.error(403);
  if (!order) {
    //要求商品管理权限
    await ctx.checkAbility('admin.alaska-order.order.update');
    order = await Order.findById(orderId);
    if (!order) service.error('Order not found');
    if (order.state !== 300) service.error('Order state error');
  }
  order = await service.run('Reject', { order });
  ctx.body = order.data();
}

/**
 * 卖家或管理员 发货
 * 如果是多店铺模式,并且卖家无管理员权限,前置中间件请将order对象存放在ctx.state.order,并做好状态判断
 * body.order 订单ID
 */
export async function ship(ctx) {
  let order = ctx.state.order;
  let body = ctx.state.body || ctx.request.body;
  let orderId = body.order || ctx.request.body.order;
  if ((!orderId && !order) || ctx.method !== 'POST') service.error(400);
  if (!ctx.user) service.error(403);
  if (!order) {
    //要求商品管理权限
    await ctx.checkAbility('admin.alaska-order.order.update');
    order = await Order.findById(orderId);
    if (!order) service.error('Order not found');
    if (order.state !== 300) service.error('Order state error');
  }
  order = await service.run('Ship', { order });
  ctx.body = order.data();
}

/**
 * 卖家或管理员 审核退款
 * 如果是多店铺模式,并且卖家无管理员权限,前置中间件请将order对象存放在ctx.state.order,并做好状态判断
 * body.order 订单ID
 */
exports['refund-accept'] = async function () {
  let order = ctx.state.order;
  let body = ctx.state.body || ctx.request.body;
  let orderId = body.order || ctx.request.body.order;
  if ((!orderId && !order) || ctx.method !== 'POST') service.error(400);
  if (!ctx.user) service.error(403);
  if (!order) {
    //要求商品管理权限
    await ctx.checkAbility('admin.alaska-order.order.update');
    order = await Order.findById(orderId);
    if (!order) service.error('Order not found');
    if (order.state !== 800) service.error('Order state error');
  }
  order = await service.run('RefundAccept', { order });
  ctx.body = order.data();
};


/**
 * 卖家或管理员 拒绝退款
 * 如果是多店铺模式,并且卖家无管理员权限,前置中间件请将order对象存放在ctx.state.order,并做好状态判断
 * body.order 订单ID
 */
exports['refund-reject'] = async function () {
  let order = ctx.state.order;
  let body = ctx.state.body || ctx.request.body;
  let orderId = body.order || ctx.request.body.order;
  if ((!orderId && !order) || ctx.method !== 'POST') service.error(400);
  if (!ctx.user) service.error(403);
  if (!order) {
    //要求商品管理权限
    await ctx.checkAbility('admin.alaska-order.order.update');
    order = await Order.findById(orderId);
    if (!order) service.error('Order not found');
    if (order.state !== 800) service.error('Order state error');
  }
  order = await service.run('RefundReject', { order });
  ctx.body = order.data();
};
