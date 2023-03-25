import { useEffect, useState } from "react";
import { json, Link, NavLink, useLoaderData } from "react-router-dom";
import axios from "axios";

// components

import { useFetchItemsContext } from "../hooks/useFetchItemsContext";
import { useItemsCartContext } from "../hooks/useItemsCartContext";
import AllItemsComponent from "./categories/AllItems";

import Footer from "./footer/Footer";

import AllItemsOnMainPage from "../components/AllItemsOnMainPage";
import { useAuthContext } from "../hooks/useAuthContext";
import LeftSideBar from "../components/LeftSideBar";

const Home = () => {
  const { allItems, dispatcho } = useFetchItemsContext();
  const { items, dispatch } = useItemsCartContext();
  const { user, dispatchUser } = useAuthContext();
  const [slidingImagesOffer, setSlidingImagesOffer] = useState(1);
  const [slidingThirtyOfferItems, setSlidingThirtyOfferItems] = useState(1);

  // const firstTen = allItems.slice(0, 10);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        "https://restaurant-online-api-production.up.railway.app/api/items/"
      );

      const json = await response.json();

      if (response.ok) {
        dispatcho({ type: "FETCHED-ALL", payload: json });
      }
    };

    fetchItems();
  }, [dispatcho]);

  useEffect(() => {
    if (user) {
      const checkToken = async () => {
        try {
          const datas = await axios.post(
            "https://restaurant-online-api-production.up.railway.app/api/users/checktoken",
            {
              message: "checkme",
            },
            {
              withCredentials: true,
              headers: {
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                "Access-Control-Allow-Headers":
                  "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
              },
              // headers: {
              //   "Access-Control-Allow-Origin": "*",
              //   "Content-Type": "application/json",
              // },
            }
          );
          // console.log(datas);
          return;
        } catch (error) {
          // console.log(error);
          // then remove user from local storage and   which will set the context to null automatically
          localStorage.removeItem("user");

          // dispatch to context just to re-renders
          dispatchUser({ type: "LOGOUT" });

          return;
        }
      };
      checkToken();
    }
  }, [user]);

  return (
    <div>
      <div className="home-main-component">
        <LeftSideBar />
        <AllItemsOnMainPage props={allItems} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

// export const allItemLoader = async () => {
//   const res = await fetch("https://restaurant-online-api-production.up.railway.app/api/items/");

//   return res.json();
// };
