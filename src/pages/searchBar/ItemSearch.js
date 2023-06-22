import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useItemsCartContext } from "../../hooks/useItemsCartContext";
import Footer from "../footer/Footer";

export default function ItemSearch() {
  const { id } = useParams();
  const item = useLoaderData();

  const { items, dispatch } = useItemsCartContext(); // for adding items to the cart

  const [addItemToCart, setaddItemToCart] = useState(); // for adding items to the cart
  const [changeValue, setChangeValue] = useState(0); // for adding items to the cart

  useEffect(() => {
    if (addItemToCart !== undefined) {
      const localStoragecurrentItems = JSON.parse(
        localStorage.getItem("MealItems")
      );

      const checkforduplicatefilter = localStoragecurrentItems.filter(
        (item) => {
          //     console.log(item._id, addItemToCart._id);
          return item._id === addItemToCart._id;
        }
      );

      if (checkforduplicatefilter.length >= 1) {
        setTimeout(() => {
          // setDuplicateItemDealWith(checkforduplicatefilter);
          //     console.log("we are dealing with duplicate");
          //dealing with the duplicate
          // const ItemIncresedNumberofItems = checkforduplicatefilter.map(
          //   (item) => {
          //     item.numberofitem += 1;
          //     return item;
          //   }
          // );

          const ItemIncresedNumberofItems = checkforduplicatefilter.map(
            (item) => {
              item.numberofitem += 1;
              return item;
            }
          );
          // ItemIncresedNumberofItems

          // filtering the duplicated in the local storage and just keeping one

          const filteringanyextra = localStoragecurrentItems.filter((item) => {
            //    console.log(item._id, addItemToCart._id);
            return item._id !== addItemToCart._id;
          });
          //   console.log(filteringanyextra);

          dispatch({ type: "ADD", payload: ItemIncresedNumberofItems[0] });

          const mergedArray = [
            ...filteringanyextra,
            ItemIncresedNumberofItems[0],
          ];

          localStorage.setItem("MealItems", JSON.stringify(mergedArray));
        }, 500);
      } else {
        dispatch({ type: "ADD", payload: addItemToCart });

        const mergedArray = [...localStoragecurrentItems, addItemToCart];

        localStorage.setItem("MealItems", JSON.stringify(mergedArray));
      }

      // if (checkforduplicatefilter) {
      //   setDuplicateItemDealWith(checkforduplicatefilter);
      // }
      // console.log(addItemToCart);
      // console.log("we are inside");

      // so we here getting the data from the local storage if they are there, and adding them with the current context so it says
      // up to date.
      // const ToLocalStorageitems = JSON.parse(
      //   localStorage.getItem("MealItems")
      // );
    }
  }, [addItemToCart, changeValue]);

  return (
    <div>
      <div className="article-main-item-search">
        <div className="item-default-On-Main-Page-search">
          <div className="box-search" key={item._id}>
            <img
              src={require(`./../../img/products/${item.image}`)}
              alt="imageos"
              className="image-product-search"
            ></img>
            <h3 className="name">
              {item.title} {/* can be big and in the center */}
            </h3>

            <p className="price">Price: ${item.price}</p>

            <button
              // data={item}
              onClick={() => {
                // const itemss = item;
                const numberofitemforvalue = JSON.parse(
                  localStorage.getItem("MealItems")
                );

                setaddItemToCart(item);
                setChangeValue(numberofitemforvalue.length + 1);
              }}
            >
              Order Now
            </button>
          </div>
          <div>
            <div className="meal-details-search">
              <h3>Meal Details:</h3>

              <p>Meal title: {item.title}</p>
              <p>{item.description}</p>
            </div>

            <p>Meal Description: {item.description}</p>
          </div>
        </div>
      </div>

      <div className="at-the-end-item-search">
        <Footer />
      </div>
    </div>
  );
}

// data loader
export const itemSearchLoader = async ({ params }) => {
  const { id } = params;

  const res = await fetch(
    "https://www.rrestaurantbk.shoponlinemarket.cloud/api/items/" + id
  );

  if (!res.ok) {
    throw Error("Could not find that item");
  }

  return res.json();
};
