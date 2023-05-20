const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

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
        res.json({token}); // 토큰을 클라이언트에게 응답으로 
        
    
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


// 포털 헤더에 정보 띄우기 (이름, 학번, 학과)
app.get('/user/info', (req,res) => {
    
    const userId = req.query.id;
    
    // 학번을 사용하여 회원 정보 검색
    const query = 'select name, id, department from student where id = ?';
    connection.query(query, userId, (err,results) => {
    if (err) {
        console.error('MySQL query error: ',err);
        res.status(500).json({error: 'Internal server error'});
        return;
    }
    

    // 결과가 있을 경우 회원 정보를 응답으로 전송
    if (results.length > 0 ) {
        // const userInfo = {
        //     name: results[0].name,
        //     id: results[0].id,
        //     department: results[0].department
        // };
        const userInfo = results[0];
        res.json(userInfo);
    }else{
        // 해당 사용자가 없는 경우
        res.status(404).json({error : '해당 사용자 없음'});
    }
});
});

// 학과 선택하면 과목내용들 보여주기
app.get('/api/courses',(req, res) => {
    const {department} = req.query;
    const query = 'select distinct subject, class1, credit, t_lecture from course where department = ?';

    connection.query(query,[department],(err,results) => {
        if(err) {
            console.error('MySQL query error:',err);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        res.json(results);
    });
});

app.get('/api/courses_notime',(req, res) => {
    const {department} = req.query;
    const query = 'select distinct subject, class1, credit from course where department = ?';

    connection.query(query,[department],(err,results) => {
        if(err) {
            console.error('MySQL query error:',err);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        res.json(results);
    });
});

// 수강한 과목 등록
app.post('/apply/course',(req,res) => {
    // 전송된 데이터 가져오기
    const {id, subject, semester, credit, department, class1} = req.body;

    // 데이터베이스에 저장할 데이터
    const data = {id, subject, semester, credit, department, class1};

    // 데이터베이스에 데이터 저장
    connection.query('insert into getGrade set ?',data,(err,result) => {
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
