
import { useState, useEffect, useContext } from "react";
import RestaurantCard, { withPromtedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { RESTAURANT_LIST_API } from "../utils/constants";
import UserContext from "../utils/UserContext";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromtedLabel(RestaurantCard);

  const { loggedInUser, setUserName } = useContext(UserContext);

  // Check internet connection
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(RESTAURANT_LIST_API);
      const json = await data.json();

      // Find the card containing restaurants
      const restaurants =
        json?.data?.cards?.find(
          (c) =>
            c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setListOfRestaurants(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (err) {
      console.log("Fetch failed:", err);
    }
  };

  // If user is offline
  if (onlineStatus === false) {
    return (
      <h1>
        Looks like you're offline!! Please check your internet connection.
      </h1>
    );
  }

  // Show shimmer while restaurants are loading
  if (listOfRestaurants.length === 0) {
    return <Shimmer />;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Filter / Search Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-8 py-6 bg-white shadow-sm">

        {/* Search */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            data-testid="searchInput"
            placeholder="Search for restaurants..."
            className="w-72 px-4 py-3 border border-gray-300 rounded-xl
            outline-none focus:border-pink-500 focus:ring-2
            focus:ring-pink-100 transition"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className="px-6 py-3 bg-pink-500 text-white font-semibold
            rounded-xl shadow-sm hover:bg-pink-600
            hover:shadow-md transition-all duration-300"
            onClick={() => {
              const filtered = listOfRestaurants.filter((res) =>
                res.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );

              setFilteredRestaurant(filtered);
            }}
          >
            🔍 Search
          </button>
        </div>

        {/* Top Rated */}
        <button
          className="px-6 py-3 bg-white border border-pink-500
          text-pink-600 font-semibold rounded-xl
          hover:bg-pink-500 hover:text-white
          transition-all duration-300"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4
            );

            setFilteredRestaurant(filteredList);
          }}
        >
          ⭐ Top Rated Restaurants
        </button>

        {/* Username */}
        <div className="flex items-center gap-3">
          <label className="font-semibold text-gray-700">
            User:
          </label>

          <input
            className="w-40 px-4 py-2 border border-gray-300
            rounded-xl outline-none focus:border-pink-500
            focus:ring-2 focus:ring-pink-100 transition"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>

      {/* Restaurant Cards */}
      <div className="px-6 py-8">

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          🍴 Restaurants Near You
        </h2>

        <div className="flex flex-wrap justify-center gap-2">

          {filteredRestaurant.map((restaurant) => (
            <Link
              key={restaurant?.info.id}
              to={"/restaurants/" + restaurant?.info.id}
            >
              {restaurant?.info.promoted ? (
                <RestaurantCardPromoted resData={restaurant} />
              ) : (
                <RestaurantCard resData={restaurant} />
              )}
            </Link>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Body;


