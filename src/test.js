
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

