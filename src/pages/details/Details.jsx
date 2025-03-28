import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";

const Details = () => {
    const { mediaType, id } = useParams();
    const { data: credits } = useFetch(`/${mediaType}/${id}/credits`);

    return (
        <div>
            <DetailsBanner crew={credits?.crew} />
        </div>
    );
};

export default Details;
