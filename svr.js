const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const XLSX = require('xlsx');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL 연결
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'duckhippo'
});

// 데이터베이스 연결 확인
connection.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패: '+err.stack);
        return;
    }
    console.log('MySQL 연결 성공');
});

// 로그인 요청 처리
app.post('/user/login', (req,res) => {
    const {id, password} = req.body;
    
    // 학번과 비밀번호를 사용하여 회원 정보 검색
    const query = 'select * from student where id = ? and password = ?';
    connection.query(query, [id, password], (err,results) => {
    if (err) {
        console.error('MySQL query error: ',err);
        res.status(500).json({error: 'Internal server error'});
        return;
    }

    // 일치하는 사용자가 있는 경우
    if (results.length > 0 ) {
        // 토큰 생성
        const token = jwt.sign({id},'secret_key');
        res.json({token}); // 토큰을 클라이언트에게 응답으로 전송
    } else {
        // 사용자가 존재하지 않거나 비밀번호가 일치하지 않는 경우
        res.status(401).json({error: "해당 사용자 없음"});
    }
});
});

// POST 요청 처리
app.post('/data',(req,res) => {
    // 전송된 데이터 가져오기
    const {name, id, department, password} = req.body;

    // 데이터베이스에 저장할 데이터
    const data = {id, name, department, password};

    // 데이터베이스에 데이터 저장
    connection.query('insert into student set ?',data,(err,result) => {
        if (err) {
            console.error('MySQL 쿼리 오류: '+err.stack);
            return;
        }

        console.log('데이터 저장 성공');
        res.status(200).send('데이터 저장 성공');
    });


});


app.listen(8080,() => {
    console.log('서버 시작 : http://localhost:8080');
});

