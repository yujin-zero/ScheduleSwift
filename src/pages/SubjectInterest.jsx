import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SubjectInterest.css"
import axios from 'axios';

const SubjectInterest = () => {
    const navigate = useNavigate();

    const handleLogo = () => {
    // 로고 클릭하면 포탈화면으로 이동
    navigate('/potal');
    }

    const [department, setDepartment] = useState('');
    const [courses, setCourses] = useState([]);
    const id = localStorage.getItem('user_id');
    const [selectedIndices, set_selectedIndices] = useState([]);
    

    // 체크된 과목들을 담을 함수
    const [checkedCourses, setCheckedCourses] = useState([]);
    const [addSubject, setAddSubject] = useState([]);
    const [deleteCourses, setDeleteCourses] = useState([]);
    
    const handleDropdownChange = (event) => {
        setDepartment(event.target.value);
        setCheckedCourses([]);
    }

    // 학과 검색을 누를 때 마다 과목목록 나오게 실행
    useEffect(() => {
        // MySQL 데이터베이스에서 쿼리 실행
        const fetchData = async () => {
        try {
            const response = await axios.get('/api/courses', {
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


    // 담은 과목
    useEffect(() => {
        const fetchData = async() => {
        try {
            const response = await axios.post('/api/addSubject',{id} );
            const data = response.data;
            setAddSubject(data);
        }catch(error) {
            console.error('Error fetching courses:',error);
            }
        };
        //alert(id);
        //alert(semester);
        fetchData();
    },[id]);


    // 체크박스 변경 이벤트 처리 함수
    const handleCheckboxChange = (index) => {
    if (checkedCourses.includes(index)) { // 이미 선택되어있었으면
        setCheckedCourses(checkedCourses.filter((item) => item !== index));
    }else { // 선택 안되어있었으면 추가
        setCheckedCourses([...checkedCourses, index]);
    }
    };
    // 현재까지 체크된 인덱스 값들이 checkedCourses에 다 저장되어있음.



    // 담기 버튼이 눌렸을 때
    const handle_add = (event) => {
        event.preventDefault();
    
        // 선택한 과목 정보 가져오기
        const selectedCourses = checkedCourses.map((index) => courses[index]);
    
        selectedCourses.forEach((course) => {
        const { subject, class1, credit, t_lecture } = course;
        const data = { id, department, subject, t_lecture, class1, credit };
    
        axios
            .post('/apply/mycourse', data)
            .then((res) => {
            console.log(res.data);
            })
            .catch((err) => {
            console.error(err);
            });
        });
    
        alert('수강과목이 담겼습니다!');
    
        fetchData();
    };
    
    // 등록된 사항을 바로 보여주도록
    const fetchData = async () => {
        try {
        const response = await axios.post('/api/addSubject', { id });
        const data = response.data;
        setAddSubject(data); // setAddSubject는 addSubject 상태 변수가 있어야 함
        } catch (error) {
        console.error('Error fetching courses:', error);
        }
    };


    const handleCheckboxDelete = (index) => {
    if (deleteCourses.includes(index)) {
      setDeleteCourses(deleteCourses.filter((item) => item != index));
    }
    else {
      setDeleteCourses([...deleteCourses, index]);
    }
    };

    const handle_delete = (event) => {
    event.preventDefault();
    //alert("삭제버튼이 눌림");

    const selectedCourses_d = deleteCourses.map(index=>addSubject[index]);
    //alert(selectedCourses);
    selectedCourses_d.map(addSubject => {
      //alert('시작');
      const {subject, class1, credit,t_lecture} = addSubject;
      const data = {id, subject, class1, credit,t_lecture};
      // id , department
      //alert(id);

      axios.post('/delete/addSubject',data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    alert('수강과목에서 삭제되었습니다!');

    // 등록된 사항을 바로 보여주도록
    const fetchData = async() => {
      try {
          const response = await axios.post('/api/addSubject',{id} );
          const data = response.data;
          setAddSubject(data);
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
    
    // 삭제 버튼이 눌렸을 때
    const handleButtonClick_delete = async (index) => {
        const deleteCourse = addSubject[index]; // 수정: addSubject 배열 사용
    
        try {
        // 데이터베이스에서 과목 정보를 삭제하는 요청을 보냅니다.
        await axios.post('/api/delete_course_si', deleteCourse);
    
        setAddSubject((prevCourses) => {
            const updatedCourses = [...prevCourses];
            updatedCourses.splice(index, 1);
            return updatedCourses;
        });
    
        alert('과목이 삭제되었습니다.');
        } catch (err) {
        console.error(err);
        alert('과목 삭제에 실패했습니다.');
        }
    };
    
    

    return(
      <div className="subjectInterest_root">
        <div className="subjectInterest_header">
        <img src="../dowadream.png" onClick={handleLogo}></img>
        </div>

        <div className="subjectInterest_left">
            <div className="subjectInterest_dept">
                <span className="si_rect"> </span>
                <span className="serch_dept">학과 검색</span>
                    <select id="department" className="join_input_content_si" value={department} onChange={handleDropdownChange}>
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

            <div className="my_subjectlist">
                <div className="tb">
                    <table>
                        <thead>
                            <tr>
                                <th id="select">선택</th>
                                <th id="subject">과목명</th>
                                <th id="class1">이수구분</th>
                                <th id="credit">학점</th>
                                <th id="t_lecture">요일 및 강의시간</th>
                            </tr>
                        </thead>

                        <tbody>
                            {courses.length > 0 ? (
                                courses.map((courses,index) => (
                                <tr key={index}>
                                    <td>
                                        <input type="checkbox" 
                                        checked = {checkedCourses.includes(index)}
                                        onChange={()=> handleCheckboxChange(index)}/>
                                    </td>
                                    <td>{courses.subject}</td>
                                    <td>{courses.class1}</td>
                                    <td>{courses.credit}</td>
                                    <td>{courses.t_lecture}</td>
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
            </div>

            <div className="includebtn">
                <button onClick={handle_add}>담기</button>
            </div>

            <div className="mysubject">
                <span className="si_rect"></span>
                <span className="mysb">담은 과목</span>
            </div>
            
            <div className="my_subjectlist2">
                    <div className="tb">
                    <table>
                        <thead>
                        <tr>
                            <th id="select">선택</th>
                            <th id="department1">학과</th>
                            <th id="subject">과목명</th>
                            <th id="class1">이수구분</th>
                            <th id="credit">학점</th>
                            <th id="t_lecture">요일 및 강의시간</th>
                        </tr>
                        </thead>
                    
                        <tbody>
                            {addSubject.length > 0 ? (
                                addSubject.map((addSubject, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                        type="checkbox"
                                        checked = {deleteCourses.includes(index)} // 체크되어있으면 체크표시
                                        onChange={() => handleCheckboxDelete(index)}/>
                                    </td>
                                    <td>{addSubject.department}</td>
                                    <td>{addSubject.subject}</td>
                                    <td>{addSubject.class1}</td>
                                    <td>{addSubject.credit}</td>
                                    <td>{addSubject.t_lecture}</td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan="6">No courses selected</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    </div>
            </div>
            <div className="includebtn2">
                <button onClick={handle_delete}>삭제</button>
            </div>

        </div>

        <div className="subjectInterest_right">
            <div className="gorequestSeat">
                <button id="potal_requestSeat"onClick={() => navigate('/requestSeat')}>증원요청 하러가기</button>
            </div>

            <div className="time">
                <span className="right_si_rect"></span>
                <span className="mytime">시간표</span>
                <span className="timepart"></span>
            </div>
        </div>
      </div>

    )
  } 
  export default SubjectInterest;
