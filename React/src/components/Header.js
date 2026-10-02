import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";


const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
   // Subscribing to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items);
  //console.log(cartItems);


  return (
    <div className="flex justify-between items-center bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-pink-50 px-6 py-2">

      {/* Logo */}
      <div className="logo-container">
        <img
          className="w-48 hover:scale-105 transition-transform duration-300"
          src={LOGO_URL}
          alt="logo"
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center">
        <ul className="flex items-center gap-3 p-4">

          {/* Online Status */}
          <li className="px-4 text-base font-medium text-gray-700">
            {onlineStatus ? "🟢 Online" : "🔴 Offline"}
          </li>

          {/* Home */}
          <li>
            <Link
              to="/"
              className="px-5 py-3 text-xl font-semibold text-gray-700
              rounded-lg transition-all duration-300
              hover:text-pink-600 hover:bg-white hover:shadow-sm"
            >
              Home
            </Link>
          </li>

          {/* About */}
          <li>
            <Link
              to="/about"
              className="px-5 py-3 text-xl font-semibold text-gray-700
              rounded-lg transition-all duration-300
              hover:text-pink-600 hover:bg-white hover:shadow-sm"
            >
              About Us
            </Link>
          </li>

          {/* Contact */}
          <li>
            <Link
              to="/contact"
              className="px-5 py-3 text-xl font-semibold text-gray-700
              rounded-lg transition-all duration-300
              hover:text-pink-600 hover:bg-white hover:shadow-sm"
            >
              Contact Us
            </Link>
          </li>

          {/* Cart */}
          <li>
            <Link
              to="/cart"
              className="px-5 py-3 text-xl font-semibold text-gray-700
              rounded-lg transition-all duration-300
              hover:text-pink-600 hover:bg-white hover:shadow-sm"
            >
              🛒 Cart
            </Link>
          </li>

          {/* Login */}
          <li>
            <button
              className="px-6 py-2 text-lg font-semibold text-white
              bg-pink-500 rounded-full shadow-md
              hover:bg-pink-600 hover:scale-105
              transition-all duration-300"
              onClick={() => {
                btnNameReact === "Login"
                  ? setBtnNameReact("Logout")
                  : setBtnNameReact("Login");
              }}
            >
              {btnNameReact}
            </button>
          </li>

          {/* User */}
          <li className="px-4 text-lg font-bold text-gray-800">
            {loggedInUser}
          </li>

        </ul>
      </div>
    </div>
  );
};

export default Header;


