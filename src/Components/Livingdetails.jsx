//beta version

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Livingdetails() {
  const [destinationCards, setDestinationCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCardClick = (houseid) => {
    navigate(`/PlaceInfo/${houseid}`); 
  };


  useEffect(() => {
    const fetchedCard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3453/house/showallhouses",{
            params:{
              limit:15

            }
          }
        );
        setDestinationCards(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching destination cards: ", error);
        setLoading(false);
      }
    };
    fetchedCard();
  }, []);

  return (
    <div className="flex justify-center">
      <div className="flex flex-row flex-wrap gap-14 mx-auto mt-28 w-full md:mx-auto lg:ml-auto lg:mr-0 md:w-3/4">
        {loading && <p>Loading...</p>}
        {!loading &&
          destinationCards.map((card, index) => (
          
              <div
              onClick={() => handleCardClick(card._id)}
                key={card.id || index}
                className="relative grid grid-cols-2 md:grid-cols-1 gap-4 w-full max-w-full sm:max-w-[16rem] md:max-w-[21rem] lg:max-w-[21rem] mx-auto rounded-xl bg-gray-100 bg-clip-border text-gray-700 shadow-lg"
              >
                <div className="relative mx-2 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
                  <img
                    className="h-40 w-full object-cover md:h-48 lg:h-60"
                    src={`http://localhost:3453${card.images[0]}`}
                    alt="ui/ux review check"
                  />
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
                  <button
                    className="absolute top-4 right-4 h-8 w-8 select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-red-500 transition-all hover:bg-red-500/10 active:bg-red-500/30"
                    type="button"
                  >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path>
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="block font-sans text-lg md:text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
                      {card.houseName}
                    </h5>
                    <p className="flex items-center gap-1 font-sans text-sm md:text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                      {card.price}
                    </p>
                  </div>

                  <p className="block font-sans text-sm md:text-base antialiased font-light leading-relaxed text-gray-700">
                    {card.description || "No description available"}
                  </p>
                  <div className="inline-flex flex-wrap items-center gap-2 mt-2 group"></div>
                </div>
                <div className="px-6 pb-2">
                 <Link to={`/PlaceInfo/${card.houseid}`}>
                  <button
                    onClick={handleCardClick}
                    className="block w-full select-none rounded-lg bg-gray-900 py-3.5 px-4 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20"
                    type="button"
                  >
                    Reserve
                  </button>
                  </Link>
                </div>
              </div>
            
          ))}
      </div>
    </div>
  );
}

export default Livingdetails;
