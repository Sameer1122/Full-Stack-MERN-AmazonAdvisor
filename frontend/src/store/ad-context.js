import React, { useState, useEffect, useCallback } from "react";
import instance from "../api/axios";

const AdContext = React.createContext({
  getAdData: () => {},
  adData: [],
});

export const AdContextProvider = (props) => {
  const [adData, setadData] = useState([]);
  const getAdData = useCallback(async () => {
    const req = await instance.get("/ads");
    setadData(req.data);
  }, []);
  useEffect(() => {
    getAdData();
  }, [getAdData]);
  return (
    <AdContext.Provider
      value={{
        adData: adData,
        getAdData: getAdData,
      }}
    >
      {props.children}
    </AdContext.Provider>
  );
};

export default AdContext;
