import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import classes from './CartButton.module.css';
import { uiActions } from '../store/ui-slice';



const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.cart.totalQuantity);

  const toggleHandler = () => {
    dispatch(uiActions.toggle());
  }

  return (
    <button className={classes.button} onClick={toggleHandler} >
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;
