import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

const Genres = ({ data }) => {
    const { genres } = useSelector((state) => state.home);

    if (!data || !genres) return null;

    return (
        <div className="genres">
            {data
                .filter((g) => genres[g] && genres[g].name)
                .map((g) => (
                    <div key={g} className="genre">
                        {genres[g].name}
                    </div>
                ))}
        </div>
    );
};

export default Genres;
