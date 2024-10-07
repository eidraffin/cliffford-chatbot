import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="homepage">
      <div className="left">
        <h2>Hello, This is Cliffford...</h2>
        <p>Cliffford like thinking, only better</p>
        <Link to="/dashboard">Let's talk</Link>
      </div>
    </div>
  );
};

export default Home;