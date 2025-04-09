// import React, { useState } from "react";

// import "./style.scss";

// import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
// import Img from "../../../components/lazyLoadImage/Img";
// import { PlayIcon } from "../Playbtn";

// const VideosSection = ({ data, loading }) => {
//     const loadingSkeleton = () => {
//         return (
//             <div className="skItem">
//                 <div className="thumb skeleton"></div>
//                 <div className="row skeleton"></div>
//                 <div className="row2 skeleton"></div>
//             </div>
//         );
//     };

//     return (
//         <div className="videosSection">
//             <ContentWrapper>
//                 <div className="sectionHeading">Official Videos</div>
//                 {!loading ? (
//                     <div className="videos">
//                         {data?.results?.map((video) => (
//                             <div
//                                 key={video.id}
//                                 className="videoItem"
//                             >
//                                 <div className="videoThumbnail">
//                                     <Img
//                                         src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
//                                     />
//                                     <PlayIcon />
//                                 </div>
//                                 <div className="videoTitle">{video.name}</div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <div className="videoSkeleton">
//                         {loadingSkeleton()}
//                         {loadingSkeleton()}
//                         {loadingSkeleton()}
//                         {loadingSkeleton()}
//                     </div>
//                 )}
//             </ContentWrapper>
//         </div>
//     );
// };

// export default VideosSection;

import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import { PlayIcon } from "../Playbtn";

const VideosCarousel = ({ data, loading }) => {
  const carouselContainer = useRef();

  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  return (
    <div className="videosSection">
      <ContentWrapper>
        <div className="sectionHeading">Official Videos</div>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="videosCarousel" ref={carouselContainer}>
            {data?.results?.map((video) => (
              <div key={video.id} className="videoItem">
                <div className="videoThumbnail">
                  <Img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <PlayIcon />
                </div>
                <div className="videoTitle">{video.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="videoSkeleton">
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
            {loadingSkeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default VideosCarousel;
