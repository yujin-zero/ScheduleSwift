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
                const data = response.data.map(item => ({
                    id: item.id,
                    subject: item.subject,
                    class1: item.class1,
                    credit: item.credit,
                    department:item.department,
                    t_lecture: item.t_lecture,
                    requestCount: 0 // 요청 횟수 초기화
                  }));
                setAddsubject(data);
            }catch(error) {
                console.error('Error fetching courses:',error);
            }
        };
        fetchData();
    },[]);

    // 로컬 스토리지에서 메시지 가져오기
    useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
    }
    }, []);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post('/user/addSubject', { id });
            const data = response.data;
            const subjectNames = data.subjects.map(subject => subject.name);
            setAddsubject(subjectNames);
          } catch (error) {
            console.error('Error fetching courses:', error);
          }
        };
        fetchData();
      }, []);



      const [showMessageInput, setShowMessageInput] = useState(false);
      const [currentSubject, setCurrentSubject] = useState(null);
      const [message, setMessage] = useState('');
      const [messages, setMessages] = useState([]);

      const [requestMessages, setRequestMessages] = useState([]);

        const addRequestMessage = (message) => {
        setRequestMessages([...requestMessages, message]);
        };

     

      useEffect(() => {
        localStorage.setItem("messages", JSON.stringify(messages));
      }, [messages]);

     
      const handleRequest = (subjectName) => {
        const subject = addsubject.find((item) => item.subject === subjectName);
        if (subject) {
          setCurrentSubject(subject);
          setShowMessageInput(true);
        }
      };

      
      const handleMessageSubmit = (message) => {
        if (currentSubject) {
          const { subject } = currentSubject;
          const newMessages = { ...messages };
          if (!newMessages[subject]) {
            newMessages[subject] = [];
          }
          newMessages[subject].push({ message });
          setMessages(newMessages);
          setMessage("");
    
          // 요청 횟수 증가
          const updatedAddsubject = addsubject.map((item) => {
            if (item.subject === subject) {
              return { ...item, requestCount: item.requestCount + 1 };
            }
            return item;
          });
          setAddsubject(updatedAddsubject);
        }
      };

    // 메시지 개수 세기
    const getMessageCount = (subject) => {
        if (messages[subject]) {
        return messages[subject].length;
        }
        return 0;
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
                            <th>요청횟수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addsubject.length > 0 ? (
                            addsubject.map((addsubject,index) => (
                                <tr>
                                    <td>
                                    <button onClick={() => handleRequest(addsubject.subject, message)}>요청</button>
                                    </td>
                                    <td>{addsubject.class1}</td>
                                    <td>{addsubject.subject}</td>
                                    <td>{addsubject.department}</td>
                                    <td>{addsubject.t_lecture}</td>
                                    <td>{addsubject.credit}</td>
                                    <td>{getMessageCount(addsubject.subject)}</td>
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

                <span className="small_rect12"></span>
                <span className="myobj1">요청 메세지 보내기</span>


            <div className="leavemessage">
                <div className="leave_contents">
                    {showMessageInput && currentSubject && (
                        <div className="messageInput">
                            <h3>{currentSubject.subject}</h3>
                            <form onSubmit={(e) => { e.preventDefault(); handleMessageSubmit(message); }}>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="메시지를 입력하세요"
                                className="messageInput"
                            />
                            <button type="submit">보내기</button>
                            </form>
                        </div>
                        )}
                </div>

            </div>


            <div className="showmessagediv">
                {currentSubject && (
                    <div className="showm">
                        <h3>{currentSubject.subject}</h3>
                    </div>
                    )}
                {currentSubject && messages[currentSubject.subject] ? (
                <ul>
                    {messages[currentSubject.subject].map((msg, index) => (
                    <li className="listMessage" key={index}>{msg.message}</li>
                    ))}
                </ul>
                ) : (
                <p className="noMessage">메시지가 없습니다.</p>
               
                )}
            </div>
                

            </div>
      </div>
    )
  } 
  export default RequestSeat;
