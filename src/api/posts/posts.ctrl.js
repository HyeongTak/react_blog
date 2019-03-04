import Post from 'models/Post';
import Joi from 'joi';

import { Types } from 'mongoose';

// ObjectId 검증 함수
exports.checkObjectId = (ctx, next) => {
  const { id } = ctx.params;

  if (!Types.ObjectId.isValid(id)) {
    ctx.status = 400;
    return null;
  }

  return next();
}

exports.list = async (ctx) => {
  const page = parseInt(ctx.query.page || 1, 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    const posts = await Post.find()
      .sort({_id: -1})
      .limit(10).skip((page - 1) * 10)
      .lean()
      .exec();

    const lastPage = await Post.count().exec();

    ctx.body = posts.map(post => ({
      ...post,
      body: post.body.length < 100 ?
        post.body :
        `${post.body.slice(0, 100)}...`
    }));
    
    ctx.set('Last-Page', Math.ceil(lastPage / 10));
  } catch(err) {
    ctx.throw(err, 500);
  }
};

exports.read = async (ctx) => {
    const { id } = ctx.params;
  
    try {
      const post = await Post.findById(id).exec();
  
      if (!post) {
        ctx.status = 404;
        return;
      }
  
      ctx.body = post;
    } catch(err) {
      ctx.throw(err, 500);
    }
};

exports.write = async (ctx) => {
  // RequestBody(객체가 가진 값) 검증
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required()
  });
  
  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body } = ctx.request.body;

  // 새로운 포스트 인스턴스 생성
  const post = new Post({
    title, body
  });

  try {
    await post.save();
    ctx.body = post;
  } catch(err) {
    ctx.throw(err, 500);
  }
};


exports.update = async (ctx) => {
  const { id } = ctx.params;

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      // new 옵션을 true로 했을 시 업데이트된 객체를 리턴함
      new: true
    }).exec();

    if (!post) {
      ctx.status = 404;
      return;
    }

    ctx.body = post;
  } catch(err) {
    ctx.throw(err, 500);
  }
};

exports.remove = async (ctx) => {
  const { id } = ctx.params;

  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch(err) {
    ctx.throw(err, 500);
  }
};