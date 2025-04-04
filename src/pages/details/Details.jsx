import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";

const Details = () => {
    const { mediaType, id } = useParams();
    const { data: loading} = useFetch(`/${mediaType}/${id}/credits`);
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    );

    return (
        <div>
            <DetailsBanner crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditsLoading} />
        </div>
    );
};

export default Details;
