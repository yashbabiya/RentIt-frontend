import React from "react";
import Logo from "./Logo";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Footer() {
  const user = useSelector((state) => state.auth);

  return (
    <div className="padd footer">

      <div className="top flex-bet">

      
      <div className="left">
        <Logo />
      </div>
      <div className="mid">
      <div className="bottom flex">
      © All rights are reserved 2022-23
      </div>
      </div>
      <div className="end ">


        <i className="im im-twitter"></i>
        <i className="im im-instagram"></i>
        <i className="im im-mail"></i>
      </div>

      </div>

      
    </div>
  );
}
