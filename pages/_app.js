import store from "../components/store/index";
import { Provider } from "react-redux";
import '../styles/globals.css'

function HomePage({ Component, pageprops }) {
  return (
      <Provider store={store}>
          <Component {...pageprops} />
      </Provider>
  );
}

export default HomePage;
