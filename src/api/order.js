/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-04-27
 * @author Liang <liang@maichong.it>
 */

exports['pre-create'] = async function (ctx) {
  let data = ctx.state.data || ctx.request.body;
  if (!data || ctx.method !== 'POST') service.error(400);
  if (!ctx.user) service.error(403);
  data.pre = true;
  data.user = ctx.user;
  data = await service.run('Create', data);
  ctx.body = {
    orders: data.orders.map(o => o.data())
  };
};

export async function create(ctx) {
  let data = ctx.state.data || ctx.request.body;
  if (!data || ctx.method !== 'POST') service.error(400);
  if (!ctx.user) service.error(403);
  data.user = ctx.user;
  data = await service.run('Create', data);
  ctx.body = {
    orders: data.orders.map(o => o.data())
  };
}
