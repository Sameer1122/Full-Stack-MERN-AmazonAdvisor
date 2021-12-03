import React, { useContext } from "react";
import { Carousel } from "react-responsive-carousel";

import AdContext from "../../store/ad-context";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Ads = () => {
  const adCtx = useContext(AdContext);
  return (
    <div className="overflow-hidden md:w-11/12 md:mx-auto justify-center flex md:justify-end py-4">
      {
        <Carousel
          autoPlay
          infiniteLoop
          showIndicators={false}
          width={400}
          interval={adCtx.adData.interval}
          showThumbs={false}
          showArrows={false}
          dynamicHeight={true}
        >
          {adCtx.adData.length >= 1 &&
            adCtx.adData.map((data) => {
              return (
                <div className="">
                  <img
                    className="object-contain h-32 md:h-picDetails"
                    alt=""
                    src={`http://localhost:5000/${data.img}`}
                    key={data.id}
                  />
                </div>
              );
            })}
        </Carousel>
      }
      {/* <Carousel>
        {adCtx.adData.length >= 1 &&
          adCtx.adData.map((data) => {
            return (
              <Carousel.Item interval={data.interval}>
                <img
                  className="d-block w-100"
                  src={`https://amazonadvisor2.herokuapp.com/${data.img}`}
                  alt="First slide"
                />
              </Carousel.Item>
            );
          })}
      </Carousel> */}
    </div>
  );
};

export default Ads;
