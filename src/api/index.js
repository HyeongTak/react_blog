import Router from 'koa-router';
import posts from './posts';

const api = new Router();

api.get('/', (ctx) => {
    ctx.body = 'api 라우터 잘 되나요?';
});

api.use('/posts', posts.routes());

export default api;