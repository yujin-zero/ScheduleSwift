import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Apply.css"
import axios from 'axios';
import { useInterval } from "use-interval";
import Moment from "react-moment";

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
    const [addsubject, setAddsubject] = useState([]);
    const [abbsubjectSeat, setAbbsubjectSeat] = useState([]);

    const [applyLectureList, setApplyLectureList] = useState(); // 수강신청한 과목 받아오기
    const [timeTable, setTimeTable] = useState();
    const [timeTableColorList, setTimeTableColorList] = useState([
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

    const colorList = ["#F7A4A4", "#FEBE8C", "#FFFBC1", "#B6E2A1", "#FA7070", "#FBF2CF", "#C6EBC5", "#A1C298"];


    // 로그인한 학생의 관심과목 가져오기 및 여석 정보 가져오기
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

    const [noTimeCourses, setNoTimeCourses] = useState([]);

    // 수강신청 한 과목을 보여줌
    useEffect(() => {
        const fetchData = async() => {
        try {
            const response = await axios.post('/api/my_subject',{id} );
            const data = response.data;
            set_my_subject(data);
            if(data.length>0) {
                const subjects = data.map((item) => item.subject);
                const times = data.map((item) => item.t_lecture);
                const lectureData = [];
                // for(let i=0; i<data.length; i++) {
                //     lectureData.push({
                //         subject: subjects[i],
                //         t_lecture: times[i],
                //     });
                // }
                for (let i = 0; i < data.length; i++) {
                    const { subject, t_lecture } = data[i];
                    const isNoTime = t_lecture === '' || t_lecture === null;
          
                    if (isNoTime) {
                      setNoTimeCourses((prevCourses) => [...prevCourses, subject]);
                    } else {
                      lectureData.push({
                        subject,
                        t_lecture,
                      });
                    }
                  }
                setApplyLectureList(lectureData);
            }
        }
        catch(error) {
            console.error('Error fetching courses:',error);
        }
        };
        //alert(id);
        //alert(semester);
        fetchData();
    },[]);

    // applyLectureList < 수강신청한 과목 map으로 돌면서 timeTableColorList set
    useEffect(() => {
        let tableColorList = [...timeTableColorList];
        let colorIndex = 0;

        applyLectureList &&
            applyLectureList.map((lecture) => {
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
    },[applyLectureList]);

    useEffect(() => {
        let tables = [];

        for (let dayIndex=0; dayIndex<5; dayIndex++) {
            let subjectList = [];
            let timeTableByDay = [];
            for(let timeIndex=0; timeIndex<24; timeIndex++) {
                let [color,subject] = timeTableColorList[dayIndex][timeIndex];

                timeTableByDay.push(
                    <div className={(color === "t") ? 'grid_apply' : 'grid_apply_selected'}
                     style={{backgroundColor: color}}>
                        <span className="subjectName">
                        {color !== "t" && !subjectList.includes(subject) ? subject : ""}
                        </span>
                    </div>
                );

                if(subject !== "r") {
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
    },[timeTableColorList]);

    function getDayClassName(index) {
        let name;
        switch (index) {
            case 0:
                name = "grids_mon1";
                break;
            case 1:
                name = "grids_thu1";
                break;
            case 2:
                name = "grids_wed1";
                break;
            case 3:
                name = "grids_thr1";
                break;
            case 4:
                name = "grids_fri1";
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

  
    const [totalCredits, setTotalCredits] = useState(0);
    const [selectedCourseCount, setSelectedCourseCount] = useState(0);

   // 학점 총계 계산 함수
    const calculateTotalCredits = (courses) => {
        return courses.reduce((sum, course) => sum + course.credit, 0);
    };

    // 수강신청 후 학점 총계 및 신청 과목 수 업데이트 함수
    const updateTotalCreditsAndCount = async () => {
        try {
        const response = await axios.post('/api/my_subject', { id });
        const data = response.data;
        set_my_subject(data);

        // 학점 총계 계산
        const totalCredits = calculateTotalCredits(data);
        setTotalCredits(totalCredits);

        // 신청 과목 수 업데이트
        setSelectedCourseCount(data.length);
        } catch (error) {
        console.error('Error fetching courses:', error);
        }
    };

    // 컴포넌트가 마운트될 때 학점 총계 업데이트
    useEffect(() => {
        updateTotalCreditsAndCount();
    }, []);
    
    // 신청버튼이 눌렸을 때
    const handleButtonClick = async (index) => {
        // 선택한 과목의 정보를 가져오기
        const selectedCourse = courses[index];
        // 데이터베이스에 과목 정보를 저장
        const { subject, class1, t_lecture, credit, seat } = selectedCourse;
        const data = { id, department, subject, class1, t_lecture, credit, seat };
    
        try {
        const response = await axios.post('/api/apply_course', data);
        const message = response.data;
        if (message === '이미 데이터가 존재합니다') {
            alert('이미 수강신청한 과목입니다.');
        } else if (message === '데이터 저장 성공') {
            setSelectedCourses((prevCourses) => [...prevCourses, selectedCourse]);
            if (t_lecture === '' || t_lecture === null) {
            setNoTimeCourses((prevCourses) => [...prevCourses, selectedCourse]);
            }
            alert('수강신청 되었습니다!');
            updateTotalCreditsAndCount();
        }
        } catch (err) {
        console.error(err);
        alert('수강신청에 실패했습니다.');
        }
    
        // 등록된 사항을 바로 보여주도록
        const fetchData = async () => {
        try {
            const response = await axios.post('/api/my_subject', { id });
            const data = response.data;
            set_my_subject(data);
    
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
        };
    
        fetchData();
        window.location.reload();
    };
    


    // 관심과목 신청버튼이 눌렸을 때.
    const handleDirectApply = async (index) => {
        // 선택한 과목의 정보를 가져오기
        const selectedCourse = addsubject[index];
        // 데이터베이스에 과목 정보를 저장
        const { subject, class1, t_lecture, credit, seat, department } = selectedCourse;
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
        window.location.reload();
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
        window.location.reload();
    };


    // 여석 연동(course, addSubject,my_subject)
    useEffect(() => {
        // addsubject.forEach((item,index) => {
        //     const findSeatAdd = addsubject[index];
        //     alert(findSeatAdd);
        // });
        //alert(addsubject[0]);
        
    });



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
                                                <td>{courses.remain_seat}/{courses.seat}</td>
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
                                {addsubject.length > 0 ? (
                                    addsubject.map((addsubject,index) => (
                                        <tr>
                                            <td>
                                                <button onClick={() => handleDirectApply(index)}>
                                                    신청</button>
                                            </td>
                                            <td>{addsubject.subject}</td>
                                            <td>{addsubject.class1}</td>
                                            <td>{addsubject.t_lecture}</td>
                                            <td>{addsubject.credit}</td>
                                            <td></td>
                                        </tr>
                                    ))
                                ):(
                                    <tr>
                                        <td colSpan="5" className="nocoures">No courses available</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
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
                                <th>학과</th>
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
                                    <td>{my_subject.department}</td>
                                    <td>{my_subject.subject}</td>
                                    <td>{my_subject.class1}</td>
                                    <td>{my_subject.t_lecture}</td>
                                    <td>{my_subject.credit}</td>
                                    <td>{my_subject.seat}/{my_subject.seat}</td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan="7">No courses available</td>
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
                        <div className="dowadream_timetable">
                            <div className="dowadream_tablehead">
                                <table>
                                        <tr>
                                            <td className="non_apply">
                                                <span></span>
                                            </td>
                                            <div className="day">
                                                <th className="mon_apply">
                                                    <span>월</span>
                                                </th>
                                                <th className="thu_apply">
                                                    <span>화</span>
                                                </th>
                                                <th className="wed_apply">
                                                    <span>수</span>
                                                </th>
                                                <th className="thr_apply">
                                                    <span>목</span>
                                                </th>
                                                <th className="fri_apply">
                                                    <span>금</span>
                                                </th>


                                            </div>
                                           
                                        </tr>
                                    </table>
                            </div>
                            <div className="dowadream_tablebody">
                            <table>
                                    <tr>
                                        <th>
                                            <div className="hours_a">
                                                <div className="hour9_a">
                                                    <span>9</span>
                                                </div>
                                                <div className="hour10_a">
                                                    <span>10</span>
                                                </div>
                                                <div className="hour11_a">
                                                    <span>11</span>
                                                </div>
                                                <div className="hour12_a">
                                                    <span>12</span>
                                                </div>
                                                <div className="hour1_a">
                                                    <span>1</span>
                                                </div>
                                                <div className="hour2_a">
                                                    <span>2</span>
                                                </div>
                                                <div className="hour3_a">
                                                    <span>3</span>
                                                </div>
                                                <div className="hour4_a">
                                                    <span>4</span>
                                                </div>
                                                <div className="hour5_a">
                                                    <span>5</span>
                                                </div>
                                                <div className="hour6_a">
                                                    <span>6</span>
                                                </div>
                                                <div className="hour7_a">
                                                    <span>7</span>
                                                </div>
                                                <div className="hour8_a">
                                                    <span>8</span>
                                                </div>
                                            </div>
                                        </th>
                                        {timeTable}
                                    </tr>   
                                </table>
                                <div className="noTimeLecture">
                                    {noTimeCourses.map((course, index) => (
                                        <div className="noTimeSubject" key={index}>
                                        <span>{course}</span>
                                        {/* <hr /> */}
                                        </div>
                                    ))}
                                </div>

                            </div>
                            
                        </div>
                       
                        <div className="showCredit">
                            <span>신청한 학점:&nbsp;{totalCredits}&nbsp;&nbsp;&nbsp;</span>
                            <span>신청 과목 수:&nbsp;{selectedCourseCount}&nbsp;&nbsp;&nbsp;&nbsp; </span>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>


    );
}

export default Apply;

