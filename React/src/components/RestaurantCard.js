
import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    sla,
  } = resData.info;

  return (
    <div className="res-card m-4 w-[260px] overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Restaurant Image */}
      <div className="relative overflow-hidden">
        <img
          className="res-logo w-full h-44 object-cover transition-transform duration-500 hover:scale-110"
          alt="restaurant logo"
          src={CDN_URL + cloudinaryImageId}
        />

        {/* Rating */}
        <span className="absolute bottom-3 left-3 bg-green-600 text-white text-sm font-bold px-2.5 py-1 rounded-lg shadow">
          ⭐ {avgRating}
        </span>
      </div>

      {/* Restaurant Details */}
      <div className="p-4">

        <h3 className="font-bold text-lg text-gray-800 truncate">
          {name}
        </h3>

        <h4 className="mt-1 text-sm text-gray-500 truncate">
          {cuisines.join(", ")}
        </h4>

        <div className="flex items-center justify-between mt-4">

          <h5 className="text-sm font-semibold text-gray-700">
            {costForTwo}
          </h5>

          <h6 className="text-sm text-gray-500">
            🛵 {sla.deliveryTime} mins
          </h6>

        </div>
      </div>
    </div>
  );
};

export const withPromtedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">

        {/* Promoted Badge */}
        <label className="absolute top-6 left-6 z-10 bg-black text-white px-3 py-1.5 text-xs font-semibold rounded-lg shadow-md">
          Promoted
        </label>

        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;




