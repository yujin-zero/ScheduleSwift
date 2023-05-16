import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SubjectInterest.css"

const subjectsByDepartment={
    소프트웨어학과:['c프로그래밍및실습','자료구조및실습','문제해결및실습:C++','멀티미디어프로그래밍','확률통계및프로그래밍','일반물리및시물레이션','운영체제','데이터베이스','오픈소스SW개론','수치해석','Capstone디자인(산학협력프로젝트)','가상현실','기계학습','졸업연구및진로1','현장실습12'],
    컴퓨터공학과:['C프로그래밍및실습','고급C프로그래밍및실습','디지털시스템','자료구조및실습','웹프로그래밍','확률통계및프로그래밍','문제해결및실습:C++','K-MOOC:모두를위한머신러닝','운영체제','컴퓨터그래픽스','신호및시스템','C#프로그래밍','데이터베이스','프로그래밍언어의개념','Capstone디자인(산학협력프로젝트)','영상처리','HCI개론','무선통신','소프트웨어특강1', '기계학습','졸업연구및진로1','현장실습12'],
    데이터사이언스학과:['C프로그래밍및실습','자료구조및실습','데이터분석개론','웹프로그래밍','확률통계및프로그래밍','데이터베이스','K-MOOC:기계학습','운영체제','의사결정분석','Capstone디자인(산학협력프로젝트)','졸업연구및진로1','텍스트마이닝','고급데이터처리','현장실습12'],
};

const SubjectInterest = () => {
    let navigate = useNavigate();

    const [selectDepartment, setSelectDepartment]=useState('');
    const [subjects, setSubjects] = useState([]);

    const handleDepartmentChange = (event) => {
        const department = event.target.value;
        setSelectDepartment(department);
        setSubjects(subjectsByDepartment[department]);

    };

    const handleSubjectSelect = (subject) => {
        // 선택한 과목 처리
        console.log("선택한 과목:", subject);
    };

    return(
      <div className="subjectInterest_root">
        <div className="subjectInterest_header">
        <img src="../dowadream.png"></img>
        </div>

        <div className="subjectInterest_left">
            <div className="subjectInterest_dept">
                <span className="si_rect"> </span>
                <span className="serch_dept">학과 검색</span>
                    <select id="department" className="join_input_content_si" value={selectDepartment} onChange={handleDepartmentChange}>
                    <option value="">-- 학과를 선택해주세요. --</option>
                    <option value="소프트웨어학과">소프트웨어학과</option>
                    <option value="컴퓨터공학과">컴퓨터공학과</option>
                    <option value="정보보호학과">정보보호학과</option>
                    <option value="데이터사이언스학과">데이터사이언스학과</option>
                    <option value="지능기전공학부">지능기전공학부</option>
                    <option value="디자인이노베이션전공">디자인이노베이션전공</option>
                    <option value="만화애니메이션텍전공">만화애니메이션텍전공</option>
                    <option value="회화과">회화과</option>
                    <option value="패션디자인학과">패션디자인학과</option>
                    <option value="음악과">음악과</option>
                    <option value="체육학과">체육학과</option>
                    <option value="무용과">무용과</option>
                    <option value="영화예술학과">영화예술학과</option>
                    <option value="건축공학부">건축공학부</option>
                    <option value="건설환경공학과">건설환경공학과</option>
                    <option value="환경에너지공간융합학과">환경에너지공간융합학과</option>
                    <option value="지구자원시스템공학과">지구자원시스템공학과</option>
                    <option value="나노신소재공학과">나노신소재공학과</option>
                    <option value="양자원자력공학과">양자원자력공학과</option>
                    <option value="국방시스템공학과">국방시스템공학과</option>
                    <option value="기계항공우주공학부">기계항공우주공학부</option>
                    <option value="항공시스템공학과">항공시스템공학과</option>
                    <option value="법학부">법학부</option>
                    <option value="수학통계학부">수학통계학부</option>
                    <option value="물리천문학과">물리천문학과</option>
                    <option value="화학과">화학과</option>
                    <option value="생명시스템학부">생명시스템학부</option>
                    <option value="국어국문학과">국어국문학과</option>
                    <option value="국제학부">국제학부</option>
                    <option value="역사학과">역사학과</option>
                    <option value="교육학과">교육학과</option>
                    <option value="행정학과">행정학과</option>
                    <option value="미디어커뮤니케이션학과">미디어커뮤니케이션학과</option>
                    <option value="경영학부">경영학부</option>
                    <option value="경제학과">경제학과</option>
                    </select>
                
            </div>

            <div className="si_subjectlist">
                <div>
                    <span className="si_rect"></span>
                        {subjects.length === 0 ? (
                            <p className="dept_sub_list">과목이 없습니다.</p>
                        ) : (
                    <ul>
                    {subjects.map((subject, index) => (
                        <li key={index} onClick={() => handleSubjectSelect(subject)}>
                        {subject}
                        </li>
                    ))}
                    </ul>
                )}

                </div>   
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
