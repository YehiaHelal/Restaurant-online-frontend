import { useEffect } from "react";
import AllItemsOnMainPage from "../../components/AllItemsOnMainPage";
import LeftSideBar from "../../components/LeftSideBar";
import { useFetchItemsContext } from "../../hooks/useFetchItemsContext";
import Footer from "../footer/Footer";
import AllItemsComponent from "./AllItems";

const Chicken = () => {
  const { allItems, dispatcho } = useFetchItemsContext();

  const categoryItemToShow = allItems.slice(30, 40);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/items/");
      const json = await response.json();

      if (response.ok) {
        dispatcho({ type: "FETCHED-ALL", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatcho]);

  // const Itemss = allItems.slice(5, 25);

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

export default Chicken;
