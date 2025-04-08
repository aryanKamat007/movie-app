import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import { PlayIcon } from "../Playbtn.jsx";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import PosterFallback from "../../../assets/no-poster.png";

const providerDomains = {
  Netflix: "netflix.com",
  "Amazon Prime Video": "primevideo.com",
  "Disney Plus": "hotstar.com",         
  JioCinema: "jiocinema.com",
  ZEE5: "zee5.com",
  "Sony Liv": "sonyliv.com",
  "Apple TV+": "tv.apple.com",
};

const getProviderSearchUrl = (providerName, title) => {
  const domain = providerDomains[providerName];
  if (!domain) return "#";
  return `https://www.google.com/search?q=${encodeURIComponent(
    title
  )}+site:${domain}`;
};

const DetailsBanner = ({ crew }) => {
  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);
  const { data: videos } = useFetch(`/${mediaType}/${id}/videos`);
  console.log("Fetched videos:", videos?.results);
  

  const { data: watchProvidersData } = useFetch(
    `/${mediaType}/${id}/watch/providers`
  );

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g.id);

  const director = crew?.filter((f) => f.job === "Director");
  const writer = crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );

  const creators =
    mediaType === "tv" && data?.created_by?.length > 0
      ? data.created_by
      : [];

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const trailer =
    videos?.results?.find(
      (v) =>
        v.type === "Trailer" &&
        v.site === "YouTube" &&
        v.name.toLowerCase().includes("official")
    ) ||
    videos?.results?.find(
      (v) => v.type === "Trailer" && v.site === "YouTube"
    ) ||
    videos?.results?.find((v) => v.type === "Teaser" && v.site === "YouTube");

    console.log("Selected trailer:", trailer);

  const country = "IN"; 
  const providers = watchProvidersData?.results?.[country]?.flatrate || [];

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data.name || data.title} (${dayjs(
                        data?.release_date || data?.first_air_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data.vote_average.toFixed(1)} />

                      {trailer && (
                        <div
                          className="playbtn"
                          onClick={() => {
                            setVideoId(trailer.key);
                            setShow(true);
                          }}
                        >
                          <PlayIcon />
                          <span className="text">Watch Trailer</span>
                        </div>
                      )}
                    </div>
                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data.overview}</div>
                    </div>
                    <div className="info">
                      {data.status && (
                        <div className="infoItem">
                          <span className="text bold">Status: </span>
                          <span className="text">{data.status}</span>
                        </div>
                      )}
                      {(data.release_date || data.first_air_date) && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(
                              data.release_date || data.first_air_date
                            ).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.runtime || data.episode_run_time?.[0] ? (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">
                            {toHoursAndMinutes(
                              data.runtime || data.episode_run_time?.[0]
                            )}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    {(director?.length > 0 || creators.length > 0) && (
                      <div className="info">
                        <span className="text bold">
                          {mediaType === "tv" ? "Creator: " : "Director: "}
                        </span>
                        <span className="text">
                          {(mediaType === "tv" ? creators : director).map(
                            (d, i) => (
                              <span key={i}>
                                {d.name}
                                {(mediaType === "tv"
                                  ? creators
                                  : director
                                ).length -
                                  1 !==
                                  i && ", "}
                              </span>
                            )
                          )}
                        </span>
                      </div>
                    )}

                    {writer?.length > 0 && (
                      <div className="info">
                        <span className="text bold">Writer: </span>
                        <span className="text">
                          {writer.map((d, i) => (
                            <span key={i}>
                              {d.name}
                              {writer.length - 1 !== i && ", "}
                            </span>
                          ))}
                        </span>
                      </div>
                    )}
                    {providers.length > 0 && (
                    <div className="info">
                        <span className="text bold">Available On: </span>
                        <div className="watch-providers">
                        {providers.map((provider, i) => {
                            console.log("TMDb provider name:", provider.provider_name);
                            return (
                            <a
                                key={i}
                                className="provider"
                                href={getProviderSearchUrl(
                                provider.provider_name,
                                data.title || data.name
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Img
                                src={
                                    provider.logo_path
                                    ? `https://image.tmdb.org/t/p/w500${provider.logo_path}`
                                    : PosterFallback
                                }
                                alt={provider.provider_name}
                                />
                                <span>{provider.provider_name}</span>
                            </a>
                            );
                        })}
                        </div>
                    </div>
                    )}
                  </div>
                </div>
                <VideoPopup
                  show={show}
                  setShow={setShow}
                  videoId={videoId}
                  setVideoId={setVideoId}
                />
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
