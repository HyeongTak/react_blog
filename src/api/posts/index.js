import Router from 'koa-router';
import postsCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write); 
posts.get('/:id',postsCtrl.checkObjectId, postsCtrl.read);
posts.put('/:id',postsCtrl.checkObjectId, postsCtrl.update);
posts.delete('/:id',postsCtrl.checkObjectId, postsCtrl.remove);

export default posts;