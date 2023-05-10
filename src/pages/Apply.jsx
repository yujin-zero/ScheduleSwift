import React from "react";
import { useNavigate } from "react-router-dom";
import "./Apply.css"

const Apply = () => {
    return (
        <div className="apply_root">
            <div className="apply_header">
            <img src="../dowadream.png"></img>
            </div>
            <div className="apply_body">
                <div className="apply_left">
                    <div className="apply_class">
                        <div className="apply_class_header">
                            <div id="apply_square"></div>
                            <h3>수강신청</h3>
                        </div>
                        <div className="apply_class_content">

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