import { Link } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="left-side-bar">
      <div className="left-side-bar-categories">
        <p>Meals Categories: </p>
        <p>
          <Link
            to={"https://restaurant-online-frontend-production.up.railway.app/"}
          >
            All Meals
          </Link>
        </p>
        <p>
          <Link
            to={
              "https://restaurant-online-frontend-production.up.railway.app/pizza"
            }
          >
            Pizza
          </Link>
        </p>
        <p>
          <Link
            to={
              "https://restaurant-online-frontend-production.up.railway.app/pasta"
            }
          >
            Pasta
          </Link>
        </p>
        <p>
          <Link
            to={
              "https://restaurant-online-frontend-production.up.railway.app/hamburger"
            }
          >
            Hamburger
          </Link>
        </p>
        <p>
          <Link
            to={
              "https://restaurant-online-frontend-production.up.railway.app/chicken"
            }
          >
            Chicken
          </Link>
        </p>
      </div>

      <p></p>
      <div className="left-side-bar-branches">
        <div>Availability in our branches:</div>
        <p>Our Branches</p>
        <p>Branche one</p>
        <p>Branche two</p>
        <p>Branche three</p>
        <p>Branche four</p>
        <p>Branche five</p>
        <p>Branche six</p>
        <p>Branche seven</p>
        <p>Branche eight</p>
      </div>
    </div>
  );
};

export default LeftSideBar;
