const express = require('express')
const mysql = require('mysql')
const path = require('path')
const static = require('serve-static')
const dbconfig = require('./config/dbconfig.json')

// datavase connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database,
    debug: false
})

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/public',static(path.join(__dirname,'public')))

app.post('/process/adduser',(req, res)=> {
    console.log('process/adduser 호출됨'+req)

    const paramId = req.body.id;
    const paramName = req.body.name;
    const paramDepartment = req.body.department;
    const paramPassword = req.body.password;

    pool.getConnection((err, conn)=> {
        if(err){
            conn.release();
            console.log('Mysql gecConnection error. aborted');
            res.writeHead('200',{'Content-Type' : 'text/html; charset=utf8'})
            res.write('<h2>DB 연결 실패</h2>')
            res.end();
            return;
        }

        console.log('데이터베이스 연결 끈 얻었음...ㅎㅎ');

        const exec = conn.query('insert into student (id,name,department,password) values (?,?,?,password(?));',
                    [paramId,paramName,paramDepartment,paramPassword],
                    ()=>{
                        (err,result)=>{
                            conn.release();
                            console.log('실행된 SQL : '+exec.sql)

                            if(err){
                                console.log('SQL 실행시 오류 발생')
                                console.dir(err);
                                res.writeHead('200',{'Content-Type' : 'text/html; charset=utf8'})
                                res.write('<h2>SQL 실행 실패</h2>')
                                res.end();
                                return
                            }

                            if(result) {
                                console.dir(result)
                                console.log('Inserted 성공')

                                res.writeHead('200',{'Content-Type' : 'text/html; charset=utf8'})
                                res.write('<h2>사용자 추가 성공</h2>')
                                res.end();
                            }
                            else{
                                console.log('Inserted 실패')

                                res.writeHead('200',{'Content-Type' : 'text/html; charset=utf8'})
                                res.write('<h2>사용자 추가 실패</h2>')
                                res.end();
                            }
                        }
                    }
        )

    })
});
