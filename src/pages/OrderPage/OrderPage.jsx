import React from "react";
import { useParams } from "react-router-dom";
import { getOrderByUser } from "../../services/orders";
import { useQueryHook } from "../../hooks/useQueryHook";
import { Badge, Collapse, Image, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

const OrderPage = () => {
  const { id } = useParams();
  const getOrderbyID = async (id) => {
    const res = await getOrderByUser(id);
    return res.data;
  };
  const user = useSelector((state) => state.user);

  const { data: orders } = useQueryHook(["order", id], () => getOrderbyID(id));

  return (
    <div className="pt-2 pb-2 min-vh-100">
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
            <th>Kích cỡ</th>
            <th>Giá</th>
            <th>Trạng thái</th> {/* Cột trạng thái */}
          </tr>
        </thead>
        <Collapse in={!!orders} dimension={"height"}>
          <tbody>
            {user?.id &&
              orders?.map((order) =>
                order.orderItem.map((item) => {
                  return (
                    <tr key={item?.id}>
                      <td>{order.public_id}</td>
                      <td>{item?.product_item?.product?.product_name}</td>
                      <td>
                        <Image
                          src={item?.product_item?.images[0]?.image_filename}
                          style={{ height: "80px", width: "70px" }}
                        />
                      </td>
                      <td>{item?.qty}</td>
                      <td>{item?.product_variation?.size_option?.size_name}</td>
                      <td>{item?.price}</td>
                      <td>
                        {order?.isPaid ? (
                          <Badge bg="success">Đã thanh toán</Badge>
                        ) : (
                          <Badge bg="danger">Chưa thanh toán</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
          </tbody>
        </Collapse>
      </Table>
    </div>
  );
};

export default OrderPage;
