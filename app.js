const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

// 서버에서 어떤 요청이 왔는지 로그
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// 최신버전은 상관 없지만 cookie 뒤에 session 오도록 권장
app.use(
  session({
    // 요청이 올 때 세션에 수정 사항이 생기지 않더라도 다시 저장
    resave: false,
    // 세션 저장할 내역이 없더라도 처음부터 세션을 생성할지
    saveUninitialized: false,
    // 쿠키 서명
    secret: process.env.COOKIE_SECRET,
    cookie: {
      // httpOnly를 true로 설정해야 자바스크립트로 공격을 안당함
      httpOnly: true,
      secure: false,
    },
    // 세션 쿠키의 이름
    name: 'session-cookie',
  })
);

app.use((req, res, next) => {
  console.log('모든 요청에 실행');
  next();
});

app.get(
  '/',
  (req, res, next) => {
    console.log('get / 요청에 실행');
    next();
  },
  (req, res) => {
    throw new Error('에러처리 미들웨어로');
  }
);

app.get('/cate/:name', (req, res) => {
  res.send(`hello ${req.params.name}`);
});

// 404 처리 미들웨어
// 틀린 경로 요청 시 404 페이지
app.use((req, res, next) => {
  res.send('404에러');
});

app.use((err, req, res, next) => {
  console.error(err);
  // 브라우저에 status 에러 코드를 보내 속임
  res.status(200).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트 대기 중');
});
