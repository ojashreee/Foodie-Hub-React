import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
      },
    };
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/ojashreee");
    const json = await data.json();

    this.setState({
      userInfo: json,
    });
  }

  render() {
    const { name, location, avatar_url, bio } = this.state.userInfo;

    return (
      <div className="user-card max-w-md mx-auto my-10 p-8 bg-white rounded-3xl shadow-xl text-center border border-gray-100">
        <img
          src={avatar_url}
          alt={name}
          className="w-40 h-40 rounded-full object-cover mx-auto mb-6 border-4 border-orange-400 shadow-lg"
        />

        <h2 className="text-3xl font-bold text-gray-800">
          {name}
        </h2>

        <h3 className="text-lg text-gray-500 mt-1">
          📍 {location || "Location not set"}
        </h3>

        {bio && (
          <p className="text-gray-600 mt-4 italic">
            {bio}
          </p>
        )}
      </div>
    );
  }
}

export default UserClass;


/****
 *
 * --- MOUNTING ----
 *
 * Constructor (dummy)
 * Render (dummy)
 *      <HTML Dummy >
 * Component Did MOunt
 *      <API Call>
 *      <this.setState> -> State variable is updated
 *
 * ---- UPDATE
 *
 *      render(APi data)
 *      <HTML (new API data>)
 *      ccomponentDid Update
 *
 *
 *
 *
 */