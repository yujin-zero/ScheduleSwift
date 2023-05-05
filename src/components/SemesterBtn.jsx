import React from "react";
import { Link } from "react-router-dom";

import SidebarItem from "./SidebarItem";

function SemesterBtn() {

  const menus = [
    { name: "1학년 1학기", path: "/" },
    { name: "1학년 2학기", path: "/1-2" },
    { name: "2학년 1학기", path: "/2-1" },
    { name: "2학년 2학기", path: "/2-2" },
    { name: "3학년 1학기", path: "/3-1" },
    { name: "3학년 2학기", path: "/3-2" },
    { name: "4학년 1학기", path: "/4-1" },
    { name: "4학년 2학기", path: "/4-2" },
  ];

  return (
    <div className="sidebar">
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index}>
            <SidebarItem
              menu={menu}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default SemesterBtn;