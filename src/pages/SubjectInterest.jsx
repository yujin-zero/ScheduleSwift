import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SubjectInterest.css"
import axios from 'axios';


const SubjectInterest = () => {
    let navigate = useNavigate();

    const [department, setDepartment] = useState('');
    const [courses, setCourses] = useState([]);


    const handleDropdownChange = (event) => {
        setDepartment(event.target.value);
      }


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


    return(
      <div className="subjectInterest_root">
        <div className="subjectInterest_header">
        <img src="../dowadream.png"></img>
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

            <div className="si_subjectlist">
                <table>
                    <thead>
                    <tr>
                        <th>선택</th>
                        <th>과목명</th>
                        <th>이수구분</th>
                        <th>학점</th>
                        <th>요일 및 강의시간</th>
                    </tr>
                    </thead>
                    <tbody>
                    {courses.length > 0 ? (
                        courses.map((courses,index) => (
                        <tr key={index}>
                            <td>
                            <input type="checkbox"/>
                            </td>
                            <td>{courses.subject}</td>
                            <td>{courses.class}</td>
                            <td>{courses.credit}</td>
                            <td>{courses.t_lecture}</td>
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

            <div className="includebtn">
                <button>담기</button>
            </div>

            <div className="mysubject">
                <span className="si_rect"></span>
                <span className="mysb">담은 과목</span>
            </div>

            <div className="si_subjectlist">
                <span></span>
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
