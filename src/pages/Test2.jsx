import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Test2 = () => {
    let navigate = useNavigate();

    return (
        <div className="main_container">
            <div className="header">

            </div>
            <div className="body">
                <div className="left2">
                    <Button 
                        name="Button1" 
                        onClick={() => navigate('/')} 
                    />
                    <Button 
                        name="Button2" 
                        onClick={() => navigate('/')} 
                    />
                    <Button 
                        name="Button3" 
                        onClick={() => navigate('/')} 
                    />
                    <Button 
                        name="Button4" 
                        onClick={() => navigate('/')} 
                    />
                    <Button 
                        name="Button5" 
                        onClick={() => navigate('/')} 
                    />
                </div>
                <div className="right2">
                    
                </div>
            </div>

        </div>
    );
}

export default Test2;
