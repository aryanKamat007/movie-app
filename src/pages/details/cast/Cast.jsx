// // Cast component to display top cast members of a movies

// import React from "react";
// import { useSelector } from "react-redux";

// import "./style.scss";

// import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
// import Img from "../../../components/lazyLoadImage/Img";
// import avatar from "../../../assets/avatar.png";

// const Cast = ({ data, loading }) => {
//   const { url } = useSelector((state) => state.home);

//   const skeleton = () => {
//     return (
//       <div className="skItem">
//         <div className="circle skeleton"></div>
//         <div className="row skeleton"></div>
//         <div className="row2 skeleton"></div>
//       </div>
//     );
//   };
//   return (
//     <div className="castSection">
//       <ContentWrapper>
//         <div className="sectionHeading">Top Cast</div>
//         {!loading ? (
//           <div className="listItems">
//             {data?.map((item) => {
//               let imgUrl = item.profile_path
//                 ? url.profile + item.profile_path
//                 : avatar;
//               return (
//                 <div key={item.id} className="listItem">
//                   <div className="profileImg">
//                     <Img src={imgUrl} />
//                   </div>
//                   <div className="name">{item.name}</div>
//                   <div className="character">
//                     {item.character}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <div className="castSkeleton">
//             {skeleton()}
//             {skeleton()}
//             {skeleton()}
//             {skeleton()}
//             {skeleton()}
//             {skeleton()}
//           </div>
//         )}
//       </ContentWrapper>
//     </div>
//   );
// };

// export default Cast;


import React, { useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import PlaceholderImage from "../../../assets/avatar.png";

import "./style.scss";

const CastCarousel = ({ data, loading }) => {
  const carouselContainer = useRef();
  const { url } = useSelector((state) => state.home);

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

  return (
    <div className="carousel">
      <ContentWrapper>
        <div className="carouselTitle">Cast</div>
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((cast) => {
              const profileUrl = cast.profile_path
                ? url.profile + cast.profile_path
                : PlaceholderImage;
              return (
                <div key={cast.id} className="carouselItem">
                  <div className="posterBlock">
                    <Img src={profileUrl} className="circularImage" />
                  </div>
                  <div className="textBlock">
                    <span className="title">{cast.name}</span>
                    <span className="date">{cast.character}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            <div className="skeletonItem"></div>
            <div className="skeletonItem"></div>
            <div className="skeletonItem"></div>
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default CastCarousel;
