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
    const query = 'select distinct subject, class1, credit, t_lecture,seat,remain_seat from course where department = ?';

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

    // 중복 여부 확인을 위한 select 쿼리 실행 (현재는 이미 들은 과목 또 등록가능)
    connection.query('select * from getGrade where id=? and subject=? and semester=? and credit=? and department=? and class1=?',
    [id, subject, semester, credit, department, class1],
    (err,rows) => {
        if (err) {
            console.error('MySQL 쿼리 오류: '+err.stack);
            return;
        }

        if (rows.length >0) {
            // 이미 해당 데이터가 존재하는 경우
            console.log('이미 데이터가 존재합니다');
            res.status(200).send('이미 데이터가 존재합니다');
        }else {
            // 데이터베이스에 데이터 저장
            connection.query('insert into getGrade set ?',data,(err,result) => {
            if (err) {
                console.error('MySQL 쿼리 오류: '+err.stack);
                return;
            }
            console.log('데이터 저장 성공');
            res.status(200).send('데이터 저장 성공');
        });
    }
}
);
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

//시간이 없는 과목 포털 시간표에도 보여주기
app.get('/api/noTimeSubjects', (req, res) => {
  const query = 'SELECT subject FROM addSubject WHERE t_lecture IS NULL OR t_lecture = ""';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    const noTimeSubjects = results.map((result) => result.subject);
    res.json(noTimeSubjects);
  });
});



// 수강한 과목 보여주기 (학번, 학기에 따라)
app.post('/api/getGrade', (req,res) => {
    const {id, semester} = req.body;
    const query = 'select department, subject, class1, credit from getGrade where id =? and semester = ?';
    //console.log(id);
    //console.log(semester);
    connection.query(query,[id, semester],(err,results) => {
        if(err) {
            console.error('MySQL query error:',err);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        res.json(results);
    });
});


// 과목 담기
app.post('/apply/mycourse', (req, res) => {
    // 전송된 데이터 가져오기
    const { id, department,subject,t_lecture,class1,credit } = req.body;

    // 데이터베이스에 저장할 데이터
    const data = { id, department,subject,t_lecture,class1,credit};

    // 중복 여부 확인을 위한 select 쿼리 실행 (현재는 이미 들은 과목 또 등록 가능)
    connection.query(
        'SELECT * FROM addSubject WHERE id=? AND department=? AND subject=? AND t_lecture=? AND class1=? AND credit=?',
        [id, department, subject, t_lecture,class1,credit],
        (err, rows) => {
            if (err) {
                console.error('MySQL 쿼리 오류: ' + err.stack);
                res.status(500).send('데이터베이스 오류');
                return;
            }

            if (rows.length > 0) {
                // 이미 해당 데이터가 존재하는 경우
                console.log('이미 데이터가 존재합니다');
                res.status(200).send('이미 데이터가 존재합니다');
            } else {
                // 데이터베이스에 데이터 저장
                connection.query('INSERT INTO addSubject SET ?', data, (err, result) => {
                    if (err) {
                        console.error('MySQL 쿼리 오류: ' + err.stack);
                        res.status(500).send('데이터베이스 오류');
                        return;
                    }
                    console.log('데이터 저장 성공');
                    res.status(200).send('데이터 저장 성공');
                });
            }
        }
    );
});


// 담은과목 보여주기
app.post('/api/addSubject', (req, res) => {
    const { id } = req.body;
    const query =
      'SELECT department,subject,class1,credit, t_lecture FROM addSubject WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
});


// 수강신청한 과목 정보를 데이터베이스에 저장
app.post('/api/apply_course', (req, res) => {
    // 전송된 데이터 가져오기
    const {id,department, subject, class1, t_lecture, credit} = req.body;

    // 데이터베이스에 저장할 데이터
    const data = { id, department,subject, class1, t_lecture, credit};

    // 데이터베이스에 데이터 저장
    connection.query(
      'select * from my_subject where id=? and department=? and subject=? and class1=? and t_lecture=? and credit=?',
      [id,department,subject,class1,t_lecture,credit],
      (err,rows) => {
        if(err) {
          console.error('MySQL 쿼리 오류: ' + err.stack);
          res.status(500).send('데이터베이스 오류');
          return;
        }
        if(rows.length > 0) {
          // 이미 해당 데이터가 존재하는 경우
          console.log('이미 데이터가 존재합니다');
          res.status(200).send('이미 데이터가 존재합니다');
        }else{
          connection.query('INSERT INTO my_subject SET ?', data, (err, result) => {
            if (err) {
                console.error('MySQL 쿼리 오류: ' + err.stack);
                res.status(500).json({ error: '데이터베이스 오류' });
                return;
            }
                console.log('데이터 저장 성공');
                res.status(200).send('데이터 저장 성공');
            });
        }
      }
    );
});

// 담은 과목 정보를 데이터베이스에서 삭제
app.post('/api/delete_course_si', (req, res) => {
    const { subject } = req.body;
    
    // 데이터베이스에서 해당 subject 값을 가진 과목 정보 삭제
    connection.query('DELETE FROM addSubject WHERE subject = ?', [subject], (err, result) => {
      if (err) {
        console.error('MySQL 쿼리 오류: ' + err.stack);
        res.status(500).json({ error: '데이터베이스 오류' });
        return;
      }
      if (result.affectedRows === 0) {
        // 삭제할 과목이 존재하지 않을 경우
        res.status(404).json({ error: '과목을 찾을 수 없습니다' });
      } else {
        console.log('데이터 삭제 성공');
        res.status(200).json({ message: '데이터 삭제 성공' });
      }
    });
});


// 수강신청한 과목 정보를 데이터베이스에서 삭제
app.post('/api/delete_course', (req, res) => {
    const { subject } = req.body;
    
    // 데이터베이스에서 해당 subject 값을 가진 과목 정보 삭제
    connection.query('DELETE FROM my_subject WHERE subject = ?', [subject], (err, result) => {
      if (err) {
        console.error('MySQL 쿼리 오류: ' + err.stack);
        res.status(500).json({ error: '데이터베이스 오류' });
        return;
      }
      if (result.affectedRows === 0) {
        // 삭제할 과목이 존재하지 않을 경우
        res.status(404).json({ error: '과목을 찾을 수 없습니다' });
      } else {
        console.log('데이터 삭제 성공');
        res.status(200).json({ message: '데이터 삭제 성공' });
      }
    });
});
  
// 수강신청화면에서 과목 목록 보여주기
app.post('/api/my_subject', (req, res) => {
    const { id } = req.body;
    const query =
      'SELECT subject, class1, t_lecture, credit,department FROM my_subject WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
});


// 관심과목 보여주기 (증원요청에서)
app.post('/user/addSubject', (req, res) => {
    const { id } = req.body;
    const query =
      'SELECT class1,subject,department,t_lecture,credit FROM addSubject WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
});


app.post('/api/addSubject', (req, res) => {
    const { id } = req.body;
    const query =
      'SELECT department,subject,class1,credit, t_lecture FROM addSubject WHERE id = ?';
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
});


// 수강해야할 학점
app.get('/user/graduation', (req, res) => {
    //학생의 학과를 불러옴
    const userDepartment = req.query.department;

    //학과에 따른 이수구분 불러오기
    const query = 'SELECT * FROM graduation WHERE department = ?';
    connection.query(query, [userDepartment], (err, results) => {
      if (err) {
        console.error('MySQL query error:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      if (results.length > 0) {
        const userInfo = results[0];
        res.json(userInfo);
      } else {
        res.status(404).json({ error: '해당 사용자 없음' });
      }
    });
});

//수강한 학점 띄우기
app.get('/user/get_graduation', (req, res) => {
  const { id } = req.query;

  const query = 'SELECT class1, SUM(credit) AS total_credit FROM getGrade WHERE id = ? GROUP BY class1';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('MySQL query error:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length > 0) {
      const getgraduation = {}; // 이수구분(class1) 별 학점을 저장할 객체
      for (const data of results) {
        getgraduation[data.class1] = data.total_credit;
      }
      res.json(getgraduation);
    } else {
      res.status(404).json({ error: '해당 사용자 없음' });
    }
  });
});


// 수강한 과목 삭제
app.post('/delete/course',(req,res) => {
    // 전송된 데이터 가져오기
    const {id, subject, semester, credit, class1} = req.body;

    // 데이터베이스에 저장할 데이터
    const data = {id, subject, semester, credit, class1};

    const query = 'delete from getGrade where id=? and subject=? and semester=? and credit=? and class1=?';
    connection.query(query,[id,subject,semester,credit,class1],(err,results) => {
        if(err) {
            console.error('MySQL query error:',err);
            res.status(500).json({error:'Internal server error'});
            return ;
        }
        res.json(results);
    });
});

// 관심 과목 삭제
app.post('/delete/addSubject',(req,res) => {
    // 전송된 데이터 가져오기
    const {id, department,subject}= req.body;

    // 데이터베이스에 저장할 데이터
    const data = {id, department,subject};

    const query = 'delete from addSubject where subject=?';
    connection.query(query,[subject],(err,results) => {
        if(err) {
            console.error('MySQL query error:',err);
            res.status(500).json({error:'Internal server error'});
            return ;
        }
        res.json(results);
    });
});

// 관심 과목 여석 가져오기
app.post('/seat/addSubject',(req,res) => {
  const {department, subject, t_lecture} = req.body;

  if (t_lecture == null){
    const query = 'select seat, remain_seat from course where department=? and subject=?';
    connection.query(query,[department, subject],(err,results) => {
      if(err){
        console.error('MySQL query error:',err);
        res.status(500).json({error:'Internal server error'});
        return ;
      }
      res.json(results);
      //console.log(results);
    });
  }
  else{
    const query = 'select seat, remain_seat from course where department=? and subject=? and t_lecture=?';
    connection.query(query,[department, subject, t_lecture],(err,results) => {
      if(err){
        console.error('MySQL query error:',err);
        res.status(500).json({error:'Internal server error'});
        return ;
      }
      res.json(results);
      //console.log(results);
    });
  }
});

// 수강신청시 여석 줄이기
app.post('/seat/course',(req,res) => {
  const {department, subject, t_lecture} = req.body;
  if (t_lecture == null){
    const query = 'update course set remain_seat = remain_seat-1 where department=? and subject=?';
    connection.query(query,[department,subject],(err,results) => {
      if(err){
        console.error('MySQL query error:',err);
        res.status(500).json({error:'Internal server error'});
        return ;
      }
      res.json(results);
    });
  }
  else{
    const query = 'update course set remain_seat = remain_seat-1 where department=? and subject=? and t_lecture=?';
    connection.query(query,[department,subject,t_lecture],(err,results) => {
      if(err){
        console.error('MySQL query error:',err);
        res.status(500).json({error:'Internal server error'});
        return ;
      }
      res.json(results);
    }); 
  }
});

// 수강신청 취소할 때 여석 늘리기
app.post('/seat/increase',(req,res) => {
  const {department, subject, t_lecture} = req.body;

  if (t_lecture == null){
    const query = 'update course set remain_seat = remain_seat+1 where department=? and subject=?';
    connection.query(query,[department,subject],(err,results) => {
      if(err){
        console.error('MySQL query error:',err);
        res.status(500).json({error:'Internal server error'});
        return ;
      }
      res.json(results);
    });
  }
  else{
    const query = 'update course set remain_seat = remain_seat+1 where department=? and subject=? and t_lecture=?';
    connection.query(query,[department,subject,t_lecture],(err,results) => {
      if(err){
        console.error('MySQL query error:',err);
        res.status(500).json({error:'Internal server error'});
        return ;
      }
      res.json(results);
    });
  }
});

app.listen(8080,() => {
    console.log('서버 시작 : http://localhost:8080');
});

