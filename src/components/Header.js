import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HelpIcon from '@mui/icons-material/Help';
import ForumIcon from '@mui/icons-material/Forum';
import SearchIcon from '@mui/icons-material/Search';
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
    <div className="header ">
      {user.isLoggedIn ? (
        <nav>
          <NavLink to="/">
            <Logo />
          </NavLink>

          <div className="mid">
            <div className="search">
              <SearchIcon sx={{fontSize:30 }}  color="action" />
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
            <Link
              
              to="/mytools"
            >
             

              <Inventory2Icon sx={{ fontSize: 30 }} />
              {/* My Tools */}
            </Link>

           
            <Link to="/addProduct" className="">
              <AddCircleIcon sx={{ fontSize: 30 }}  />
              {/* Add Product */}{" "}
            </Link>

            <Link to="/queries">
              {" "}
              <HelpIcon sx={{ fontSize: 30 }}/>
              {/* Queries */}{" "}
            </Link>

            <Link to="/requests">
              {" "}
              <ForumIcon  sx={{ fontSize: 30 }}/>
              
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
            <SearchIcon sx={{fontSize:30 }}  color="action" />


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
            Login
          </Link>
        </>
      )}
    </div>
  );
}
