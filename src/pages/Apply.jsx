import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Apply.css"
import axios from 'axios';

const Apply = () => {
    const navigate = useNavigate();

    const handleLogo = () => {
        // 로고 클릭하면 포탈화면으로 이동
        navigate('/potal');
      }

    const [department, setDepartment] = useState('');
    const [courses, setCourses] = useState([]);
    const [my_subject, set_my_subject] = useState([]);
    const id = localStorage.getItem('user_id');
    const [selectedCourse, setSelectedCourses] = useState([]);
    const [selectedIndices, set_selectedIndices] = useState([]);
    
    
    const handleDropdownChange = (event) => {
        setDepartment(event.target.value);
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


    // 수강신청 한 과목을 보여줌
    useEffect(() => {
        const fetchData = async() => {
        try {
            const response = await axios.post('/api/my_subject',{id} );
            const data = response.data;
            set_my_subject(data);
        }
        catch(error) {
            console.error('Error fetching courses:',error);
        }
        };
        //alert(id);
        //alert(semester);
        fetchData();
    },[id]);

  
    // 신청버튼이 눌렸을 때.
    const handleButtonClick = async (index) => {
        // 선택한 과목의 정보를 가져오기
        const selectedCourse = courses[index];
        // 데이터베이스에 과목 정보를 저장
        const { subject, class1, t_lecture, credit, seat } = selectedCourse;
        const data = { id, department, subject, class1, t_lecture, credit, seat };
        try {
            await axios.post('/api/apply_course', data);
            // 데이터베이스에 저장이 성공한 경우에만 선택한 과목을 화면에 보여줌
            setSelectedCourses((prevCourses) => [...prevCourses, selectedCourse]);
            alert('수강신청 되었습니다!');
        } catch (err) {
            console.error(err);
            alert('수강신청에 실패했습니다.');
        }

         // 등록된 사항을 바로 보여주도록
        const fetchData = async() => {
        try {
            const response = await axios.post('/api/my_subject',{id} );
            const data = response.data;
            set_my_subject(data);
        }
        catch(error) {
            console.error('Error fetching courses:',error);
            }
        };
        //alert(id);
        //alert(semester);
        fetchData();
    };

   
    // 삭제 버튼이 눌렸을 때
    const handleButtonClick_delete = async (index) => {
        const deleteCourse = my_subject[index]; // 수정: my_subject 배열 사용
        
        try {
        // 데이터베이스에서 과목 정보를 삭제하는 요청을 보냅니다.
        await axios.post('/api/delete_course', deleteCourse);
        
        set_my_subject((prevCourses) => {
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


    return (
        <div className="apply_root">
            <div className="apply_header">
            <img src="../dowadream.png" onClick={handleLogo}></img>
            </div>
            <div className="apply_body">
                <div className="apply_left">

                        <div className="apply_class_header">
                            <div id="apply_square"></div>
                            <h3>수강신청</h3>
                        </div>
                        <div className="apply_class_content">
                            <div className="selectDept">
                                <span className="dept_label_style">학과 검색</span>
                                <select id="dropdown" className="departmentInput" value={department} onChange={handleDropdownChange}>
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


                            <div className="table_style">
                                <table>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>과목명</th>
                                        <th>이수구분</th>
                                        <th>시간</th>
                                        <th>학점</th>
                                        <th>여석</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {courses.length > 0 ? (
                                            courses.map((courses,index) => (
                                            <tr key={index}>
                                                <td>
                                                <button className={selectedIndices.includes(index) ? 'checked' : ''} 
                                                onClick={() => handleButtonClick(index)}>신청</button>
                                                </td>
                                                <td>{courses.subject}</td>
                                                <td>{courses.class1}</td>
                                                <td>{courses.t_lecture}</td>
                                                <td>{courses.credit}</td>
                                                <td>{courses.seat}/{courses.seat}</td>
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
                            
                        </div>
                    </div>
                    <div className="apply_interest">
                        <div className="apply_interest_header">
                            <div id="apply_square"></div>
                            <h3>관심과목 현황</h3>
                        </div>
                        <div className="apply_interest_content">

                        </div>
                    </div>
                    <div className="apply_complete">
                        <div className="apply_complete_header">
                            <div id="apply_square"></div>
                            <h3>신청한 과목</h3>
                        </div>
                        <div className="apply_complete_content">
                        <table>
                            <thead>
                            <tr>
                                <th></th>
                                <th>과목명</th>
                                <th>이수구분</th>
                                <th>시간</th>
                                <th>학점</th>
                                <th>여석</th>
                            </tr>
                            </thead>
                            <tbody>
                                {my_subject.length > 0 ? (
                                my_subject.map((my_subject,index) => (
                                <tr key={index}>
                                    <td>
                                    <button className="checked" onClick={() => handleButtonClick_delete(index)}>삭제</button> 
                                    </td>
                                    <td>{my_subject.subject}</td>
                                    <td>{my_subject.class1}</td>
                                    <td>{my_subject.t_lecture}</td>
                                    <td>{my_subject.credit}</td>
                                    <td>{my_subject.seat}/{my_subject.seat}</td>
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
                    </div>
                </div>
                <div className="apply_right">
                    <div className="apply_dowadream_header">
                        <div id="apply_square"></div>
                        <h3>도와드림 창</h3>
                    </div>
                    <div className="apply_dowadream">
                        
                    </div>
                </div>
            </div>

        </div>

    );
}

export default Apply;