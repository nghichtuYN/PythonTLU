import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
} from "../../redux/Order/OrderSlide";
import { Button, Image, Row, Table } from "react-bootstrap";
import NotLoggedInMessage from "../../components/NotLoggedInMessage/NotLoggedInMessage";
const ShoppingCartPage = () => {
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  let totalPrice = order?.orderItems?.reduce(
    (total, item) => total + item?.amount * item?.price,
    0
  );
  const dispatch = useDispatch();
  const hanldeChangeAmount = (type, idProduct) => {
    if (type === "increase") {
      dispatch(increaseAmount({ idProduct }));
    } else {
      dispatch(decreaseAmount({ idProduct }));
    }
  };
  const onchange = (e) => {
    console.log(e.target.value);
  };
  const handleCheckOut = () => {
    if (!user?.id) {
      navigate("/sign-in");
    } else {
      navigate("/checkout");
    }
  };
  const handleRemoveProduct = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };
  const handleMain = () => {
    navigate("/men");
  };
  return (
    <>
      {!user?.id ? (
        <div className="mt-2" style={{ height: "80vh" }}>
          <NotLoggedInMessage />
          <Button onClick={() => navigate("/login")} className="mt-2">
            Đăng nhập
          </Button>
        </div>
      ) : (
        <div>
          <MDBContainer className=" h-100">
            <Row
              className="nav-navigate d-flex justify-content-start align-items-center gap-2"
              style={{
                lineHeight: "20px",
                height: "55px",
                fontSize: "14px",
                padding: "0 120px",
                color: "#878787",
                cursor: "pointer",
              }}
            >
              <div style={{ width: "200px" }} onClick={handleMain}>
                {"<<"} Quay lại trang chủ
              </div>
            </Row>
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol size="12">
                <MDBCard
                  className="card-registration card-registration-2"
                  style={{ borderRadius: "15px" }}
                >
                  <MDBCardBody className="p-0">
                    <MDBRow className="g-0">
                      <MDBCol lg="8">
                        <div className="p-5">
                          <div className="d-flex justify-content-between align-items-center mb-5">
                            <MDBTypography
                              tag="h1"
                              className="fw-bold mb-0 text-black"
                            >
                              Giỏ hàng
                            </MDBTypography>
                            <MDBTypography className="mb-0 text-muted">
                              {order?.orderItems?.length} sản phẩm
                            </MDBTypography>
                          </div>
                          <div>
                            <Table className="text-start">
                              <thead>
                                <tr style={{ backgroundColor: "grey" }}>
                                  <th>Tên sản phẩm</th>
                                  <th>Số lượng </th>
                                  <th>Giá</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody className="text-start">
                                {order?.orderItems?.map((item) => {
                                  return (
                                    <tr key={item.product}>
                                      <td>
                                        <Image
                                          src={item?.image}
                                          fluid
                                          style={{
                                            height: "80px",
                                            width: "70px",
                                          }}
                                          alt=""
                                        />
                                        <MDBTypography
                                          tag="h6"
                                          className="text-muted"
                                        >
                                          {item?.name}
                                        </MDBTypography>
                                      </td>
                                      <td>
                                        <Button
                                          variant="outline-dark"
                                          style={{ border: "none" }}
                                          size="sm"
                                          onClick={() =>
                                            hanldeChangeAmount(
                                              "increase",
                                              item?.product
                                            )
                                          }
                                        >
                                          <FaPlus />
                                        </Button>
                                        <input
                                          className="me-2 ms-2"
                                          type="numer"
                                          onChange={onchange}
                                          value={item?.amount}
                                          style={{
                                            width: "20px",
                                            textAlign: "center",
                                            marginTop: "20px",
                                            lineHeight: "16px",
                                          }}
                                          min="1"
                                        />
                                        <Button
                                          variant="outline-dark"
                                          size="sm"
                                          onClick={() =>
                                            hanldeChangeAmount(
                                              "decrease",
                                              item?.product
                                            )
                                          }
                                          style={{ border: "none" }}
                                        >
                                          <FaMinus />
                                        </Button>
                                      </td>
                                      <td style={{ textAlign: "center" }}>
                                        <MDBTypography tag="h6">
                                          {item?.price * item?.amount}
                                        </MDBTypography>
                                      </td>
                                      <td>
                                        <Button
                                          variant="outline-danger"
                                          style={{ border: "none" }}
                                          size="sm"
                                          onClick={() =>
                                            handleRemoveProduct(item?.product)
                                          }
                                        >
                                          <MdDeleteForever size={30} />
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </MDBCol>
                      <MDBCol lg="4" className="bg-grey">
                        <div className="p-5">
                          <MDBTypography
                            tag="h3"
                            className="fw-bold mb-5 mt-2 pt-1"
                          >
                            Tổng tiền
                          </MDBTypography>

                          <hr className="my-4" />

                          <div className="d-flex justify-content-between mb-4">
                            <MDBTypography tag="h5" className="">
                              Số lượng: {order?.orderItems?.length}
                            </MDBTypography>
                            <MDBTypography tag="h5">{totalPrice}</MDBTypography>
                          </div>

                          <hr className="my-4" />

                          <div className="d-flex justify-content-between mb-5">
                            <MDBTypography tag="h5">Tổng tiền</MDBTypography>
                            <MDBTypography tag="h5">{totalPrice}</MDBTypography>
                          </div>

                          <Button
                            color="dark"
                            style={{ width: "100%" }}
                            size="lg"
                            onClick={handleCheckOut}
                          >
                            Đặt hàng
                          </Button>
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      )}
    </>
  );
};
export default ShoppingCartPage;
