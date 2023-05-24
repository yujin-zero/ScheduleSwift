import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Lectureapply.css"
import axios from 'axios';

const Lectureapply = () => {
  const navigate = useNavigate();

  const handleLogo = () => {
    // 로고 클릭하면 포탈화면으로 이동
    navigate('/potal');
  }

  const [department, setDepartment] = useState('');
  const [buttonText, setButtonText] = useState('1학년 1학기');
  const [subList, setList] = useState('1-1과목목록');
  const id = localStorage.getItem('user_id');
  const [semester, setSemester] = useState('1-1');

  // 체크된 index들을 담을 함수
  const [checkedCourses, setCheckedCourses] = useState([]);
  const [deleteCourses, setDeleteCourses] = useState([]);

  const [courses, setCourses] = useState([]);
  const [getGrade, setGetGrade] = useState([]);


  const handleDropdownChange = (event) => {
    setDepartment(event.target.value);
    setCheckedCourses([]); // 과를 바꿀때마다 선택된 값 초기화
  }


  // 학과 검색을 누를 때 마다 과목목록 나오게 실행
  useEffect(() => {
    // MySQL 데이터베이스에서 쿼리 실행
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/courses_notime', {
          params: {department}
        });
        const data = response.data;
        setCourses(data);
      }catch(error) {
        console.error('Error fetching courses:',error);
      }
    };
    fetchData();
  },[department]);

  // 수강한 과목
  useEffect(() => {
    const fetchData = async() => {
      try {
          const response = await axios.post('/api/getGrade',{id,semester} );
          const data = response.data;
          setGetGrade(data);
       }catch(error) {
          console.error('Error fetching courses:',error);
        }
    };
    //alert(id);
    //alert(semester);
    fetchData();
  },[semester]);


  const btn1_1 = () => {
    setButtonText('1학년 1학기');
    setList('1-1과목목록');
    setSemester('1-1');
  };
  const btn1_2 = () => {
    setButtonText('1학년 2학기');
    setList('1-2과목목록');
    setSemester('1-2');
  };
  const btn2_1 = () => {
    setButtonText('2학년 1학기');
    setList('2-1과목목록');
    setSemester('2-1');
  };
  const btn2_2 = () => {
    setButtonText('2학년 2학기');
    setList('2-2과목목록');
    setSemester('2-2');
  };
  const btn3_1 = () => {
    setButtonText('3학년 1학기');
    setList('3-1과목목록');
    setSemester('3-1');
  };
  const btn3_2 = () => {
    setButtonText('3학년 2학기');
    setList('3-2과목목록');
    setSemester('3-2');
  };
  const btn4_1 = () => {
    setButtonText('4학년 1학기');
    setList('4-1과목목록');
    setSemester('4-1');
  };
  const btn4_2 = () => {
    setButtonText('4학년 2학기');
    setList('4-2과목목록');
    setSemester('4-2');
  };


  // 체크박스 변경 이벤트 처리 함수
  const handleCheckboxChange = (index) => {
    if (checkedCourses.includes(index)) { // 이미 선택되어있었으면
      setCheckedCourses(checkedCourses.filter((item) => item !== index));
    }

    else { // 선택 안되어있었으면 추가
    setCheckedCourses([...checkedCourses, index]);
    }
    // alert(checkedCourses); 이전상태가 출력되지만 잘 되는걸 알 수는 있다.
  };
  // 현재까지 체크된 인덱스 값들이 checkedCourses에 다 저장되어있음.

  const handleCheckboxDelete = (index) => {
    if (deleteCourses.includes(index)) {
      setDeleteCourses(deleteCourses.filter((item) => item != index));
    }
    else {
      setDeleteCourses([...deleteCourses, index]);
    }
  };

  
  // 등록버튼이 눌렸을 때.
  const handle_apply = (event) => {
    event.preventDefault();
    //alert("등록버튼이 눌림");

    const selectedCourses = checkedCourses.map(index=>courses[index]);
    //alert(selectedCourses);
    selectedCourses.map(courses => {
      //alert('시작');
      const {subject, class1, credit} = courses;
      const data = {id, subject, semester, credit, department, class1};

      axios.post('/apply/course',data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    alert('수강과목이 등록되었습니다!');

    // 등록된 사항을 바로 보여주도록
    const fetchData = async() => {
      try {
          const response = await axios.post('/api/getGrade',{id,semester} );
          const data = response.data;
          setGetGrade(data);
       }
       catch(error) {
          console.error('Error fetching courses:',error);
        }
    };
    //alert(id);
    //alert(semester);
    fetchData();
    setCheckedCourses([]);
  }

  const handle_delete = (event) => {
    event.preventDefault();
    //alert("삭제버튼이 눌림");

    const selectedCourses_d = deleteCourses.map(index=>getGrade[index]);
    //alert(selectedCourses);
    selectedCourses_d.map(getGrade => {
      //alert('시작');
      const {subject, class1, credit} = getGrade;
      const data = {id, subject, semester, credit, class1};

      axios.post('/delete/course',data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    alert('수강과목애서 삭제되었습니다!');

    // 등록된 사항을 바로 보여주도록
    const fetchData = async() => {
      try {
          const response = await axios.post('/api/getGrade',{id,semester} );
          const data = response.data;
          setGetGrade(data);
       }
       catch(error) {
          console.error('Error fetching courses:',error);
        }
    };
    //alert(id);
    //alert(semester);
    fetchData();
    setDeleteCourses([]);

  }


  return(
    <div className="lectureapply_root">

      <div className="lectureapply_header">
        <img src="../dowadream.png" onClick={handleLogo}></img>
      </div>
      
      <div className="lectureapply_left">
        <div className="semester">
          <h3>학기선택</h3>
          <ul className="ul_left">
            <li 
              className={semester === '1-1' ? 'selected' : ''}
              onClick={btn1_1}>1학년 1학기</li>
            <li 
              className={semester === '1-2' ? 'selected' : ''}
              onClick={btn1_2}>1학년 2학기</li>
            <li 
              className={semester === '2-1' ? 'selected' : ''}
              onClick={btn2_1}>2학년 1학기</li>
            <li 
              className={semester === '2-2' ? 'selected' : ''}
              onClick={btn2_2}>2학년 2학기</li>
            <li 
              className={semester === '3-1' ? 'selected' : ''}
              onClick={btn3_1}>3학년 1학기</li>
            <li 
              className={semester === '3-2' ? 'selected' : ''}
              onClick={btn3_2}>3학년 2학기</li>
            <li 
              className={semester === '4-1' ? 'selected' : ''}
              onClick={btn4_1}>4학년 1학기</li>
            <li 
              className={semester === '4-' ? 'selected' : ''}
              onClick={btn4_2}>4학년 2학기</li>
          </ul>
        </div>
       
      </div>

      <div className="lectureapply_right">
        <div className="label">
          <span>{buttonText}</span>
        </div>
        
        <div className="dept">
          <span className="small_rect"> </span>
          <span className="sub">학과 검색</span>
          <select id="dropdown" className="department_input" value={department} onChange={handleDropdownChange}>
              <option value="">-- 학과를 선택해주세요. --</option>
              <option value="대양휴머니티칼리지">대양휴머니티칼리지</option>
              <option value="국어국문학과">국어국문학과</option>
              <option value="국제학부">국제학부</option>
              <option value="국제학부 영어영문학전공">국제학부 영어영문학전공</option>
              <option value="국제학부 일어일문학전공">국제학부 일어일문학전공</option>
              <option value="국제학부 중국통상학전공">국제학부 중국통상학전공</option>
              <option value="역사학과">역사학과</option>
              <option value="교육학과">교육학과</option>
              <option value="행정학과">행정학과</option>
              <option value="미디어커뮤니케이션학과">미디어커뮤니케이션학과</option>
              <option value="경영학부">경영학부</option>
              <option value="경제학과">경제학과</option>
              <option value="호텔관광외식경영학부">호텔관광외식경영학부</option>
              <option value="호텔관광외식경영학부 호텔관광경영학전공">호텔관광외식경영학부 호텔관광경영학전공</option>
              <option value="호텔관광외식경영학부 외식경영학전공">호텔관광외식경영학부 외식경영학전공</option>
              <option value="호텔외식관광프랜차이즈경영학과">호텔외식관광프랜차이즈경영학과</option>
              <option value="호텔외식비즈니스학과">호텔외식비즈니스학과</option>
              <option value="글로벌조리학과">글로벌조리학과</option>
              <option value="수학통계학부 수학전공">수학통계학부 수학전공</option>
              <option value="수학통계학부 응용통계학전공">수학통계학부 응용통계학전공</option>
              <option value="물리천문학과">물리천문학과</option>
              <option value="화학과">화학과</option>
              <option value="생명시스템학부">생명시스템학부</option>
              <option value="생명시스템학부 식품생명공학전공">생명시스템학부 식품생명공학전공</option>
              <option value="생명시스템학부 바이오융합공학전공">생명시스템학부 바이오융합공학전공</option>
              <option value="생명시스템학부 바이오산업자원공학전공">생명시스템학부 바이오산업자원공학전공</option>
              <option value="전자정보통신공학과">전자정보통신공학과</option>
              <option value="컴퓨터공학과">컴퓨터공학과</option>
              <option value="정보보호학과">정보보호학과</option>
              <option value="소프트웨어학과">소프트웨어학과</option>
              <option value="데이터사이언스학과">데이터사이언스학과</option>
              <option value="지능기전공학부 무인이동체공학전공">지능기전공학부 무인이동체공학전공</option>
              <option value="지능기전공학부 스마트기기공학전공">지능기전공학부 스마트기기공학전공</option>
              <option value="창의소프트학부">창의소프트학부</option>
              <option value="창의소프트학부 디자인이노베이션전공">창의소프트학부 디자인이노베이션전공</option>
              <option value="창의소프트학부 만화애니메이션텍전공">창의소프트학부 만화애니메이션텍전공</option>
              <option value="건축공학과">건축공학과</option>
              <option value="건축공학부 건축공학전공">건축공학부 건축공학전공</option>
              <option value="건축공학부 건축학전공">건축공학부 건축학전공</option>
              <option value="건설환경공학과">건설환경공학과</option>
              <option value="환경에너지공간융합학과">환경에너지공간융합학과</option>
              <option value="기계항공우주공학부 기계공학전공">기계항공우주공학부 기계공학전공</option>
              <option value="기계항공우주공학부 항공우주공학전공">기계항공우주공학부 항공우주공학전공</option>
              <option value="나노신소재공학과">나노신소재공학과</option>
              <option value="기계공학과">기계공학과</option>
              <option value="국방시스템공학과">국방시스템공학과</option>
              <option value="항공시스템공학과">항공시스템공학과</option>
              <option value="지구자원시스템공학과">지구자원시스템공학과</option>
              <option value="양자원자력공학과">양자원자력공학과</option>
              <option value="회화과">회화과</option>
              <option value="패션디자인학과">패션디자인학과</option>
              <option value="음악과">음악과</option>
              <option value="체육학과">체육학과</option>
              <option value="무용과">무용과</option>
              <option value="영화예술학과">영화예술학과</option>
              <option value="법학부">법학부</option>
              <option value="법학부 법학전공">법학부 법학전공</option>
              <option value="융합창업전공">융합창업전공</option>
              <option value="엔터테인먼트 소프트웨어 융합전공">엔터테인먼트 소프트웨어 융합전공</option>
              <option value="글로벌미디어소프트웨어 융합전공">글로벌미디어소프트웨어 융합전공</option>
              <option value="AI연계융합전공">AI연계융합전공</option>
              <option value="건축학과">건축학과</option>
              <option value="과학기술커뮤니케이션 융합전공">과학기술커뮤니케이션 융합전공</option>
              <option value="금융보험애널리틱스 융합전공">금융보험애널리틱스 융합전공</option>
              <option value="뉴미디어퍼포먼스 융합전공">뉴미디어퍼포먼스 융합전공</option>
              <option value="디지털역사문화자원큐레이션융합전공">디지털역사문화자원큐레이션융합전공</option>
              <option value="럭셔리 브랜드 디자인 융합전공">럭셔리 브랜드 디자인 융합전공</option>
              <option value="문화산업경영 융합전공">문화산업경영 융합전공</option>
              <option value="반도체시스템공학과">반도체시스템공학과</option>
              <option value="비즈니스 애널리틱스 융합전공">비즈니스 애널리틱스 융합전공</option>
              <option value="AI연계융합전공 소셜미디어매니지먼트소프트웨어">AI연계융합전공 소셜미디어매니지먼트소프트웨어</option>
              <option value="수학통계학과">수학통계학과</option>
              <option value="스마트생명산업융합학과">스마트생명산업융합학과</option>
              <option value="AI연계융합전공 스마트투어리즘매니지먼트소프트웨어">AI연계융합전공 스마트투어리즘매니지먼트소프트웨어</option>
              <option value="AI연계융합전공 시스템생명공학">AI연계융합전공 시스템생명공학</option>
              <option value="AI연계융합전공 에듀테크콘텐츠애널리틱스">AI연계융합전공 에듀테크콘텐츠애널리틱스</option>
              <option value="영상디자인 융합전공">영상디자인 융합전공</option>
              <option value="예술융합콘텐츠 융합전공">예술융합콘텐츠 융합전공</option>
              <option value="우주항공시스템공학부">우주항공시스템공학부</option>
              <option value="인공지능학과">인공지능학과</option>
              <option value="AI연계융합전공 자율비행체ICT">AI연계융합전공 자율비행체ICT</option>
              <option value="지능기전공학과">지능기전공학과</option>
          </select>
        </div>

        <div className="deptlist">
          <table>
            <thead>
              <tr>
                <th>선택</th>
                <th>과목명</th>
                <th>이수구분</th>
                <th>학점</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((courses,index) => (
                  <tr key={index}>
                    <td>
                      <input 
                        type="checkbox"
                        checked = {checkedCourses.includes(index)} // 체크되어있으면 체크표시
                        onChange={() => handleCheckboxChange(index)}/>
                    </td>
                    <td>{courses.subject}</td>
                    <td>{courses.class1}</td>
                    <td>{courses.credit}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No courses available</td>
                </tr>
              )
              }
              
            </tbody>
          </table>
        </div>

        <div className="apply">
          <button onClick={handle_apply}>등록</button>
        </div>

        <div className="course">
          <span className="small_rect"> </span>
          <span className="sub">수강한 과목</span>
        </div>

        <div className="course_taken">
          <table>
            <thead>
              <tr>
                <th>선택</th>
                <th>학과</th>
                <th>과목명</th>
                <th>이수구분</th>
                <th>학점</th>
              </tr>
            </thead>
            <tbody>
                {getGrade.length > 0 ? (
                getGrade.map((getGrade,index) => (
                  <tr key={index}>
                    <td>
                      <input 
                        type="checkbox"
                        checked = {deleteCourses.includes(index)} // 체크되어있으면 체크표시
                        onChange={() => handleCheckboxDelete(index)}/>
                    </td>
                    <td>{getGrade.department}</td>
                    <td>{getGrade.subject}</td>
                    <td>{getGrade.class1}</td>
                    <td>{getGrade.credit}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No courses available</td>
                </tr>
              )
              }
            
            </tbody>
          </table>
        </div>

        <div className="apply">
          <button onClick={handle_delete}>삭제</button>
        </div>



      </div>

    </div>
  )
} 
export default Lectureapply;
    