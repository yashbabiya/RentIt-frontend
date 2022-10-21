import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Header() {
  const user = useSelector((state) => state.auth);

  const [bgcolor, setBgcolor] = useState("black");
  const [textcolor, setTextcolor] = useState("white");

  const [keyword, setKeyWord] = useState("");
  const navigate = useNavigate();
  function handleHighlightTab() {
    setBgcolor("white");
    setTextcolor("black");

    console.log("here");
  }

  useEffect(() => {
    console.log("header mounted");
  }, []);

  return (
    <div className="header padd">
      {user.isLoggedIn ? (
        <nav>
          <NavLink to="/">
            <Logo />
          </NavLink>

          <div className="mid">
            <div className="search">
              <i className="im im-magnifier"></i>
              <input
                type="text"
                placeholder="Search ..."
                value={keyword}
                onChange={(e) => setKeyWord(e.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    // searchProducts()
                    navigate(`/explore?keyword=${keyword}`);
                  }
                }}
              />

              {/* <h2>Explore</h2> */}
            </div>
          </div>

          {/* <Link to="/explore">Explore</Link> */}

          <div className="actions">
            <NavLink
              activeStyle={{ color: "black", background: "red" }}
              isActive={(match, location) => {
                if (!match) {
                  return false;
                }

                // only consider an event active if its event id is an odd number
                const eventID = parseInt(match.params.eventID);
                return !isNaN(eventID) && eventID % 2 === 1;
              }}
              to="/mytools"
            >
             

              <i className="im im-cube"></i>
              {/* My Tools */}
            </NavLink>

           
            <Link to="/addProduct" className="">
              <i className="im im-plus-circle"></i>
              {/* Add Product */}{" "}
            </Link>

            <Link to="/queries">
              {" "}
              <i
                className="im im-question

"
              ></i>
              {/* Queries */}{" "}
            </Link>

            <Link to="/queries">
              {" "}
              <i
                className="im im-newsletter

"
              ></i>
              {/* Request */}{" "}
            </Link>

            <Link to="/editProfile">
              <img src={user.avatar} className="profile" alt="" />
            </Link>
          </div>
        </nav>
      ) : (
        <>
          <Link to="/">
            <Logo />
          </Link>
          <div className="mid">
            <div className="search">
              <i className="im im-magnifier"></i>

              <input
                type="text"
                placeholder="Search ..."
                value={keyword}
                onChange={(e) => setKeyWord(e.target.value)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    // searchProducts()
                    navigate(`/explore?keyword=${keyword}`);
                  }
                }}
              />
            </div>
          </div>
          <Link to="/login" className="blue">
            {/* <i className="im im-user-circle"></i> */}
            Login
          </Link>
        </>
      )}
    </div>
  );
}
