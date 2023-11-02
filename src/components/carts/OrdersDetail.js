import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetadaData from "../../MetadaData";
import { Link } from "react-router-dom";
import { getOrdersDetails,clearError } from "../../actions/OrderAction";
import { Typography } from "@material-ui/core";
import Loader from "../../Styles/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const OrdersDetail = () => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    const alert = useAlert();
    
    const { id } = useParams();
  
    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearError());
        }
    
        dispatch(getOrdersDetails(id));
      }, [dispatch, alert, error, id]);
  return (
  <Wrapper>
    <Fragment>
      {
        loading ? (<Loader/>):
        <Fragment>

          <MetadaData title="Order's Detail"/>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order #{order && order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>


        </Fragment>

        
      }
    </Fragment>

  </Wrapper>
  )
}

const Wrapper = styled.section`

.orderDetailsPage {
  background-color: white;
}

.orderDetailsContainer > h1 {
  font: 300 3vmax "Roboto";
  margin: 4vmax 0;
  color: tomato;
}

.orderDetailsContainer {
  padding: 5vmax;
  padding-bottom: 0%;
}

.orderDetailsContainer > p {
  font: 400 1.8vmax "Roboto";
}

.orderDetailsContainerBox,
.orderDetailsCartItemsContainer {
  margin: 2vmax;
}

.orderDetailsContainerBox > div {
  display: flex;
  margin: 1vmax 0;
}

.orderDetailsContainerBox > div > p {
  font: 400 1vmax "Roboto";
  color: black;
}
.orderDetailsContainerBox > div > span {
  margin: 0 1vmax;
  font: 100 1vmax "Roboto";
  color: #575757;
}

.orderDetailsCartItems > p {
  font: 400 1.8vmax "Roboto";
}

.orderDetailsCartItems {
  padding: 2vmax 5vmax;
  border-top: 1px solid rgba(0, 0, 0, 0.164);
}

.orderDetailsCartItemsContainer > div {
  display: flex;
  font: 400 1vmax "Roboto";
  align-items: center;
  margin: 2vmax 0;
}

.orderDetailsCartItemsContainer > div > img {
  width: 3vmax;
}

.orderDetailsCartItemsContainer > div > a {
  color: #575757;
  margin: 0 2vmax;
  width: 60%;
  text-decoration: none;
}

.orderDetailsCartItemsContainer > div > span {
  font: 100 1vmax "Roboto";
  color: #5e5e5e;
}

@media screen and (max-width: 600px) {
  .orderDetailsContainer > p {
    font: 400 6vw "Roboto";
  }

  .orderDetailsContainerBox > div {
    margin: 6vw 0;
  }

  .orderDetailsContainerBox > div > p {
    font: 400 4vw "Roboto";
  }
  .orderDetailsContainerBox > div > span {
    font: 100 4vw "Roboto";
  }

  .orderDetailsCartItems > p {
    font: 400 6vw "Roboto";
  }

  .orderDetailsCartItemsContainer > div {
    font: 400 4vw "Roboto";
    margin: 4vw 0;
  }

  .orderDetailsCartItemsContainer > div > img {
    width: 10vw;
  }

  .orderDetailsCartItemsContainer > div > a {
    margin: 2vw;
    width: 30%;
  }

  .orderDetailsCartItemsContainer > div > span {
    font: 100 4vw "Roboto";
  }
}


`
export default OrdersDetail
