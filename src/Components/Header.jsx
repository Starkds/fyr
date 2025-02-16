//beta version

import React, { useState, useRef, useEffect } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";
import useGeoLocation from "../utils/geoLocation";
function Header() {
  

  const {  error, address,geoLocation } = useGeoLocation(); 
  


  return (
    <>
      <div className="w-full max-w-6xl h-28 z-10 absolute top-20 right-0 mt-0 bg-white flex justify-end items-center p-5 sm:px-6 sm:py-3 mx-auto">
        <div className="flex items-center gap-6 ">
        
          <div className="flex items-center border border-gray-300 rounded-md px-4 py-1 bg-gray-50">
            {" "}
           
            <h2 className="text-sm font-medium">My location</h2>
            <button
              onClick={geoLocation}
              className="flex items-center bg-stone-400 text-white rounded-full px-3 py-1 ml-4"
            >
              <FaLocationCrosshairs className="ml-1" />
            </button>
          
            {address && <p>Address : {address}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          <div className="relative flex items-center w-40 sm:w-48 md:w-64">
            <input
              type="search"
              id="default-search"
              className="block w-full p-1 pl-3 text-sm sm:text-base font-medium text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 md:p-2 md:pl-4"
              placeholder="    Locate home"
              required
            />
            <button
              type="button"
              className="absolute right-2 bottom-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-full text-xs sm:text-sm px-3 py-1 focus:ring-4 focus:ring-blue-300"
            >
              <FaSearchLocation />
            </button>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m-4.65-2.65A6.5 6.5 0 1112 5.5a6.5 6.5 0 010 13z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
