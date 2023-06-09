import { useEffect } from "react";
import { useFetchItemsContext } from "../../hooks/useFetchItemsContext";
import Footer from "../footer/Footer";
import AllItemsOnMainPage from "../../components/AllItemsOnMainPage";
import LeftSideBar from "../../components/LeftSideBar";

const Hamburger = () => {
  const { allItems, dispatcho } = useFetchItemsContext();

  const categoryItemToShow = allItems.slice(20, 30);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        "https://www.rrestaurantbk.shoponlinemarket.cloud/api/items/"
      );
      const json = await response.json();

      if (response.ok) {
        dispatcho({ type: "FETCHED-ALL", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatcho]);

  return (
    <>
      <div className="home-main-component">
        <LeftSideBar />
        <AllItemsOnMainPage props={categoryItemToShow} />
      </div>
      <Footer />
    </>
  );
};

export default Hamburger;
