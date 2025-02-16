//beta version



import axios from "axios";
import React, { createElement, useState } from "react";
import { FaFilter } from "react-icons/fa";

function Sidebar() {
  const [newFacilities, setNewFacilities] = useState("");
  const [newRestrictions, setNewRestrictions] = useState("");
  const [showContent, setShowContent] = useState(true);
  const [mainContent, setMainContent] = useState(false);
  const [filteredHouse, setFilteredHouse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState({
    price: { min: "", max: "" },
    houseType: [],
    facilities: [],
    restrictions: [],
  });

  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePriceRange = () => {
    setFilter((prev) => ({
      ...prev,
      price: { ...prev.price, [key]: value },
    }));
  };

  const adddynamicitem = (key, value) => {
    if (value.trim() === "") return;
    if (!filter[key].includes(value)) {
      setFilter((prev) => ({
        ...prev,
        [key]: [...prev[key], value],
      }));
      key === "facilities" ? setNewFacilities("") : setNewRestrictions("");
    }
  };

  const removedynamicitem = (key, value) => {
    setFilter(
      (prev = {
        ...prev,
        [key]: prev[key].filter((item) => item !== value),
      })
    );
  };

  const toggleOpener = () => {
    setIsOpen(!isOpen);
  };

  const isCheck = (category, value) => {
    return filter[category].includes(value);
  };

  const applyfilter = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3453/filter/filteredhouse`,
        {
          ...filter,

          price: {
            min: filter.price.min || 0,
            max: filter.price.max || Number.MAX_SAFE_INTEGER,
          },
        }
      );

      setFilteredHouse(response.data);
      setShowContent(false);
      setMainContent(true);
      setIsOpen(false);
    } catch (error) {
      console.error("error in fetching filtered data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed top-20 left-4 z-40 md:hidden">
        <button
          onClick={toggleOpener}
          className="flex items-center text-gray-500 p-2 rounded-full focus:outline-none"
        >
          <span className="mr-1">Filter</span>
          <FaFilter size={16} />
        </button>
      </div>

      <div
        style={{ width: "calc(16rem + 7rem)" }}
        className={`fixed h-screen shadow-lg border-t-4 bg-white mb-10 rounded-b-lg rounded-t border-red-light transition-transform duration-300   md:translate-x-0`}
      >
        <div className="px-3 py-3 mt-12 mb-8 md:mt-10">
          {
            <div className="flex justify-between">
              <div className="uppercase tracking-wide text-c2 mb-4">
                <label>Min Price</label>
                <input
                  type="number"
                  placeholder="min Price"
                  className="border-2 border-solid border-black w-28 text-xs"
                  list="options"
                  name="minPrice"
                  value={filter.price.min}
                  onChange={(e) => handlePriceRange("min", e.target.value)}
                />
    <label> Max Price</label>
                <input
                  type="number"
                  placeholder="max Price"
                  className="border-2 border-solid border-black w-28 text-xs"
                  list="options"
                  name="maxPrice"
                  value={filter.price.max}
                  onChange={(e) => handlePriceRange("max", e.target.value)}
                />
              </div>
            </div>
          }

          {
            <div
              className="flex cursor-pointer border px-2 py-1 text-xs text-grey-darkest border-b-0"
              style={{ borderLeft: "4px solid #e2624b" }}
            >
              <div className="pl-2 gap-4 flex flex-col">
                <label className="font-semibold text-xs">House Required</label>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    name="rentalType"
                    checked={isCheck("houseType", "1 BHK")}
                    value="1 BHK"
                    onChange={(e) =>
                      handleFilterChange(
                        "houseType",
                        filter.houseType.includes(e.target.value)
                          ? filter.houseType.filter(
                              (type) => type !== e.target.value
                            )
                          : [...filter.houseType, e.target.value]
                      )
                    }
                  />
                  <label
                    className="border-solid border-black w-14 h-7 rounded-sm text-xs"
                    htmlFor="1room"
                  >
                    1 BHK
                  </label>
                  <input
                    type="checkbox"
                    name="houseType"
                    value="2 BHK"
                    checked={isCheck("houseType", "2 BHK")}
                    onChange={(e) =>
                      handleFilterChange(
                        "houseType",
                        filter.houseType.includes(e.target.value)
                          ? filter.houseType.filter(
                              (type) => type !== e.target.value
                            )
                          : [...filter.houseType, e.target.value]
                      )
                    }
                  />
                  <label
                    className="border-solid border-black w-14 h-7 rounded-sm text-xs"
                    htmlFor="2bhk"
                  >
                    2 BHK
                  </label>
                  <input
                    type="checkbox"
                    id="3 BHK"
                    name="houseType"
                    checked={isCheck("houseType", "3 BHK")}
                    value="3 BHK"
                    onChange={(e) =>
                      handleFilterChange(
                        "houseType",
                        filter.houseType.includes(e.target.value)
                          ? filter.houseType.filter(
                              (type) => type !== e.target.value
                            )
                          : [...filter.houseType, e.target.value]
                      )
                    }
                  />
                  <label
                    className="border-solid border-black w-14 h-7 rounded-sm text-xs"
                    htmlFor="3bhk"
                  >
                    3 BHK
                  </label>
                </div>
              </div>
            </div>
          }

          {/* Facilities Section */}
          {
            <div className="flex cursor-pointer border px-2 py-1 mt-2 text-xs text-grey-darkest border-b-0">
              <div className="pl-2">
                <label className="font-semibold text-xs">Facilities</label>
                {filter.facilities.map((facility, index) => (
                  <div key={index}>
                    <span>{facility}</span>
                    <button
                      onClick={() => removedynamicitem("facilities", facility)}
                    >
                      X
                    </button>
                  </div>
                ))}

                <div className="flex gap-2 flex-row">
                  <input
                    type="text"
                    placeholder="Add Facilities"
                    id="balcony"
                    name="facilities"
                    value={newFacilities}
                    onChange={(e) => {
                      setNewFacilities(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => adddynamicitem("facilities", newFacilities)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          }

          {/* Restrictions section */}
          {
            <div className="flex cursor-pointer border px-2 py-1 mt-2 text-xs text-grey-darkest border-b-0">
              <div className="pl-2">
                <label className="font-semibold text-xs">Restrictions</label>
                {filter.restrictions.map((restriction, index) => (
                  <div key={index}>
                    <span>{restriction}</span>
                    <button
                      onClick={() =>
                        removedynamicitem("restrictions", restriction)
                      }
                    >
                      X
                    </button>
                  </div>
                ))}

                <div className="flex gap-2 flex-row">
                  <input
                    type="text"
                    placeholder="Add Facilities"
                    id="balcony"
                    name="restrictions"
                    value={newRestrictions}
                    onChange={(e) => {
                      setNewRestrictions(e.target.value);
                    }}
                  />
                  <button
                    onClick={() =>
                      adddynamicitem("restrictions", newRestrictions)
                    }
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          }

          {
            <div className="flex cursor-pointer border px-2 py-1 mt-2 text-xs text-grey-darkest border-b-0">
              <div className="pl-2">
                <label className="font-semibold text-xs">No of persons</label>
                <div className="flex gap-2 flex-row">
                  <input
                    type="checkbox"
                    id="family"
                    name="persons"
                    value="Family"
                  />

                  <label
                    className="border-solid border-black w-14 h-7 rounded-sm text-xs"
                    htmlFor="family"
                  >
                    Family
                  </label>
                  <input type="checkbox" id="friends" name="persons" />
                  <label
                    className="border-solid border-black w-14 h-7 rounded-sm text-xs"
                    htmlFor="friends"
                  >
                    Friends
                  </label>
                </div>
              </div>
            </div>
          }

          {/* Apply Filter Button */}
          <div className="mt-4 text-center">
            <button
              onClick={applyfilter}
              className="bg-red-500 text-white px-4 py-2 rounded-md text-xs"
            >
              {loading ? "Applying..." : "Apply Filter"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;





