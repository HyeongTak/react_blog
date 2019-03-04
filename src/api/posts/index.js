import Router from 'koa-router';

const posts = new Router();

posts.get('/', (ctx) => {
  ctx.body = '포스트 라우터 잘 되나요??'
});

export default posts;