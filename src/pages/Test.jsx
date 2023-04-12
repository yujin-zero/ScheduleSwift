import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./Test.css"

const Test = () => {
    let navigate = useNavigate();

    return (
        <div className="main_container">
            <div className="header">

            </div>
            <div className="body">
                <div className="left">

                </div>
                <div className="right">
                    <Button 
                        name="시작화면" 
                        onClick={() => navigate('/start')} 
                    />
                    <Button 
                        name="Button2" 
                        onClick={() => navigate('/test2')} 
                    />
                    <Button 
                        name="Button3" 
                        onClick={() => navigate('/test2')} 
                    />
                    <Button 
                        name="Button4" 
                        onClick={() => navigate('/test2')} 
                    />
                    <Button 
                        name="Button5" 
                        onClick={() => navigate('/test2')} 
                    />
                </div>
            </div>

        </div>
    );
}

export default Test;
