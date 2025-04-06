import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genreMap, setGenreMap] = useState({});
    const { query } = useParams();

    const fetchGenres = async () => {
        try {
            const movieGenres = await fetchDataFromApi("/genre/movie/list");
            const tvGenres = await fetchDataFromApi("/genre/tv/list");
            const allGenres = [...movieGenres.genres, ...tvGenres.genres];

            const map = {};
            allGenres.forEach((genre) => {
                map[genre.name.toLowerCase()] = genre.id;
            });
            setGenreMap(map);
        } catch (err) {
            console.error("Failed to fetch genres:", err);
        }
    };

    const isGenreSearch = () => {
        return genreMap.hasOwnProperty(query.toLowerCase());
    };

    const fetchInitialData = () => {
        setLoading(true);
        const genreId = genreMap[query.toLowerCase()];
        const endpoint = isGenreSearch()
            ? `/discover/movie?with_genres=${genreId}&page=1`
            : `/search/multi?query=${query}&page=1`;

        fetchDataFromApi(endpoint).then((res) => {
            setData(res);
            setPageNum(2);
            setLoading(false);
        });
    };

    const fetchNextPageData = () => {
        const genreId = genreMap[query.toLowerCase()];
        const endpoint = isGenreSearch()
            ? `/discover/movie?with_genres=${genreId}&page=${pageNum}`
            : `/search/multi?query=${query}&page=${pageNum}`;

        fetchDataFromApi(endpoint).then((res) => {
            if (data?.results) {
                setData({
                    ...data,
                    results: [...data?.results, ...res.results],
                });
            } else {
                setData(res);
            }
            setPageNum((prev) => prev + 1);
        });
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    useEffect(() => {
        setPageNum(1);
        if (Object.keys(genreMap).length > 0) {
            fetchInitialData();
        }
    }, [query, genreMap]);

    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {isGenreSearch()
                                    ? `Genre results for '${query}'`
                                    : `Search ${
                                          data?.total_results > 1
                                              ? "results"
                                              : "result"
                                      } of '${query}'`}
                            </div>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results.map((item, index) => {
                                    if (item.media_type === "person") return null;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry, Results not found!
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;
