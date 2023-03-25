import { useItemsCartContext } from "../hooks/useItemsCartContext";
import { useFetchItemsContext } from "../hooks/useFetchItemsContext";
import { useEffect, useState } from "react";

const AllItemsOnMainPage = (props) => {
  const { allItems, dispatcho } = useFetchItemsContext(); // for checking all the items fetched
  const { items, dispatch } = useItemsCartContext(); // for adding items to the cart
  const [dropDown, setDropDown] = useState(false);
  const [value, setValue] = useState(0); // integer state
  const [ItemsShowen0, setItemsShowen] = useState([]); //

  // console.log(cartNumberOfItem);
  const categoryItemToShow = props.props;

  const [addItemToCart, setaddItemToCart] = useState(); // for adding items to the cart
  const [changeValue, setChangeValue] = useState(0); // for adding items to the cart

  // useEffect(() => {}, [duplicateItemDealWith]);

  useEffect(() => {
    if (addItemToCart !== undefined) {
      const localStoragecurrentItems = JSON.parse(
        localStorage.getItem("MealItems")
      );

      const checkforduplicatefilter = localStoragecurrentItems.filter(
        (item) => {
          // console.log(item._id, addItemToCart._id);
          return item._id === addItemToCart._id;
        }
      );

      if (checkforduplicatefilter.length >= 1) {
        setTimeout(() => {
          // setDuplicateItemDealWith(checkforduplicatefilter);
          // console.log("we are dealing with duplicate");
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
            // console.log(item._id, addItemToCart._id);
            return item._id !== addItemToCart._id;
          });
          // console.log(filteringanyextra);

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

  let emptyarray = [];
  if (!localStorage.getItem("MealItems")) {
    localStorage.setItem("MealItems", JSON.stringify(emptyarray));
  }

  let lessthanten = true;

  useEffect(() => {
    setItemsShowen((ItemsShowen0) => categoryItemToShow);
  }, [allItems]);

  function handleSortPlh() {
    const sortedData = [...ItemsShowen0].sort((a, b) =>
      a.price > b.price ? 1 : -1
    );
    setItemsShowen(sortedData);
  }
  function handleSortPhl() {
    const sortedData = [...ItemsShowen0].sort((a, b) =>
      a.price < b.price ? 1 : -1
    );
    setItemsShowen(sortedData);
  }

  function handlerSetNormal() {
    const sortedData = [...categoryItemToShow];

    setItemsShowen(sortedData);
  }

  function handleSortDhl() {
    const sortedData = [...ItemsShowen0].sort((a, b) =>
      a.title.length < b.title.length ? 1 : -1
    );
    setItemsShowen(sortedData);
  }

  function handleDropDown() {
    setDropDown(true);
  }

  function handleDropDownReset() {
    setDropDown(false);
  }

  // request a currency format
  // console.log(number.toLocaleString('en-us', { month: 'currency', year: 'EUR' }));
  // // → 123.456,79 €

  // // the Japanese yen doesn't use a minor unit
  // console.log(number.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' }))

  // const addingToLocalStorage = JSON.parse(localStorage.getItem("MealItems"));

  // console.log(addingToLocalStorage);

  // when u write from 0 to 10 , the first index is at 0 and the 10 item is at 9 index , and starting from 0 index so total 10
  // const newData1 = allItems.slice(0, 10);
  // console.log(newData1);
  // const newData2 = allItems.slice(10, 20);
  // console.log(newData2);

  // <div>
  //       <div className="sorting-icons">
  //         <button onClick={handleSortPhl}>
  //           Sort from high price to low price{" "}
  //         </button>
  //         <button onClick={handleSortPlh}>
  //           Sort from low price to high price
  //         </button>
  //         <button onClick={handleSortDhl}>Sort from newest to oldest</button>
  //         <button onClick={handlerSetNormal}>Sort back to normal</button>
  //       </div>
  //     </div>

  return (
    <div>
      <div className="sorting-main">
        {!dropDown && <button onClick={handleDropDown}>Sorting Options</button>}

        {dropDown && (
          <div className="sorting-icons">
            <button onClick={handleSortPhl}>
              Sort from high price to low price{" "}
            </button>
            <button onClick={handleSortPlh}>
              Sort from low price to high price
            </button>
            <button onClick={handleSortDhl}>Sort from Newest to Oldest</button>
            <button onClick={handlerSetNormal}>Sort back to normal</button>
            <button onClick={handleDropDownReset}>Click to hide</button>
          </div>
        )}
      </div>
      <div className="item-default-On-Main-Page">
        {ItemsShowen0 &&
          ItemsShowen0.map((item) => {
            return (
              <div className="box" key={item._id}>
                <img
                  className="image-product"
                  src={require(`./../img/products/${item.image}`)}
                  alt="imageos"
                ></img>
                <a
                  href={
                    "https://restaurant-online-frontend-production.up.railway.app/" +
                    item._id
                  }
                >
                  <h4 className="name">
                    {item.title} {/* can be big and in the center */}{" "}
                  </h4>
                </a>
                <p className="price">Price: ${item.price}</p>

                <button
                  className="main-page-button-add-to-cart"
                  // data={item}
                  onClick={() => {
                    // const itemss = item;
                    // const itemssId = item._id;

                    const numberofitemforvalue = JSON.parse(
                      localStorage.getItem("MealItems")
                    );

                    setChangeValue(numberofitemforvalue.length + 1);
                    setaddItemToCart(item);

                    // const localStoragecurrentItems = JSON.parse(
                    //   localStorage.getItem("MealItems")
                    // );

                    // console.log(checkforduplicatefilter);

                    // setaddItemToCart()

                    // if (checkforduplicatefilter === [null]) {
                    // }

                    // dispatchoo({ type: "SET_TO_TRUE", payload: true });
                  }}
                >
                  Add To Meal Cart
                </button>
              </div>
            );
          })}
      </div>
      {ItemsShowen0.length > 10 && (
        <div className="button-instead-of-scrolling">
          <div>Page</div>
          <button
            onClick={() => {
              setValue((value) => value + 1);
              setItemsShowen((ItemsShowen0) => allItems.slice(0, 20));
            }}
          >
            1
          </button>
          <button
            onClick={() => {
              setItemsShowen((ItemsShowen0) => allItems.slice(20, 40));
            }}
          >
            2
          </button>
          <button
            onClick={() => {
              setItemsShowen((ItemsShowen0) => allItems.slice(25, 40));
            }}
          >
            3
          </button>
          <button
            onClick={() => {
              setItemsShowen((ItemsShowen0) => allItems.slice(30, 40));
            }}
          >
            4
          </button>
        </div>
      )}
    </div>
  );
};

export default AllItemsOnMainPage;
