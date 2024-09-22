import { useDebounce } from "@uidotdev/usehooks";
import React, { createContext, useContext, useMemo, useState } from "react";
import { Context } from "../../layouts/AdminLayout/AdminLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllOrdersAPI } from "../../services/orders";
import { useQueryHook } from "../../hooks/useQueryHook";
import { BsCheck2Circle } from "react-icons/bs";
import {
  Badge,
  Button,
  Col,
  Collapse,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { AdninSearchComponent } from "../../components/AdminSearchComponent/AdminSearchComponent";
import { IoEyeOutline } from "react-icons/io5";
import { SquarePen } from "lucide-react";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
export const orderContext = createContext("unknow");
const ManageOrdersPage = () => {
  const limit = 10;
  const isOrders = "isOrders";
  const placeholder = "Tìm kiếm...";
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 1000);
  const { setToaster } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAllOrders = async (page, search) => {
    const res = await getAllOrdersAPI(page, search);
    return res.data;
  };
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const {
    data: orders,
    refetch,
    isLoading,
  } = useQueryHook(["products", page, debouncedSearchTerm], () =>
    getAllOrders(page, debouncedSearchTerm)
  );

  const onSuccess = () => {
    refetch();
    setToaster({
      type: "success",
      message: "Cập nhật thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
  };
  const value = useMemo(() => ({ isOrders }), [isOrders]);
  return (
    <orderContext.Provider value={value}>
      <div
        className="manage-product-detail-page pb-2"
        style={{ backgroundColor: "#f3f3f4", height: "auto",minHeight:'100vh' }}
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
              {">"} Quản lý đơn hàng
            </Col>
          </Row>
          <Form.Group as={Row} className="mb-3" controlId="formChildCategories">
            <Form.Label className="text-start ps-4">
              Danh sách đơn hàng:
            </Form.Label>
            <Col className="d-flex justify-content-end me-5 align-items-center">
              <AdninSearchComponent
                onChange={onChange}
                placeholder={placeholder}
                value={search}
              />
            </Col>
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
                    <th>Tên người nhận</th>
                    <th>Địa chỉ</th>
                    <th>Email</th>
                    <th>Điện thoại</th>
                    <th>Tiền đơn hàng</th>
                    <th>Khách hàng</th>
                    <th>Tình trạng</th>
                    <th>Ngày tạo</th>
                    <th>Ngày cập nhật</th>
                    <th>Tùy chỉnh</th>
                  </tr>
                </thead>
                <Collapse in={!!orders} dimension={"height"}>
                  <tbody>
                    {orders?.results?.map((order) => {
                      const created_date = new Date(order?.created);
                      const updated_date = new Date(order?.updated);
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
                        <tr key={order?.id}>
                          <td>{order?.id}</td>
                          <td>{order?.cus_name}</td>
                          <td>{order?.cus_address}</td>
                          <td>{order?.cus_email}</td>
                          <td>{order?.cus_phone}</td>
                          <td>{order?.ord_cost}</td>
                          <td>{order?.user?.id}</td>
                          <td>
                            {order?.isPaid ? (
                              <Badge bg="success">Đã thanh toán</Badge>
                            ) : (
                              <Badge bg="danger">Chưa thanh toán</Badge>
                            )}
                          </td>
                          <td>{formattedCreatedDate}</td>
                          <td>{formattedUpdatedDate}</td>
                          <td style={{ width: "200px" }}>
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() =>
                                navigate(`/admin/orders/${order?.id}`)
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
          <div className="d-flex justify-content-end align-items-center">
            <PaginationComponent
              numPage={Math.ceil(orders?.count / limit)}
              pageCurrent={page}
              search={search}
            />
          </div>
        </Container>
      </div>
    </orderContext.Provider>
  );
};

export default ManageOrdersPage;
