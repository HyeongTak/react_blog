require('dotenv').config();

import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import api from 'api';

const app = new Koa();
const router = new Router();

// 비구조화 할당 문으로 process.env 내부 값에 대한 레퍼런스 작성
const {
  PORT: port=4000,
  MONGO_URI: mongoURI
} = process.env;

// 몽고 DB 프라미스 사용을 위한 글로벌 선언
mongoose.Promise = global.Promise;

// 몽고 DB 접속
mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => { console.log('몽고 DB 접속 완료'); })
  .catch((err) => { console.error(err); });

router.use('/api', api.routes());

// BodyParser 미들웨어 사용
app.use(bodyParser());

// 라우터 사용 선언
app.use(router.routes()).use(router.allowedMethods());

// 서버 가동
app.listen(port, () => { console.log(`Koa 서버 작동 중 : ${port} 포트`); });