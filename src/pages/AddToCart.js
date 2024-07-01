
                   
                     
                            
                             import React, { useEffect, useState } from "react";
                              import Header from "../components/Header";
                              import styles from "../css/cart-style.module.css";
                              import { useDispatch, useSelector } from "react-redux";
                              import {
                                decreaseQuantity,
                                emptyCartItem,
                                increaseQuantity,
                                removeFromCart,
                              } from "../redux/features/cartSlice";
                              import toast, { Toaster } from "react-hot-toast";
                              
                              const AddToCart = () => {
                                const { carts } = useSelector((state) => state.allCart);
                                const dispatch = useDispatch();
                                const [total, setTotal] = useState(0);
                                const [quantity, setQuantity] = useState(0);
                              
                                const handleIncrement = (e) => {
                                  dispatch(increaseQuantity(e));
                                  toast.success("Item added to your cart");
                                };
                              
                                const handleDeleteItem = (e) => {
                                  dispatch(removeFromCart(e));
                                  toast.success("Item Removed From Your Cart");
                                };
                              
                                const handleDecrement = (e) => {
                                  if (e.qnty > 1) {
                                    dispatch(decreaseQuantity(e));
                                    toast.success("Item quantity decreased");
                                  } else {
                                    dispatch(removeFromCart(e.id));
                                    toast.success("Item Removed From Your Cart");
                                  }
                                };
                              
                                const emptycart = () => {
                                  dispatch(emptyCartItem());
                                  toast.success("Your Cart is Empty");
                                };
                              
                                const totalPrice = () => {
                                  let totalprice = carts.reduce((acc, ele) => acc + ele.price * ele.qnty, 0);
                                  setTotal(totalprice);
                                };
                              
                                const totalQuantity = () => {
                                  let totalqty = carts.reduce((acc, ele) => acc + ele.qnty, 0);
                                  setQuantity(totalqty);
                                };
                              
                                useEffect(() => {
                                  totalPrice();
                                  totalQuantity();
                                }, [carts]);
                              
                                return (
                                  <>
                                    <Toaster />
                                    <Header />
                                    <div className="row justify-content-center m-1">
                                      <div className={`col-md-8 mt-5 mb-5 ${styles.cardDetails}`}>
                                        <div className="card">
                                          <div className="card-header bg-dark p-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                              <h5 className="text-white m-0">
                                                Cart  {carts.length > 0 ? `(${carts.length})` : ""}
                                              </h5>
                                              {carts.length > 0 && (
                                                <button
                                                  className="btn btn-danger btn-sm mt-0"
                                                  onClick={emptycart}
                                                >
                                                  <i className="fas fa-trash-alt mx-1"></i>
                                                  <span>Empty Cart</span>
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                          <div className="card-body p-0">
                                            {carts.length === 0 ? (
                                              <table className={`${styles.cartTable} table mb-0`}>
                                                <tbody>
                                                  <tr>
                                                    <td colSpan={6}>
                                                      <div className={styles.cartEmpty}>
                                                        <i className="fas fa-shopping-cart fs-1" />
                                                        <p className="fs-3">Your cart is Empty</p>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            ) : (
                                              <table
                                                className={`table table-responsive-sm mb-0 ${styles.cartTable}`}
                                              >
                                                <thead>
                                                  <tr>
                                                    <th>Product</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Qty</th>
                                                    <th className="text-right">Total Amount</th>
                                                    <th>Action</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {carts.map((data) => (
                                                    <tr key={data.id}>
                                                      <td>
                                                        <div className={styles.productImg}>
                                                          <img src={data.imgdata} alt={data.dish} />
                                                        </div>
                                                      </td>
                                                      <td>
                                                        <p>{data.dish}</p>
                                                      </td>
                                                      <td>{data.price}</td>
                                                      <td>
                                                        <div className="d-flex align-items-center">
                                                          <button
                                                            className={styles.productQtyBtn}
                                                            onClick={() => handleDecrement(data)}
                                                          >
                                                            <i className="fas fa-minus" />
                                                          </button>
                                                          <input
                                                            type="text"
                                                            className={styles.qtyInputBox}
                                                            value={data.qnty || 1}
                                                            disabled
                                                          />
                                                          <button
                                                            className={styles.productQtyBtn}
                                                            onClick={() => handleIncrement(data)}
                                                          >
                                                            <i className="fas fa-plus" />
                                                          </button>
                                                        </div>
                                                      </td>
                                                      <td className="text-right">
                                                        {data.qnty * data.price}
                                                      </td>
                                                      <td>
                                                        <button
                                                          className={`btn btn-danger m-0 ${styles.productDelete}`}
                                                          onClick={() => handleDeleteItem(data.id)}
                                                        >
                                                          <i className="fas fa-trash-alt mx-1"></i>
                                                        </button>
                                                      </td>
                                                    </tr>
                                                  ))}
                                                </tbody>
                                                <tfoot>
                                                  <tr>
                                                    <th colSpan={4}>&nbsp;</th>
                                                    <th>
                                                      Items in Cart<span className="ms-2">:</span>
                                                      <span className="text-danger ms-2">{quantity}</span>
                                                    </th>
                                                    <th className="text-right">
                                                      Total Price<span className="ms-2">:</span>
                                                      <span className="text-danger ms-2">{total}</span>
                                                    </th>
                                                  </tr>
                                                </tfoot>
                                              </table>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              };
                              
                              export default AddToCart;
                              