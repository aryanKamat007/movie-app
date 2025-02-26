import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <header className="header">
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}> 
                    <img src={logo} alt="Movix Logo" />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigate("/explore/movie")}>Movies</li>
                    <li className="menuItem" onClick={() => navigate("/explore/tv")}>TV Shows</li>
                    <li className="menuItem">
                        <HiOutlineSearch />
                    </li>
                </ul>
            </ContentWrapper>
        </header>
    );
};

export default Header;
