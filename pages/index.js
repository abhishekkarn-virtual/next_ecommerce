import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect } from "react";
import withRedux from "next-redux-wrapper";

import { uiActions } from "../components/store/ui-slice";
import Cart from "../components/Cart/Cart";
import Layout from "../components/Layout/Layout";
import Products from "../components/Shop/Products";
import Notification from "../components/UI/Notification";
import { connectToDatabase } from "../lib/mongodb";

let isInitial = true;

export default function HomePage(props) {
  console.log(props, props.products);

  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  const isCartVisible = useSelector((state) => state.ui.cartIsVisible);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending Cart Data!",
        })
      );
      const response = await fetch(
        "https://react-http-52792-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent Cart Data Successfully!",
        })
      );
      // const responseData = await response.json();
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending Cart Data Failed!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const products = await db.collection("products").find({}).toArray();
  console.log('products:', products);

  return {
    props: {
      products: products.map((product) => ({
        id: product._id.toString(),
        title: product.title,
        price: product.price,
        description: product.description,
      })),
    },
    revalidate: 10,
  };
}

