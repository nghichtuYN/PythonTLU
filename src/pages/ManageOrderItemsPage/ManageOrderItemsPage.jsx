import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderItemsByOrderID } from "../../services/ordetItems";
import { useQueryHook } from "../../hooks/useQueryHook";
import {
  Button,
  Col,
  Collapse,
  Container,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { useDebounce } from "@uidotdev/usehooks";
import { Context } from "../../layouts/AdminLayout/AdminLayout";
import { SquarePen } from "lucide-react";
import { getOrderById, updateOrderStatus } from "../../services/orders"; // Giả sử bạn có service lấy thông tin Order
import { useMutationHook } from "../../hooks/useMutationHook";
import { updateProduct } from "../../services/products";
import { BsCheck2Circle } from "react-icons/bs";

export const ManageOrderItemsPage = () => {
  const { id } = useParams();
  const isOrders = "isOrders";
  const { setToaster } = useContext(Context);
  const navigate = useNavigate();

  const getOrderDetails = async (id) => {
    const res = await getOrderById(id);
    return res.data;
  };

  const getAllOrderItems = async (id) => {
    const res = await getOrderItemsByOrderID(id);
    return res.data;
  };

  const {
    data: orderItems,
    refetch: refetchOrder,
    isLoading,
  } = useQueryHook(["orderItems", id], () => getAllOrderItems(id));
  const { data: orderDetails, refetch } = useQueryHook(
    ["orderDetails", id],
    () => getOrderDetails(id)
  );

  useEffect(() => {}, [orderDetails]);
  const onSuccess = () => {
    refetch();
    refetchOrder();
    setToaster({
      type: "success",
      message: "Xóa thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
  };
  const mutationUpdate = useMutationHook((data) => {
    const { id, ...rest } = data;
    return updateOrderStatus(id, rest);
  }, onSuccess);

  const handleUpdatePaymentStatus = () => {
    mutationUpdate.mutate({
      id: id,
      isPaid: true,
      cus_name: orderDetails?.cus_name,
      cus_address: orderDetails?.cus_address,
      cus_email: orderDetails?.cus_email,
    });
  };
  return (
    <div
      className="manage-product-detail-page pb-2"
      style={{
        backgroundColor: "#f3f3f4",
        height: "auto",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <Container className="ps-4 pe-4">
        {orderDetails && (
          <Row className="order-info mt-4">
            <Col xs={12} md={6}>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Tên khách hàng:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      readOnly
                      value={orderDetails.cus_name}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Địa chỉ khách hàng:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      readOnly
                      value={orderDetails.cus_address}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Email khách hàng:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="email"
                      readOnly
                      value={orderDetails.cus_email}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Số điện thoại:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      readOnly
                      value={orderDetails.cus_phone}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Col>

            <Col xs={12} md={6}>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Tổng chi phí:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="number"
                      readOnly
                      value={orderDetails.ord_cost}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Trạng thái thanh toán:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      readOnly
                      value={
                        orderDetails.isPaid
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"
                      }
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm={3}>
                    Người dùng:
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      readOnly
                      value={orderDetails.user?.id}
                    />
                  </Col>
                </Form.Group>
                {!orderDetails.isPaid && (
                  <Button variant="primary" onClick={handleUpdatePaymentStatus}>
                    Đánh dấu là đã thanh toán
                  </Button>
                )}
              </Form>
            </Col>
          </Row>
        )}

        <Row className="pt-4">
          <Col className="text-start ps-5 fw-bolder fs-5">
            <p>
              Quản lý đơn hàng <u />
            </p>
          </Col>
          <Col className="text-end pe-5">
            <span className="fw-bolder">Đơn hàng</span>
            {">"} Quản lý đơn hàng {">"} Chi tiết đơn hàng
          </Col>
        </Row>
        <Form.Group as={Row} className="mb-3" controlId="formChildCategories">
          <Form.Label className="text-start ps-4">
            Danh sách sản phẩm:
          </Form.Label>
          {isLoading ? (
            <p>Đang tải....</p>
          ) : (
            <Table
              responsive
              className="category-table"
              style={{ overflowY: "scroll" }}
            >
              <thead>
                <tr style={{ backgroundColor: "grey" }}>
                  <th>Mã đơn hàng</th>
                  <th>Tên sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Ngày tạo</th>
                  <th>Ngày cập nhật</th>
                  <th>Tùy chỉnh</th>
                </tr>
              </thead>
              <Collapse in={!!orderItems} dimension={"height"}>
                <tbody>
                  {orderItems?.results?.map((item) => {
                    const created_date = new Date(item?.created);
                    const updated_date = new Date(item?.updated);
                    const formattedCreatedDate = created_date.toLocaleString(
                      "vi-VN",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    );
                    const formattedUpdatedDate = updated_date.toLocaleString(
                      "vi-VN",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    );
                    return (
                      <tr key={item?.id}>
                        <td>{item?.orders}</td>
                        <td>{item?.product_item?.product?.product_name}</td>
                        <td>
                          <Image
                            src={item?.product_item?.images[0]?.image_filename}
                            style={{ height: "80px", width: "70px" }}
                          />
                        </td>
                        <td>{item?.qty}</td>
                        <td>{item?.price}</td>
                        <td>{formattedCreatedDate}</td>
                        <td>{formattedUpdatedDate}</td>
                        <td style={{ width: "200px" }}>
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() =>
                              navigate(`/admin/orders/${item?.id}`)
                            }
                          >
                            <SquarePen />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Collapse>
            </Table>
          )}
        </Form.Group>
      </Container>
    </div>
  );
};
