import axios from "axios"
axios.defaults.withCredentials = false;
const BACK_BASE_URL = 'http://localhost:8080';

export const sendLogin = async(inputId, inputPw) =>{
    const data = await axios({
        method: "POST",
        url: BACK_BASE_URL + "/user/login",
        mode: "cors",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data : {"id" : inputId, "password" : inputPw}
    });
    return data
}

export const sendJoin = async(inputId, inputName, inputDepartment, inputPw) =>{
    console.log(inputId, inputName, inputDepartment, inputPw)
    const data = await axios.post(BACK_BASE_URL + "/process/adduser",
    {
        id : inputId, 
        name : inputName,
        department : inputDepartment,
        password : inputPw
    },
    {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    
    })
    // const data = await axios({
    //     method: "POST",
    //     url: BACK_BASE_URL + "/process/adduser",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     data : {
    //         id : inputId, 
    //         name : inputName,
    //         department : inputDepartment,
    //         password : inputPw
    //     }
    // });
    return data
}
