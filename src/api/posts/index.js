import Router from 'koa-router';
import postsCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.get('/:id', postsCtrl.read);
posts.post('/', postsCtrl.write); 
posts.put('/:id', postsCtrl.update);
posts.delete('/:id', postsCtrl.remove);

export default posts;