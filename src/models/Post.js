/*
  몽고DB 스키마(Schema) 생성(포스트 작성 항목)
    1. title: 제목(문자열-String)
    2. body: 내용(문자열-String)
    3. createdDate: 작성 날짜(날짜-Date)
*/

import mongoose from 'mongoose';

const { Schema } = mongoose;

const Post = new Schema({
  title: String,
  body: String,
  createdDate: {
    type: Date,
    default: new Date()
  }
});

const post = mongoose.model('Post', Post);
export default post;