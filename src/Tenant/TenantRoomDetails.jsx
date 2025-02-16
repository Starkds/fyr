//beta version

import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaLocationCrosshairs } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../utils/geoLocation";

function TenantRoomDetails() {
  const { error, address, geoLocation } = useGeoLocation();
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [facilitiesInput, setFacilitiesInput] = useState("");
  const [restrictionsInput, setRestrictionsInput] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectOptions, setSelectOption] = useState("");

  const [formData, setFormData] = useState({
    houseName: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    houseType: "",
    description: "",
    restrictions: [],
    facilities: [],
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectOption = (e) => {
    setFormData({
      ...formData,
      houseType: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const SelectedFiles = Array.from(e.target.files);
    setImages([...images, ...SelectedFiles]);
  };

  const handleVideoChange = (e) => {
    const SelectedFiles = Array.from(e.target.files);
    setVideos([...videos, ...SelectedFiles]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleRemoveVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  const handleAddRestriction = () => {
    if (restrictionsInput.trim()) {
      setRestrictions([...restrictions, restrictionsInput]);
      setRestrictionsInput("");
    }
  };

  const handleAddFacility = () => {
    if (facilitiesInput.trim()) {
      setFacilities([...facilities, facilitiesInput]);
      setFacilitiesInput("");
    }
  };

  useEffect(() => {
    if (address) {
      const [street, city, state, pincode] = address.split(", "); // Split address string (adjust based on format)
      setFormData((prevData) => ({
        ...prevData,
        street: street || "",
        city: city || "",
        state: state || "",
        pincode: pincode || "",
      }));
    }
  }, [address]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      restrictions,
      facilities,
    }));
  }, [restrictions, facilities]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("houseName", formData.houseName);
    data.append("street", formData.street);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("pincode", formData.pincode);
    data.append("price", formData.price);
    data.append("houseType", formData.houseType);
    data.append("description", formData.description);
  
    data.append("restrictions", JSON.stringify(formData.restrictions));
    data.append("facilities", JSON.stringify(formData.facilities));
    
    images.forEach((image) => {
      data.append("images", image); // Field name must match backend
    });
    
    // Append multiple videos
    videos.forEach((video) => {
      data.append("videos", video); // Field name must match backend
    });

    try {
      const response = await axios.post(`http://localhost:3453/house/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");

      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <div className="w-screen h-fit mt-24 mb-16 flex flex-col justify-center">
          <div className="flex items-center w-11/12 h-20 m-3 p-6 rounded-md border-2 border-gray-300 shadow-lg bg-white">
            <label className="flex w-80 flex-col text-2xl font-semibold leading-5 text-gray-800">
              HouseName
            </label>
            <input
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter your HouseName"
              type="text"
              name="houseName"
            />
          </div>

          <div className="flex items-center w-11/12 h-fit m-3 p-6 rounded-md border-2 border-gray-300 shadow-lg bg-white">
            <label className="flex w-80 flex-col text-2xl font-semibold leading-5 text-gray-800">
              Personal Address
            </label>
            <div className="grid grid-cols-4 gap-14">
              <h3>Use current location</h3>

              <button
                onClick={geoLocation}
                className="flex items-center bg-stone-400 text-white rounded-full px-3 py-1 ml-4"
              >
                <FaLocationCrosshairs className="ml-1" />
              </button>

              <br></br>
              {address && <p>Address : {address}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
              <h3>Or</h3>
              <input
                type="text"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                placeholder="enter Street"
                name="street"
              />
              <input
                type="text"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                placeholder="City"
                name="city"
              />
              <input
                type="text"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                placeholder="Enter state"
                name="state"
              />
              <input
                type="text"
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                placeholder="Pincode"
                name="pincode"
              />
            </div>
          </div>

          <div className="flex items-center w-11/12 h-20 m-3 p-6 rounded-md border-2 border-gray-300 shadow-lg bg-white">
            <label className="flex w-80 flex-col text-2xl font-semibold leading-5 text-gray-800">
              Description of house
            </label>
            <input
              type="text"
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter description of your house"
              name="description"
            />
          </div>

          <div className="flex items-center w-11/12 h-20 m-3 p-6 rounded-md border-2 border-gray-300 shadow-lg bg-white">
            <label className="flex w-80 flex-col text-2xl font-semibold leading-5 text-gray-800">
              Price of House
            </label>
            <input
              type="number"
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter price of house"
              name="price"
            />
          </div>

          <div className="flex items-center w-11/12 h-20 m-3 p-6 rounded-md border-2 border-gray-300 shadow-lg bg-white">
            <label className="flex w-80 flex-col text-2xl font-semibold leading-5 text-gray-800">
              House Type
            </label>

            <select
              value={formData.houseType}
              onChange={handleSelectOption}
              id="options"
            >
              <option value="1-BHK">1-BHK</option>
              <option value="2-BHK">2-BHK</option>
              <option value="3-BHK">3-BHK</option>
              <option value="4-BHK">4-BHK</option>
            </select>

            <div>
              <h3>{selectOptions}</h3>
            </div>
          </div>

          <div className="flex items-center w-11/12 h-fit m-3 p-6 rounded-md border-2 border-gray-300 shadow-lg bg-white">
            <label className="flex w-80 flex-col text-2xl font-semibold leading-5 text-gray-800">
              Restrictions
            </label>
            <input
              type="text"
              value={restrictionsInput}
              onChange={(e) => {
                setRestrictionsInput(e.target.value);
              }}
              placeholder="Enter restriction"
            />
            <button
              type="button"
              onClick={handleAddRestriction}
              className="w-40 h-10 p-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg flex items-center justify-center rounded-lg border-2 border-blue-700 transition-all duration-150 ease-in-out"
            >
              Add
            </button>

            <ul style={{ marginLeft: "20px" }}>
              {restrictions.map((restriction, index) => (
                <li key={index}>{restriction}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center w-11/12 h-fit m-3 p-6 rounded-md border-2 border-gray-300 shadow-lg bg-white">
            <label className="flex w-80 flex-col text-2xl font-semibold leading-5 text-gray-800  ">
              Facilities
            </label>

            <input
              type="text"
              value={facilitiesInput}
              onChange={(e) => {
                setFacilitiesInput(e.target.value);
              }}
              placeholder="Enter facilities"
            />
            <button
              type="button"
              onClick={handleAddFacility}
              className="w-40 h-10 p-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg flex items-center justify-center rounded-lg border-2 border-blue-700 transition-all duration-150 ease-in-out"
            >
              Add
            </button>

            <ul style={{ marginLeft: "20px" }}>
              {facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          </div>

          {/* Upload Images */}
          <div className="flex items-center w-11/12 h-fit m-3 p-6 rounded-md border-2 border-gray-300 shadow-lg bg-white">
            <label className="flex w-96 flex-col text-2xl font-semibold leading-5 text-gray-800">
              Upload Images of Your House
            </label>
            <input type="file" multiple onChange={handleImageChange} />

            <ul className="flex flex-wrap mt-3">
              {images.map((image, index) => (
                <li key={index}>
                  <p>{image.name}</p>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "5px",
                    }}
                  >
                    <RxCross2 />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center w-11/12 h-fit m-3 p-6 rounded-md border-2 border-gray-300 shadow-lg bg-white">
            <label className="flex w-96 flex-col text-2xl font-semibold leading-5 text-gray-800">
              Upload Videos of Your House
            </label>
            <input type="file" multiple onChange={handleVideoChange} />

            <ul className="flex flex-wrap mt-3">
              {videos.map((video, index) => (
                <li key={index}>
                  {" "}
                  <p>{video.name}</p>{" "}
                  <button
                    type="button"
                    onClick={() => handleRemoveVideo(index)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      padding: "5px",
                    }}
                  >
                    <RxCross2 />
                  </button>{" "}
                </li>
              ))}
            </ul>
          </div>

          {/* Submit Button */}
          <div className="w-screen flex justify-center">
            <button
              className="block w-1/2 select-none rounded-lg bg-green-600 hover:bg-green-700 py-3.5 px-20 text-center font-sans text-lg font-bold uppercase text-white shadow-md transition-all duration-150 ease-in-out"
              type="submit"
            >
              Submit All
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default TenantRoomDetails;
