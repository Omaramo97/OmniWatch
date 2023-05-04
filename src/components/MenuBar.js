import React, { useEffect, useState } from "react";
import "../styles/MenuBar.css";

const MenuBar = () => {
  const [show, setisShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setisShow(true);
      } else {
        setisShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", null);
    };
  }, []);
  return (
    <div className="MenuBar" style={{ background: show && "black" }}>
      <img
        src="/images/Omniwatch.png"
        alt="OmniWatch logo"
        className="MenuBar-logo"
      />
      <img
        src="/images/Peon_face_WC3.webp"
        alt="User logo"
        className="MenuBar-avatar"
      />
    </div>
  );
};
export default MenuBar;
