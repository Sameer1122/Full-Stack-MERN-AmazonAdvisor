import React from "react";
import { useLocation, useParams } from "react-router";

const Footer = () => {
  const location = useLocation();
  const params = useParams();
  return (
    <footer className="pt-4 bg-footer h-full">
      <div className="w-11/12 mx-auto">
        <div className="flex flex-col md:flex-row items-center lg:items-end md:justify-between">
          <div className="pb-4">
            <img src="/logo.png" className="objet-cover" alt="" />
          </div>
          <div className="flex items-center">
            <div className="lg:w-1/2">
              {location.pathname === "/" && (
                <img src="/boy2.png" className="object-contain mr-8" alt="" />
              )}
              {location.pathname === `/entry/${params.entryId}` && (
                <img src="/girl.png" className=" object-contain mr-8" alt="" />
              )}
            </div>

            <div className="md:pb-16 ">
              <h1 className="lg:text-xl font-bold font-lato text-white border-l-8 pl-8 border-orange">
                {location.pathname === `/` && (
                  <h1>LET'S PUT EVERYTHING INTO ONE WELL COMPOSED UI</h1>
                )}
                {location.pathname === `/entry/${params.entryId}` && (
                  <h1>THE THOUGHT TOUGH IS INTRIGUING</h1>
                )}
              </h1>
            </div>
          </div>
          <div className="flex p-4">
            <h1 className="text-white mx-auto md:text-xl lg:text-2xl font-lato font-semibol pb-8">
              www.amzsite.com
            </h1>
            <div className="flex justify-end items-center">
              <img src="/mouse.png" className="w-6 h-6" alt="" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
