import React from "react";
import "./RequestSeat.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const RequestSeat = () => {
    const navigate = useNavigate();

    const handleLogo = () => {
        // 로고 클릭하면 포탈화면으로 이동
        navigate('/potal');
    }

    const id = localStorage.getItem('user_id');
    const [addsubject, setAddsubject] = useState([]);
    const [courses, setCourses] = useState([]);
    const [RequestSubject, setRequestSubject] = useState([]);
    const [checkedCourses_rs,setCheckedCourses_rs]=useState([]);
    const department = localStorage.getItem('user_department');

    // 로그인한 학생의 관심과목 가져오기
    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.post('/user/addSubject',{id});
                const data = response.data;
                setAddsubject(data);
            }catch(error) {
                console.error('Error fetching courses:',error);
            }
        };
        fetchData();
    },[]);

     // 체크박스 변경 이벤트 처리 함수
     const handleCheckboxChange_rs = (index) => {
        if (checkedCourses_rs.includes(index)) { // 이미 선택되어있었으면
            setCheckedCourses_rs(checkedCourses_rs.filter((item) => item !== index));
        }else { // 선택 안되어있었으면 추가
            setCheckedCourses_rs([...checkedCourses_rs, index]);
        }
        };

    // 증원요청 버튼이 눌렸을 때
    const handle_request = (event) => {
        event.preventDefault();
    
        // 선택한 과목 정보 가져오기
        const selectedCourses_rs = checkedCourses_rs.map((index) => courses[index]);
    
        selectedCourses_rs.forEach((course) => {
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
    
        alert('증원요청 되었습니다!');
    
        fetchData();
    };
    
    // 등록된 사항을 바로 보여주도록
    const fetchData = async () => {
        try {
        const response = await axios.post('/api/addSubject', { id });
        const data = response.data;
        setRequestSubject(data); // setAddSubject는 addSubject 상태 변수가 있어야 함
        } catch (error) {
        console.error('Error fetching courses:', error);
        }
    };


    

    return(
      <div className="requestSeat_root">
        <div className="requestSeat_header">
        <img src="../dowadream.png" onClick={handleLogo}></img>
            
        </div>

        <div className="requestSeat_left">
            <div className="myob">
            <span className="small_rect11"></span>
            <span className="myobj">{id}님 관심 과목</span>
            
            </div>
          
            <div className="listObj">
                <table>
                    <thead>
                        <tr>
                            <th>선택</th>
                            <th>이수구분</th>
                            <th>과목명</th>
                            <th>학과</th>
                            <th>강의시간</th>
                            <th>학점</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addsubject.length > 0 ? (
                            addsubject.map((addsubject,index) => (
                                <tr>
                                    <td>
                                        <input type="checkbox" 
                                        checked = {checkedCourses_rs.includes(index)}
                                        onChange={()=> handleCheckboxChange_rs(index)}/>
                                    </td>
                                    <td>{addsubject.class1}</td>
                                    <td>{addsubject.subject}</td>
                                    <td>{addsubject.department}</td>
                                    <td>{addsubject.t_lecture}</td>
                                    <td>{addsubject.credit}</td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan="5">No courses available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="rebtn">
                <button onClick={handle_request}>증원 요청</button>
            </div>

            <div className="request">
                <span>요청 현황</span>
            </div>

            <div className="request_live">
                <table>
                    <thead>
                        <tr>
                            <th>분반</th>
                            <th>교과목명</th>
                            <th>요청횟수</th>
                        </tr>
                    </thead>
                   
                    
                </table>
            </div>

        </div>
      </div>
    )
  } 
  export default RequestSeat;
