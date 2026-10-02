import User from "./User";
import {Component} from "react";
import UserClass from "./UserClass";

class About extends Component {
  render() {
    return (
      <div>
        <h1>About Us</h1>
        <p>This is a food delivery app.</p>
        <UserClass name={"Miss Moon"} />
      </div>
    );
  }
}

export default About;