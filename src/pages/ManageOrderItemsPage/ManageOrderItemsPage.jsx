import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderItemsByOrderID } from "../../services/ordetItems";
import { useQueryHook } from "../../hooks/useQueryHook";
import {
  Badge,
  Button,
  Col,
  Collapse,
  Container,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { AdninSearchComponent } from "../../components/AdminSearchComponent/AdminSearchComponent";
import { useDebounce } from "@uidotdev/usehooks";
import { Context } from "../../layouts/AdminLayout/AdminLayout";
import { SquarePen } from "lucide-react";
import { getProductImageByProductItemsAPI } from "../../services/productImgae";

export const ManageOrderItemsPage = () => {
  const { id } = useParams();
  const isOrders = "isOrders";
  const placeholder = "Tìm kiếm...";
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 1000);
  const { setToaster } = useContext(Context);
  const navigate = useNavigate();

  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const getAllOrderItems = async (id) => {
    const res = await getOrderItemsByOrderID(id);
    return res.data;
  };
  const { data: orderItems, isLoading } = useQueryHook(
    ["orderItems", id],
    async () => {
      const res = await getAllOrderItems(id);
      const ord = res.results;
      const orderItem = await Promise.all(
        ord.map(async (item) => {
          try {
            const itemImages = await getProductImageByProductItemsAPI(
              item?.product_item.id
            );
            return {
              ...item, // keep item data
              images: itemImages?.data?.results || [], // if no image, return []
            };
          } catch (error) {
            console.log(
              `Error fetching data for product item ${item.id}:`,
              error
            );
            return {
              images: [],
            };
          }
        })
      );
      return orderItem;
    }
  );
  console.log(orderItems);
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
        <Row className="pt-4">
          <Col className="text-start ps-5 fw-bolder fs-5">
            <p>
              Quản lý đơn hàng <u />
            </p>
          </Col>
          <Col className="text-end pe-5">
            <span
              className="fw-bolder "
              // onClick={() => navigate("/admin/categories")}
            >
              Đơn hàng{" "}
            </span>
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
                  {orderItems?.map((item) => {
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
                            src={item?.images[0]?.image_filename}
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
