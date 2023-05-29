import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Potal.css";
import Moment from "react-moment";
import { useInterval } from "use-interval";
import axios from "axios";

// select subject, t_lecture from addSubject where id='1010';
const Potal = () => {
    let navigate = useNavigate();

    const id = localStorage.getItem('user_id');
    const department = localStorage.getItem('user_department');

    const [nowTime, setNowTime] = useState(Date.now());

    // 이름, 학번, 학과
    const [userInfo, setUserInfo] = useState("");

    const [loveLectureList, setLoveLectureList] = useState(); // 관심과목 데베에서 받아오기
    const [timeTable, setTimeTable] = useState(); // 482줄에 들어가 있음. 화면에 노출된 div들 담겨져있음
    const [timeTableColorList, setTimeTableColorList] = useState([ // 테이블 각각 마다 색들.
        [
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
        ],
        [
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
        ],
        [
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
        ],
        [
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
        ],
        [
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
        ],
    ]);

    const colorList = ["#F7A4A4", "#FEBE8C", "#FFFBC1", "#B6E2A1", "#FA7070", "#FBF2CF", "#C6EBC5", "#A1C298" ]; // 시간표 색깔들.

    // 시간 설정
    useInterval(() => {
        setNowTime(Date.now());
    }, 1000);


    // 포탈 header에 이름 띄우기
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                //alert();
                const userId = localStorage.getItem("user_id");

                // 백엔드 서버로 특정 정보를 요청
                //const userId = '20003319';
                const response = await axios.get("/user/info", {
                    params: { id: userId }, // 사용자 ID를 매개변수로 전달
                });

                // 응답에서 특정 정보를 받아옴
                const userInfo = response.data;
                localStorage.setItem('user_department',userInfo.department);

                setUserInfo(userInfo);
            } catch (error) {
                console.error("회원x 정보 가져오기 오류: ", error);
            }
        };
        fetchUserInfo();

        const fetchData = async () => {
            try {
              const response = await axios.post('/user/addSubject', { id });
              const data = response.data;
              if (data.length > 0) {
                const subjects = data.map((item) => item.subject);
                const times = data.map((item) => item.t_lecture);
                const lectureData = [];
                for (let i = 0; i < data.length; i++) {
                  lectureData.push({
                    subject: subjects[i],
                    t_lecture: times[i],
                  });
                }
                setLoveLectureList(lectureData);
              }
            } catch (error) {
              console.error('Error fetching courses:', error);
            }
          };
        
          fetchData();

        //setLoveLectureList(getAllData());
        //alert(loveLectureList);
    }, []);

    // loveLectureList < 관심과목 map으로 돌면서 timeTableColorList set
    useEffect(() => {
        let tableColorList = [...timeTableColorList];
        let colorIndex = 0;

        loveLectureList &&
            loveLectureList.map((lecture) => {
                if (lecture.t_lecture != null && lecture.t_lecture != "") {
                    if (lecture.t_lecture.includes(",")) {
                        let lectureDatas = lecture.t_lecture.split(", ");

                        for (let index = 0; index < lectureDatas.length; index++) {
                            let lectureData = lectureDatas[index].split(" ");
                            let dayData =
                                lectureData.length > 2
                                    ? [getDayIndex(lectureData[0]), getDayIndex(lectureData[1])]
                                    : [getDayIndex(lectureData[0])];

                            let timeData = lectureData[lectureData.length - 1].split("~");
                            let startIndex = getTimeIndex(timeData[0]);
                            let finishIndex = getTimeIndex(timeData[1]);

                            dayData.map((dayIndex) => {
                                for (let index = startIndex; index < finishIndex; index++) {
                                    tableColorList[dayIndex][index] = [colorList[colorIndex], lecture.subject];
                                }
                            });
                        }
                    } else {
                        let lectureData = lecture.t_lecture.split(" ");

                        let dayData =
                            lectureData.length > 2
                                ? [getDayIndex(lectureData[0]), getDayIndex(lectureData[1])]
                                : [getDayIndex(lectureData[0])];

                        let timeData = lectureData[lectureData.length - 1].split("~");
                        let startIndex = getTimeIndex(timeData[0]);
                        let finishIndex = getTimeIndex(timeData[1]);

                        dayData.map((dayIndex) => {
                            for (let index = startIndex; index < finishIndex; index++) {
                                tableColorList[dayIndex][index] = [colorList[colorIndex], lecture.subject];
                            }
                        });
                    }
                    colorIndex++;
                }
            });

        setTimeTableColorList(tableColorList);
    }, [loveLectureList]);


    // timeTableColorList 값이 변경되면 월~금 and 24칸 시간 돌면서 timeTableColorList에 저장된 값으로 표 div셋팅 후 timeTable set
    useEffect(() => {
        let tables = [];

        for (let dayIndex = 0; dayIndex < 5; dayIndex++) { // 월화수목금
            let subjectList = [];
            let timeTableByDay = [];
            for (let timeIndex = 0; timeIndex < 24; timeIndex++) { 
                let [color, subject] = timeTableColorList[dayIndex][timeIndex];

                timeTableByDay.push(
                    <div className={(color === "t")? 'grid' : 'grid_selected'} 
                    style={{ backgroundColor: color }}>
                        <span className="subjectName">
                        {color !== "t" && !subjectList.includes(subject) ? subject : ""}
                        </span>
                    </div>
                );

                if (subject !== "r") {
                    subjectList.push(subject);
                }
            }
            tables.push(
                <th>
                    <div className={getDayClassName(dayIndex)}>{timeTableByDay}</div>
                </th>
            );
        }
        setTimeTable(tables);
    }, [timeTableColorList]);

    function getDayClassName(index) {
        let name;
        switch (index) {
            case 0:
                name = "grids_mon";
                break;
            case 1:
                name = "grids_thu";
                break;
            case 2:
                name = "grids_wed";
                break;
            case 3:
                name = "grids_thr";
                break;
            case 4:
                name = "grids_fri";
                break;
        }
        return name;
    }

    function getDayIndex(day) {
        let index;
        switch (day) {
            case "월":
                index = 0;
                break;
            case "화":
                index = 1;
                break;
            case "수":
                index = 2;
                break;
            case "목":
                index = 3;
                break;
            case "금":
                index = 4;
                break;
            case "토":
                index = 5;
                break;
            case "일":
                index = 6;
                break;
        }
        return index;
    }

    function getTimeIndex(time) {
        let index;
        switch (time) {
            case "09:00":
                index = 0;
                break;
            case "09:30":
                index = 1;
                break;
            case "10:00":
                index = 2;
                break;
            case "10:30":
                index = 3;
                break;
            case "11:00":
                index = 4;
                break;
            case "11:30":
                index = 5;
                break;
            case "12:00":
                index = 6;
                break;
            case "12:30":
                index = 7;
                break;
            case "13:00":
                index = 8;
                break;
            case "13:30":
                index = 9;
                break;
            case "14:00":
                index = 10;
                break;
            case "14:30":
                index = 11;
                break;
            case "15:00":
                index = 12;
                break;
            case "15:30":
                index = 13;
                break;
            case "16:00":
                index = 14;
                break;
            case "16:30":
                index = 15;
                break;
            case "17:00":
                index = 16;
                break;
            case "17:30":
                index = 17;
                break;
            case "18:00":
                index = 18;
                break;
            case "18:30":
                index = 19;
                break;
            case "19:00":
                index = 20;
                break;
            case "19:30":
                index = 21;
                break;
            case "20:00":
                index = 22;
                break;
            case "20:30":
                index = 23;
                break;
            case "21:00":
                index = 24;
                break;
        }
        return index;
    }

    const [Grade, setGrade] = useState("");
    
    //이수구분 별 들어야 할 학점 보여주기(남은학점 계산시 필요)
    useEffect(() => {
        const fetchGraduation = async () => {
            try {
            const userDepartment = localStorage.getItem('user_department');

            const response = await axios.get('/user/graduation', { params: { department: userDepartment } });
            const Grade = response.data;
            localStorage.setItem('user_graduation', Grade.graduationCredit);
            setGrade(Grade);
            } catch (error) {
            console.error('Error fetching user graduation:', error);
            }
        };
        fetchGraduation();
        
    }, []);

    const [getGrade, setGetGrade] = useState([]);

    //수강한 학점 보여주기
    useEffect(() => {
        const fetchGetGraduation = async () => {
          try {
            const response = await axios.get('/user/get_graduation', { params: { id: id } });
            const getgraduation = response.data;
            const creditsArray = Object.keys(getgraduation).map(class1 => ({ class1, total_credit: getgraduation[class1] }));
            setGetGrade(creditsArray);
          } catch (error) {
            console.error('Error fetching user graduation:', error);
          }
        };
      
        fetchGetGraduation();
    }, [id]);


  
    return (
        <div className="Potal_root">
            <div className="potal_header">
                <img src="../dowadream.png"></img>
                <span id="potal_logout" onClick={() => navigate("/")}>
                    로그아웃
                </span>
            </div>
            <div className="potal_name">
                <div className="potal_name_left">
                    {userInfo ? (
                        <div>
                            <h2>{userInfo.name}</h2>
                            <p>
                                {userInfo.id} {userInfo.department}
                            </p>
                        </div>
                    ) : (
                        <h2>회원정보 없음 ...</h2>
                    )}
                </div>
                <div className="potal_name_right">
                    <Moment format={"HH:mm:ss"} className={"moment-box"}>
                        {nowTime}
                    </Moment>
                    <span id="potal_Application" onClick={() => navigate("/apply")}>
                        수강신청 하기
                    </span>
                </div>
            </div>
            <div className="potal_body">
                <div className="potal_left">
                    <div className="potal_timetable">
                        <div className="potal_timetable_header">
                            <h3>시간표</h3>
                            <span id="potal_interested" onClick={() => navigate("/subjectInterest")}>
                                관심과목 수정
                            </span>
                        </div>
                        <div className="potal_timetable_content">
                                <div className="tablehead">
                                    <table>
                                        <tr>
                                            <td className="non"></td>
                                            <th className="mon">
                                                <span>월</span>
                                            </th>
                                            <th className="thu">
                                                <span>화</span>
                                            </th>
                                            <th className="wed">
                                                <span>수</span>
                                            </th>
                                            <th className="thr">
                                                <span>목</span>
                                            </th>
                                            <th className="fri">
                                                <span>금</span>
                                            </th>
                                        </tr>
                                    </table>
                                </div>

                            <div className="tablebody">
                                <table>
                                    <tr>
                                        <th>
                                            <div className="hours">
                                                <div className="hour9">
                                                    <span>9</span>
                                                </div>
                                                <div className="hour10">
                                                    <span>10</span>
                                                </div>
                                                <div className="hour11">
                                                    <span>11</span>
                                                </div>
                                                <div className="hour12">
                                                    <span>12</span>
                                                </div>
                                                <div className="hour1">
                                                    <span>1</span>
                                                </div>
                                                <div className="hour2">
                                                    <span>2</span>
                                                </div>
                                                <div className="hour3">
                                                    <span>3</span>
                                                </div>
                                                <div className="hour4">
                                                    <span>4</span>
                                                </div>
                                                <div className="hour5">
                                                    <span>5</span>
                                                </div>
                                                <div className="hour6">
                                                    <span>6</span>
                                                </div>
                                                <div className="hour7">
                                                    <span>7</span>
                                                </div>
                                                <div className="hour8">
                                                    <span>8</span>
                                                </div>
                                            </div>
                                        </th>
                                        {timeTable}
                                    </tr>
                                        
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div>

        </div>

                <div className="potal_right">
                    <div className="potal_information">
                        <div className="potal_info1">
                            <h3>취득 학점</h3>
                            <span id="potal_get" onClick={() => navigate("/lectureapply")}>
                                취득학점 수정
                            </span>
                        </div>
                        <div className="potal_info2">
                            <table>
                                <tr>
                                    <th>공통교양필수</th>
                                    <th>균형교양필수</th>
                                    <th>학문기초교양필수</th>
                                    <th>교양필수</th>
                                    <th>교양선택</th>
                                    
                                </tr>
                                <tr>
                                
                                    <td>{getGrade.filter(item => item.class1 === '공통교양필수').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    <td>{getGrade.filter(item => item.class1 === '균형교양필수').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    <td>{getGrade.filter(item => item.class1 === '학문기초교양필수').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    <td>{getGrade.filter(item => item.class1 === '교양필수').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    <td>{getGrade.filter(item => item.class1 === '교양선택').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    
                                </tr>
                                <tr>
                                    <th>전공필수</th>
                                    <th>전공선택</th>
                                    <th>교양학점계</th>
                                    <th>전공학점계</th>
                                    <th>수강학점</th>
                                </tr>
                                <tr>
                                    <td>{getGrade.filter(item => item.class1 === '전공필수').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    <td>{getGrade.filter(item => item.class1 === '전공선택').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    <td>{getGrade.filter(item => item.class1 === '공통교양필수' || item.class1 === '균형교양필수'||item.class1 === '학문기초교양필수'||item.class1 === '교양필수'||item.class1 === '교양선택').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    <td>{getGrade.filter(item => item.class1 === '전공필수' || item.class1 === '전공선택').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    <td>{getGrade.filter(item => item.class1 === '공통교양필수' || item.class1 === '균형교양필수'||item.class1 === '학문기초교양필수'||item.class1 === '교양필수'||item.class1 === '교양선택'||item.class1 === '전공선택'||item.class1 === '전공필수').reduce((total, item) => total + item.total_credit, 0)}</td>

                                </tr>
                            </table>
                        </div>
                        <div className="potal_info3">
                            <h3>졸업학점 / 남은학점</h3>
                            <table>
                                <tr>
                                    <th>공통교양필수</th>
                                    <th>균형교양필수</th>
                                    <th>학문기초교양필수</th>
                                    <th>전공필수</th>
                                </tr>
                                <tr>
                                    <td>{parseInt(Grade.a) - getGrade.filter(item => item.class1 === '공통교양필수').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    <td>{parseInt(Grade.b)-getGrade.filter(item => item.class1 === '균형교양필수').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    <td>{parseInt(Grade.c)-getGrade.filter(item => item.class1 === '학문기초교양필수').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    <td>{parseInt(Grade.e)-getGrade.filter(item => item.class1 === '전공필수').reduce((total, item) => total + item.total_credit, 0)}</td>
                                </tr>
                                <tr>
                                    <th>전공선택</th>
                                    <th>교양학점계</th>
                                    <th>전공학점계</th>
                                    <th>남은학점</th>
                                </tr>
                                <tr>
                                    
                                    <td>{parseInt(Grade.e)-getGrade.filter(item => item.class1 === '전공선택').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    <td>{(parseInt(Grade.a)+parseInt(Grade.b)+parseInt(Grade.c))-getGrade.filter(item => item.class1 === '공통교양필수'|| item.class1 === '균형교양필수'||item.class1 === '학문기초교양필수').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    <td>{(parseInt(Grade.d))-getGrade.filter(item => item.class1 === '전공필수'|| item.class1 === '전공선택').reduce((total, item) => total + item.total_credit, 0)}</td>
                                    <td>{130 - getGrade.filter(item => item.class1 === '공통교양필수' || item.class1 === '균형교양필수' || item.class1 === '학문기초교양필수' || item.class1 === '교양필수' || item.class1 === '교양선택' || item.class1 === '전공선택' || item.class1 === '전공필수').reduce((total, item) => total + item.total_credit, 0)}</td>
                                </tr>
                            </table>
                        </div>
    
                    </div>
                    <div className="potal_grade">
                        <h4>취득학점 / 졸업학점 </h4>
                        <h3> {getGrade.filter(item => item.class1 === '공통교양필수' || item.class1 === '균형교양필수'||item.class1 === '학문기초교양필수'||item.class1 === '교양필수'||item.class1 === '교양선택'||item.class1 === '전공선택'||item.class1 === '전공필수').reduce((total, item) => total + item.total_credit, 0)} / 130</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Potal;
