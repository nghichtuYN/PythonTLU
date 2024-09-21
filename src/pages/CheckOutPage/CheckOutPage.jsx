import React, { useContext, useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Row,
  Table,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationHook";
import { createOrders } from "../../services/orders";
import { DefaultContext } from "../../layouts/DefaultLayout/DefaultLayout";
import { BsCheck2Circle } from "react-icons/bs";
import { CiNoWaitingSign } from "react-icons/ci";
const CheckOutPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const { setToaster } = useContext(DefaultContext);

  const [cusName, setCusName] = useState("");
  const [cusPhone, setCusPhone] = useState("");
  const [cusAddress, setCusAddress] = useState("");
  const [cusEmail, setCusEmail] = useState("");
  const totalPrice = order?.orderItems?.reduce(
    (total, item) => total + item?.amount * item?.price,
    0
  );

  const onSuccess = () => {
    // console.log("run")
    setToaster({
      type: "success",
      message: "Đặt hàng thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
  };

  const onError = (data) => {
    console.log(data)
    setToaster({
      type: "danger",
      message: "Đặt hàng thất bại🚀",
      show: true,
      icon: <CiNoWaitingSign size={40} color="white" />,
    });
  };

  const mutationCreate = useMutationHook(
    (data) => createOrders(data),
    onSuccess,
    (data) => onError(data)
  );
  const handleCheckOut = () => {
    mutationCreate.mutate({
      cus_name: cusName,
      cus_address: cusAddress,
      cus_email: cusEmail,
      cus_phone: cusPhone,
      ord_cost: totalPrice,
      user: user?.id,
      order_items: order?.orderItems,
    });
  };
  return (
    <>
      <div>
        <Container fluid style={{ padding: 0 }}>
          <Row
            className="nav-navigate d-flex justify-content-start align-items-center gap-2"
            style={{
              lineHeight: "20px",
              height: "55px",
              fontSize: "14px",
              padding: "0 120px",
              color: "#878787",
            }}
          >
            <>{"<< "}Quay lại giỏ hàng</>
          </Row>
          <h4 className="text-start mt-2">Mẫu thanh toán</h4>
          <Row>
            <Col md={9}>
              <Row>
                <Col md={9}>
                  <Form>
                    <Form.Group as={Row} className="mb-3" controlId="custName">
                      <Form.Label column sm={2}>
                        Họ tên:
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          value={cusName}
                          onChange={(e) => setCusName(e.target.value)}
                          type="text"
                          name="custName"
                          required
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="custAddress"
                    >
                      <Form.Label column sm={2}>
                        Địa chỉ:
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          value={cusAddress}
                          onChange={(e) => setCusAddress(e.target.value)}
                          as="textarea"
                          name="custAddress"
                          required
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="custPhone">
                      <Form.Label column sm={2}>
                        Điện thoại:
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          value={cusPhone}
                          onChange={(e) => setCusPhone(e.target.value)}
                          type="text"
                          name="custPhone"
                          required
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="custEmail">
                      <Form.Label column sm={2}>
                        Email:
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="email"
                          value={cusEmail}
                          name="custEmail"
                          onChange={(e) => setCusEmail(e.target.value)}
                          required
                        />
                      </Col>
                    </Form.Group>
                  </Form>
                </Col>
                <Col md={3}>
                  <h5>Phương thức thanh toán</h5>

                  <Form.Group controlId="payment-method">
                    <Form.Select>
                      <option>---Chọn hình thức thanh toán---</option>
                      <option value="1">Thanh toán khi nhận hàng</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
            <Col md={3}>
              <Container>
                <h4>Giỏ hàng</h4>
                <Table>
                  <thead>
                    <tr>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order &&
                      order?.orderItems?.map((item, index) => (
                        <tr key={index}>
                          <td className="text-start">
                            <Image
                              src={item?.image}
                              alt="anh"
                              style={{ height: "60px", width: "50px" }}
                            />
                            {item?.name}
                          </td>
                          <td>{item?.amount}</td>
                          <td style={{ textAlign: "center" }}>{item?.price}</td>
                        </tr>
                      ))}
                    <tr>
                      <td className="text-start" colSpan={2}>
                        Tổng tiền:{" "}
                      </td>
                      <td>{totalPrice}</td>
                    </tr>
                  </tbody>
                </Table>
                <Button
                  onClick={handleCheckOut}
                  className="w-100"
                  variant="dark"
                  size="lg"
                >
                  Đặt Hàng
                </Button>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default CheckOutPage;
