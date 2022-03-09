import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "../containers";
import { UserOrder } from "../containers"
import { getWishlist, removeFromWishlist, userAddress, userOrders, userPayments, userReviews } from "../Redux/Actions/actions";

export default function ProfileTables({ link, userid }) {
  const { payments, address, orders, reviews, wishlist, loadWishlist } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [orderDetail, setOrderDetail] = useState({});
  
  useEffect(() => {
    if (link === "Order history") {
      dispatch(userOrders(userid));
    }
    if (link === "Reviews") {
      dispatch(userReviews(userid));
    }
    if (link === "Wishlist" && loadWishlist) {
      dispatch(getWishlist(userid));
    }
    if (link === "Payments") {
      dispatch(userPayments(userid)); 
    }
    if (link === "Addresses") {
      dispatch(userAddress(userid));
    }
  }, [link, loadWishlist]);

  const handleRemove = (productid) => {
    dispatch(removeFromWishlist(userid, productid))
  }

  const handleClick = (order) => {
    setOpenModal(true);
    setOrderDetail(order)
  }

  if (link === "Payments") {
    return (
      <div>
        Metodos de pago
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Tipo</th>
              <th scope="col">Provedor</th>
              <th scope="col"># de cuenta</th>
              <th scope="col">Expira</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map(payment => {
                return <tr key={payment.id}>
                  <th scope="row">{payment.paymentType}</th>
                  <td>{payment.provider}</td>
                  <td>{payment.accountNo}</td>
                  <td>{payment.expiry}</td>
                </tr>;
              })}
          </tbody>
        </table>
      </div>
    );
  } else if (link === "Addresses") {
    return (
      <div>
        Direcciones
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Linea 1</th>
              <th scope="col">Linea 2</th>
              <th scope="col">Ciudad</th>
              <th scope="col">Codigo Postal</th>
              <th scope="col">Pais</th>
              <th scope="col">Telefono</th>
              <th scope="col">Movil</th>
            </tr>
          </thead>
          <tbody>
            {address?.map((ad) => {
                return <tr key={ad.id}>
                  <th scope="row">{ad.addressLine1}</th>
                  <td>{ad.addressLine2}</td>
                  <td>{ad.city}</td>
                  <td>{ad.postalCode}</td>
                  <td>{ad.country}</td>
                  <td>{ad.telephone}</td>
                  <td>{ad.mobile}</td>
                </tr>;
              })}
          </tbody>
        </table>
      </div>
    );
  } else if (link === "Order history") {
    return (
      <div>
        Historial de compras
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Total</th>
              <th scope="col">Date</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => {
                return <tr key={order.id} onClick={() => handleClick(order)}>
                  <th scope="row">{order.id}</th>
                  <td>{order.total}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.status}</td>
                </tr>;
              })}
          </tbody>
        </table>
        { openModal &&
        <Modal position="center" >
          <UserOrder order={orderDetail} setOpenModal={setOpenModal}/>
        </Modal>
        }
      </div> 
    );
  } else if (link === "Reviews") {
    return (
      <div>
        Reviews
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Score</th>
              <th scope="col">Product</th>
            </tr> 
          </thead>
          <tbody>
            {reviews?.map(review => {
                return <tr key={review.id} onClick={() => navigate(`/product/${review.product_id}`)}>
                  <th scope="row">{review.description}</th>
                  <td>{review.starsPoints}</td>
                  <td>{review.productoRW.name}</td>
                  <td><img src={review.productoRW.image} width="25%" height="25%" /></td>
                </tr>;
              })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        Wishlist
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
            </tr> 
          </thead>
          <tbody>
            {wishlist?.map(item => {
                return <tr key={item.id} onClick={() => navigate(`/product/${item.id}`)}>
                  <th scope="row"><img src={item.image} alt="Product Picture"  width="25%" height="25%"/></th>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td><button onClick={() => handleRemove(item.id)}>Remove</button></td>
                </tr>;
              })}
          </tbody>
        </table>
      </div>
    );
  }
}
