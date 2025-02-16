// //beta version

// import React, { useEffect, useState } from "react";
// import { LuChevronLeft, LuChevronRight, LuIndianRupee } from "react-icons/lu";
// import { FaWifi } from "react-icons/fa";
// import { MdWifiOff } from "react-icons/md";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// function PlaceInfo() {
//   const [cardDetails, setCardDetails] = useState(null);
//   const { houseid } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//   useEffect(() => {
//     const fetchedDetailed = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3453/house/${houseid}`
//         );
//         console.log(response);
//         setCardDetails(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error fetching data:", error);
//         setError("Failed to fetch data. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchedDetailed();
//   }, [houseid]);

//   if (loading) {
//     return <p>loading...</p>;
//   }

//   if (!cardDetails) {
//     return <p>Failed to load data. please try again later</p>;
//   }

//   const images = `http://localhost:3453/uploads/${cardDetails.images}`
//   const videos =`http://localhost:3453/uploads/${cardDetails.videos}`


//   const handleLeftClickForVideo = () => {
//     setCurrentVideoIndex(
//       (currentVideoIndex - 1 + cardDetails.videos.length) % cardDetails.videos.length
//     );
//   };

//   const handleRightClickForVideo = () => {
//     setCurrentVideoIndex((currentVideoIndex + 1) % cardDetails.videos.length);
//   };

//   const handleLeftClickForImage = () => {
//     setCurrentImageIndex(
//       (currentImageIndex - 1 + cardDetails.images.length) % cardDetails.images.length
//     );
//   };

//   const handleRightClickForImage = () => {
//     setCurrentImageIndex((currentImageIndex + 1) % cardDetails.images.length);
//   };

//   return (
//     <>
//       <div className="mt-14 border-2 border-solid border-gray-800">
//         <div      className="flex justify-center h-screen w-full"
//           style={{ height: "75vh" }}
//         >
//           <div className="relative w-full h-full">
//             <button
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
//               onClick={handleLeftClickForImage}
//             >
//               <LuChevronLeft />
//             </button>
//             <button
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
//               onClick={handleRightClickForImage}
//             >
//               <LuChevronRight />
//             </button>

//             {cardDetails.images.map((image, index) => (
//               <img
//                 key={index}
//                 src={`http://localhost:3453${image}`}
//                 alt={`Image ${index + 1}`}
//                 className="w-full h-full object-cover"
//               />
//             ))}
//           </div>

      
//         </div>
//       </div>
   

//       <div className="mt-14 border-2 border-solid border-gray-800">
//         <div      className="flex justify-center h-screen w-full"
//           style={{ height: "75vh" }}
//         >   
//           <div className="relative w-full h-full">
//             <button
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
//               onClick={handleLeftClickForVideo}
//             >
//               <LuChevronLeft />
//             </button>
//             <button
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
//               onClick={handleRightClickForVideo}
//             >
//               <LuChevronRight />
//             </button>

//             {cardDetails.videos.map((video, index) => (
//               <video key={index} controls>
//                 <source src={`http://localhost:3453${video}`} type="video/mp4" />
//               </video>
//             ))}
//           </div>
//         </div>
//       </div>
       
//       <div className="flex flex-col lg:flex-row w-screen h-fit gap-4">
//         <div className="w-full lg:w-3/5 h-fit mt-10 m-auto">
//           <div className="flex justify-between mx-auto w-11/12 items-center">
//             <div className="flex flex-col">
//               <p className="text-4xl font-semibold my-3">
//                 {cardDetails.houseName}
//               </p>
//               <p className="text-2xl font-medium">
//                 {cardDetails.personalAddress}
//               </p>
//             </div>
//           </div>

//           <div className="w-11/12 h-fit p-1 mt-5 m-auto">
//             <h1 className="text-2xl font-semibold my-2">Facilities</h1>
//             <ul className="flex flex-wrap gap-3">
//               {cardDetails.facilities.map((facility, index) => (
//                 <li
//                   key={index}
//                   className="border-2 border-slate-400 w-fit flex items-center gap-3 justify-between p-1 bg-zinc-200 border-solid rounded-lg"
//                 >
//                   {facility}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="w-11/12 h-fit p-1 mt-5 m-auto">
//             <h1 className="text-2xl font-semibold my-2">Restrictions</h1>
//             <ul className="flex flex-wrap gap-3">
//               {cardDetails.restrictions.map((restriction, index) => (
//                 <li
//                   key={index}
//                   className="border-2 border-slate-400 w-fit flex items-center gap-3 justify-between p-1 bg-zinc-200 border-solid rounded-lg"
//                 >
//                   {restriction}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="w-full lg:w-1/3 h-fit border-2 mt-10 m-auto border-solid border-black">
//           <h1 className="flex text-3xl font-bold text-stone-500 items-center justify-center">
//             <LuIndianRupee /> {cardDetails.price}
//           </h1>
//           <div className="flex justify-center items-end mb-5">
//             <button
//               className="block w-3/5 select-none rounded-lg bg-gray-900 py-3.5 px-20 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
//               type="button"
//             >
//               Continue to book
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PlaceInfo;



//import React, { useEffect, useState } from "react";
// import { LuChevronLeft, LuChevronRight, LuIndianRupee } from "react-icons/lu";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// function PlaceInfo() {
//   const [cardDetails, setCardDetails] = useState(null);
//   const { houseid } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

//   useEffect(() => {
//     const fetchDetailed = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3453/house/${houseid}`);
//         setCardDetails(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error fetching data:", error);
//         setError("Failed to fetch data. Please try again later.");
//         setLoading(false);
//       }
//     };

//     fetchDetailed();
//   }, [houseid]);

//   if (loading) return <p>Loading...</p>;
//   if (error || !cardDetails) return <p>Failed to load data. Please try again later.</p>;

//   // Image Navigation Handlers
//   const handleLeftClickForImage = () => {
//     setCurrentImageIndex((prevIndex) => 
//       (prevIndex - 1 + cardDetails.images.length) % cardDetails.images.length
//     );
//   };

//   const handleRightClickForImage = () => {
//     setCurrentImageIndex((prevIndex) => 
//       (prevIndex + 1) % cardDetails.images.length
//     );
//   };

//   // Video Navigation Handlers
//   const handleLeftClickForVideo = () => {
//     setCurrentVideoIndex((prevIndex) =>
//       (prevIndex - 1 + cardDetails.videos.length) % cardDetails.videos.length
//     );
//   };

//   const handleRightClickForVideo = () => {
//     setCurrentVideoIndex((prevIndex) =>
//       (prevIndex + 1) % cardDetails.videos.length
//     );
//   };

//   return (
//     <>
//       {/* Image Section */}
//       <div className="mt-14 border-2 border-solid border-gray-800">
//         <div className="flex justify-center h-screen w-full" style={{ height: "75vh" }}>
//           <div className="relative w-full h-full">
//             {/* Left and Right Buttons */}
//             <button
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
//               onClick={handleLeftClickForImage}
//             >
//               <LuChevronLeft />
//             </button>
//             <button
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
//               onClick={handleRightClickForImage}
//             >
//               <LuChevronRight />
//             </button>
//             {/* Display Current Image */}
//             <img
//               src={`http://localhost:3453${cardDetails.images[currentImageIndex]}`}
//               alt={`Image ${currentImageIndex + 1}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Video Section */}
//       <div className="mt-14 border-2 border-solid border-gray-800">
//         <div className="flex justify-center h-screen w-full" style={{ height: "75vh" }}>
//           <div className="relative w-full h-full">
//             {/* Left and Right Buttons */}
//             <button
//               className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
//               onClick={handleLeftClickForVideo}
//             >
//               <LuChevronLeft />
//             </button>
//             <button
//               className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
//               onClick={handleRightClickForVideo}
//             >
//               <LuChevronRight />
//             </button>
//             {/* Display Current Video */}
//             <video key={currentVideoIndex} controls className="w-full h-full object-cover">
//               <source
//                 src={`http://localhost:3453${cardDetails.videos[currentVideoIndex]}`}
//                 type="video/mp4"
//               />
//             </video>
//           </div>
//         </div>
//       </div>

//       {/* Other Details */}
//       <div className="flex flex-col lg:flex-row w-screen h-fit gap-4">
//         <div className="w-full lg:w-3/5 h-fit mt-10 m-auto">
//           <div className="flex justify-between mx-auto w-11/12 items-center">
//             <div className="flex flex-col">
//               <p className="text-4xl font-semibold my-3">{cardDetails.houseName}</p>
//               <p className="text-2xl font-medium">{cardDetails.personalAddress}</p>
//             </div>
//           </div>

//           {/* Facilities */}
//           <div className="w-11/12 h-fit p-1 mt-5 m-auto">
//             <h1 className="text-2xl font-semibold my-2">Facilities</h1>
//             <ul className="flex flex-wrap gap-3">
//               {cardDetails.facilities.map((facility, index) => (
//                 <li key={index} className="border-2 border-slate-400 w-fit flex items-center gap-3 justify-between p-1 bg-zinc-200 border-solid rounded-lg">
//                   {facility}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Restrictions */}
//           <div className="w-11/12 h-fit p-1 mt-5 m-auto">
//             <h1 className="text-2xl font-semibold my-2">Restrictions</h1>
//             <ul className="flex flex-wrap gap-3">
//               {cardDetails.restrictions.map((restriction, index) => (
//                 <li key={index} className="border-2 border-slate-400 w-fit flex items-center gap-3 justify-between p-1 bg-zinc-200 border-solid rounded-lg">
//                   {restriction}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Price Section */}
//         <div className="w-full lg:w-1/3 h-fit border-2 mt-10 m-auto border-solid border-black">
//           <h1 className="flex text-3xl font-bold text-stone-500 items-center justify-center">
//             <LuIndianRupee /> {cardDetails.price}
//           </h1>
//           <div className="flex justify-center items-end mb-5">
//             <button className="block w-3/5 rounded-lg bg-gray-900 py-3.5 text-white text-sm font-bold uppercase">
//               Continue to book
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default PlaceInfo;

import React, { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight, LuIndianRupee } from "react-icons/lu";
import axios from "axios";
import { useParams } from "react-router-dom";

function PlaceInfo() {
  
  const [cardDetails, setCardDetails] = useState(null);
  const { houseid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false); // Track video play state
  const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
  useEffect(() => {
    const fetchedDetailed = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3453/house/${houseid}`
        );
        console.log(response);
        setCardDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    };


    fetchedDetailed();
  }, [houseid]);


  const PaymentHandler = async () =>{
    try {
        const amount = cardDetails.price;
       

        const response = await axios.post(`http://localhost:3453/payment/order`,{amount , houseId:houseid},
          {
            headers:{
              "Content-Type": "application/json", // Ensures the server interprets the request body as JSON
            }
            }
        );

        const {razorpayOrderId }= response.data;


        const options  ={
          key:razorpayKeyId,
          amount :amount*100,
          currency:"INR",
          order_id:razorpayOrderId,
          name:"Find Your Room",
          description:"House Booking",
          handle: function(response){
            console.log(response);
            alert("Payment Successful");
          },
          prefill: {
            name: "Customer Name",  // You can fill these with user data if available
            email: "customer@example.com",
            contact: "+91XXXXXXXXXX",
          },
          notes: {
            address: "Booking Address",
            houseId: houseid,
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    } catch (error) {
      console.error("Error initializing payment: ",error.message);
      alert("Error initializing payment, please try again");
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleVideoCanPlay = () => {
    setVideoLoaded(true);
  };

  const handleVideoPlay = () => {
    setVideoPlaying(true); // Mark the video as playing when the play button is clicked
  };

  const handleLeftClickForImage = () => {
    setImageLoaded(false); // Reset image load state
    setCurrentImageIndex(
      (currentImageIndex - 1 + cardDetails.images.length) % cardDetails.images.length
    );
  };

  const handleRightClickForImage = () => {
    setImageLoaded(false); // Reset image load state
    setCurrentImageIndex((currentImageIndex + 1) % cardDetails.images.length);
  };

  const handleLeftClickForVideo = () => {
    setVideoPlaying(false); // Stop video from playing when switching
    setVideoLoaded(false); // Reset video load state
    setCurrentVideoIndex(
      (currentVideoIndex - 1 + cardDetails.videos.length) % cardDetails.videos.length
    );
  };

  const handleRightClickForVideo = () => {
    setVideoPlaying(false); // Stop video from playing when switching
    setVideoLoaded(false); // Reset video load state
    setCurrentVideoIndex((currentVideoIndex + 1) % cardDetails.videos.length);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!cardDetails) {
    return <p>Failed to load data. Please try again later.</p>;
  }

  return (
    <>
      {/* Image Section */}
      <div className="mt-14 border-2 border-solid border-gray-800">
        <div className="flex justify-center h-screen w-full" style={{ height: "75vh" }}>
          <div className="relative w-full h-full">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
              onClick={handleLeftClickForImage}
            >
              <LuChevronLeft />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
              onClick={handleRightClickForImage}
            >
              <LuChevronRight />
            </button>

            <img
              key={currentImageIndex}
              src={`http://localhost:3453${cardDetails.images[currentImageIndex]}`}
              alt={`Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              onLoad={handleImageLoad}
            />
            {!imageLoaded && <div className="absolute inset-0 bg-gray-800 opacity-50 flex items-center justify-center">Loading...</div>}
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="mt-14 border-2 border-solid border-gray-800">
        <div className="flex justify-center h-screen w-full" style={{ height: "75vh" }}>
          <div className="relative w-full h-full">
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
              onClick={handleLeftClickForVideo}
            >
              <LuChevronLeft />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-md"
              onClick={handleRightClickForVideo}
            >
              <LuChevronRight />
            </button>

            <video
              key={currentVideoIndex}
              controls
              autoPlay={false} // Prevent auto-play
              className="w-full h-full object-cover"
              onCanPlay={handleVideoCanPlay}
              onPlay={handleVideoPlay} // Mark video as playing when it starts
            >
              <source
                src={`http://localhost:3453${cardDetails.videos[currentVideoIndex]}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            {!videoLoaded && <div className="absolute inset-0 bg-gray-800 opacity-50 flex items-center justify-center">Loading...</div>}
          </div>
        </div>
      </div>

      {/* Other Details Section */}
      <div className="flex flex-col lg:flex-row w-screen h-fit gap-4">
        <div className="w-full lg:w-3/5 h-fit mt-10 m-auto">
          <div className="flex justify-between mx-auto w-11/12 items-center">
            <div className="flex flex-col">
              <p className="text-4xl font-semibold my-3">{cardDetails.houseName}</p>
              <p className="text-2xl font-medium">{cardDetails.personalAddress}</p>
            </div>
          </div>

          <div className="w-11/12 h-fit p-1 mt-5 m-auto">
            <h1 className="text-2xl font-semibold my-2">Facilities</h1>
            <ul className="flex flex-wrap gap-3">
              {cardDetails.facilities.map((facility, index) => (
                <li
                  key={index}
                  className="border-2 border-slate-400 w-fit flex items-center gap-3 justify-between p-1 bg-zinc-200 border-solid rounded-lg"
                >
                  {facility}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-11/12 h-fit p-1 mt-5 m-auto">
            <h1 className="text-2xl font-semibold my-2">Restrictions</h1>
            <ul className="flex flex-wrap gap-3">
              {cardDetails.restrictions.map((restriction, index) => (
                <li
                  key={index}
                  className="border-2 border-slate-400 w-fit flex items-center gap-3 justify-between p-1 bg-zinc-200 border-solid rounded-lg"
                >
                  {restriction}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full lg:w-1/3 h-fit border-2 mt-10 m-auto border-solid border-black">
          <h1 className="flex text-3xl font-bold text-stone-500 items-center justify-center">
            <LuIndianRupee /> {cardDetails.price}
          </h1>
          <div className="flex justify-center items-end mb-5">
            <button
              onClick={PaymentHandler}
              className="block w-3/5 select-none rounded-lg bg-gray-900 py-3.5 px-20 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Continue to book
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaceInfo;
