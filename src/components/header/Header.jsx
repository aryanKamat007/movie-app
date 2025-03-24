import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <header className={`header ${show}`}>
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
