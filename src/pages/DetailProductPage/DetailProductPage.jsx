import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../layouts/AdminLayout/AdminLayout";
import { getDetailProductAPI, updateProduct } from "../../services/products";
import { useQueryHook } from "../../hooks/useQueryHook";
import {
  deleteManyProductItemsAPI,
  deleteProductItemsAPI,
  getProductItemsByProductIdAPI,
} from "../../services/productItems";
import { getProductImageByProductItemsAPI } from "../../services/productImgae";
import {
  Button,
  Col,
  Collapse,
  Container,
  FloatingLabel,
  Form,
  Image,
  OverlayTrigger,
  Popover,
  Row,
  Table,
} from "react-bootstrap";
import { BsCheck2Circle } from "react-icons/bs";
import ModalAddComponent from "../../components/ModalAddComponent/ModalAddComponent";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { AdninSearchComponent } from "../../components/AdminSearchComponent/AdminSearchComponent";
import { TiPlus } from "react-icons/ti";
import { SpinnetComponent } from "../../components/SpinnetComponent/SpinnetComponent";
import { getAllColourNoPaninationAPI } from "../../services/colour";
import { useMutationHook } from "../../hooks/useMutationHook";
import { getAllCategoriesNoPaninationAPI } from "../../services/productCategory";
import { getBrandsNoPaninationAPI } from "../../services/brands";
import noimage from "../../assets/images/noimage.jpg";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import { useDebounce } from "@uidotdev/usehooks";
export const DetailProductContext = createContext("unknown");

const DetailProductPage = () => {
  const { id } = useParams();
  const { setToaster } = useContext(Context);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isDetailProduct = "Chi tiết sản phẩm";
  const isProductItems = "Mẫu mã sản phẩm";
  const placeholder = "Tìm kiếm...";
  const [checkedItems, setCheckedItems] = useState([]);
  const [currentPopoverId, setCurrentPopoverId] = useState(null);
  const [showPopover, setShowPopover] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [categoryId, setCategoryID] = useState("");
  const [brandId, setBrandId] = useState("");
  const limit = 10;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const debouncedSearchTerm = useDebounce(search, 1000);

  const getDetailProductByID = async (id) => {
    try {
      const res = await getDetailProductAPI(id);
      return res.data;
    } catch (error) {
      return null;
    }
  };

  const getProductItemsByProductId = async (navigate, id, page, search) => {
    try {
      const res = await getProductItemsByProductIdAPI(
        navigate,
        id,
        page,
        search
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: product,
    isLoading,
    refetch,
  } = useQueryHook(["product", id], () => getDetailProductByID(id), {
    enabled: !!id,
  });

  const { data: productItems, refetch: refetchProductItems } = useQueryHook(
    ["productItems", navigate, id, page, debouncedSearchTerm],
    () => getProductItemsByProductId(navigate, id, page, debouncedSearchTerm)
  );

  useEffect(() => {
    if (product) {
      setProductName(product?.product_name);
      setProductDescription(product?.product_description);
      setBrandId(product?.brand?.id);
      setCategoryID(product?.product_category?.id);
    }
  }, [product]);

  const handleCancel = () => {
    setShowPopover(false);
  };

  const getAllColourNoPanination = async () => {
    const res = await getAllColourNoPaninationAPI();
    return res.data;
  };

  const getAllProductCategoryNoPanination = async () => {
    const res = await getAllCategoriesNoPaninationAPI();
    return res.data;
  };

  const getAllBrandsNoPanination = async () => {
    const res = await getBrandsNoPaninationAPI();
    return res.data;
  };

  const { data: allColours } = useQueryHook(
    ["allColours"],
    getAllColourNoPanination,
    { enabled: !!show }
  );

  const { data: allBrands } = useQueryHook(
    ["allBrands"],
    getAllBrandsNoPanination
  );
  const { data: allCategories } = useQueryHook(
    ["allCategories"],
    getAllProductCategoryNoPanination
  );

  const onSuccessDelete = () => {
    if (checkedItems?.length === productItems?.results?.length) {
      console.log(page, page === 1, page === "1", typeof page);
      if (page !== "1") {
        console.log("run1");
        if (search !== "")
          navigate(
            `/admin/product/detailProduct/?page=${
              page - 1
            }&search=${encodeURIComponent(search)}`
          );
        else
          navigate(
            `/admin/product/detailProduct/${product?.id}/?page=${page - 1}`
          );
        setCheckedItems([]);
        refetchProductItems();
      } else {
        if (search !== "")
          navigate(
            `/admin/product/detailProduct/${
              product?.id
            }/?page=${1}&search=${encodeURIComponent(search)}`
          );
        else navigate(`/admin/product/detailProduct/${product?.id}/?page=${1}`);
        setCheckedItems([]);
        refetchProductItems();
      }
    } else {
      setCheckedItems([]);
      refetchProductItems();
    }
    setToaster({
      type: "success",
      message: "Xóa thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
  };
  const mutationDeleteMany = useMutationHook(
    deleteManyProductItemsAPI,
    onSuccessDelete
  );

  const handleDeleteMany = async () => {
    mutationDeleteMany.mutate({
      productItems: checkedItems,
      idProduct: product?.id,
    });
  };

  const onSuccessDeleteSingle = () => {
    if (productItems?.results.length === 1) {
      if (page !== "1") {
        if (search !== "") {
          navigate(
            `/admin/product/detailProduct/?page=${
              page - 1
            }&search=${encodeURIComponent(search)}`
          );
        } else {
          navigate(
            `/admin/product/detailProduct/${product?.id}/?page=${page - 1}`
          );
        }
      } else {
        if (search !== "")
          navigate(
            `/admin/product/detailProduct/${
              product?.id
            }/?page=${1}&search=${encodeURIComponent(search)}`
          );
        else navigate(`/admin/product/detailProduct/${product?.id}/?page=${1}`);
      }
    } else {
      refetchProductItems();
    }
    setToaster({
      type: "success",
      message: "Xóa thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
  };
  const mutaionDeleteSingleProduct = useMutationHook((data) => {
    const { idProductitem, idProduct } = data;
    return deleteProductItemsAPI(idProductitem, idProduct);
  }, onSuccessDeleteSingle);

  const handleDeleteSingle = () => {
    mutaionDeleteSingleProduct.mutate({
      idProductitem: currentPopoverId,
      idProduct: product?.id,
    });
  };

  const handleCheckItem = (id) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(id)
        ? prevCheckedItems.filter((item) => item !== id)
        : [...prevCheckedItems, id]
    );
  };

  const isChecked = (id) => checkedItems.includes(id);

  const handleCheckAll = () => {
    setCheckedItems(
      checkedItems.length === productItems?.results?.length
        ? []
        : productItems?.results?.map((item) => item?.id)
    );
  };

  const onSuccess = () => {
    refetch();
    setToaster({
      type: "success",
      message: "Cập nhật thành công🚀",
      show: true,
      icon: <BsCheck2Circle size={40} color="white" />,
    });
  };

  const updateProducts = async (data) => {
    const { id, ...rest } = data;
    return updateProduct(id, rest);
  };

  const mutationUpdate = useMutationHook(updateProducts, onSuccess);

  const handleConfirmUpdate = () => {
    mutationUpdate.mutate({
      id: product?.id,
      product_name: productName,
      product_category: categoryId,
      brand: brandId,
    });
  };

  const popover = (
    <Popover id={`popover-positioned-top`}>
      <Popover.Header as="h3">Xóa tất cả mục đã chọn</Popover.Header>
      <Popover.Body className="d-flex justify-content-around align-items-center">
        <Button size="sm" variant="danger">
          Hủy
        </Button>
        <Button
          size="sm"
          onClick={() => {
            handleDeleteMany();
            handleCancel();
          }}
        >
          Xác nhận
        </Button>
      </Popover.Body>
    </Popover>
  );
  const handleCancelSingle = () => {
    setCurrentPopoverId(null);
  };

  const handleTogglePopover = (id) => {
    setCurrentPopoverId(currentPopoverId === id ? null : id);
  };

  const popoverSingle = (
    <Popover id={`popover-positioned-top`}>
      <Popover.Header as="h3">Bạn có chắc chắn xóa ?</Popover.Header>
      <Popover.Body className="d-flex justify-content-around align-items-center">
        <Button size="sm" variant="danger" onClick={handleCancelSingle}>
          Hủy
        </Button>
        <Button
          size="sm"
          onClick={() => {
            handleCancelSingle();
            handleDeleteSingle();
          }}
        >
          Xác nhận
        </Button>
      </Popover.Body>
    </Popover>
  );

  const value = useMemo(
    () => ({ isDetailProduct, product, isProductItems }),
    [isDetailProduct, product, isProductItems]
  );
  return (
    <DetailProductContext.Provider value={value}>
      <>
        {isLoading ? (
          <SpinnetComponent />
        ) : (
          <div
            className="manage-product-detail-page pb-2"
            style={{ backgroundColor: "#f3f3f4", height: "auto" }}
          >
            <Container className="ps-4 pe-4">
              <Row className="pt-4">
                <Col className="text-start ps-5 fw-bolder fs-5">
                  <p>
                    {isDetailProduct}: {product?.product_name} <u />
                  </p>
                </Col>
                <Col className="text-end pe-5">
                  <span
                    className="fw-bolder "
                    // onClick={() => navigate("/admin/categories")}
                  >
                    Sản phẩm{" "}
                  </span>
                  {">"} Quản lý sản phẩm {">"} Chi tiết tiết sản phẩm
                </Col>
              </Row>
              <div className="mt-3" style={{ backgroundColor: "#ffffff" }}>
                <Row className="pt-4 mb-4">
                  <Col className="d-flex justify-content-start gap-1 ms-5 align-items-center">
                    {checkedItems?.length > 0 && (
                      <OverlayTrigger
                        trigger="click"
                        placement={"top"}
                        overlay={popover}
                        show={showPopover}
                        onToggle={() => setShowPopover(!showPopover)}
                      >
                        <Button
                          className="del-btn"
                          variant="outline-dark"
                          size="md"
                          onClick={() => setShowPopover(!showPopover)}
                        >
                          <MdDeleteOutline />
                        </Button>
                      </OverlayTrigger>
                    )}
                    <Button
                      className="add-btn"
                      size="md"
                      style={{ border: "none" }}
                      onClick={handleShow}
                    >
                      <TiPlus />
                      Thêm mẫu mã mới
                    </Button>
                  </Col>
                  <Col className="d-flex justify-content-end gap-1 ms-5 align-items-center">
                    <Button
                      onClick={handleConfirmUpdate}
                      variant="dark"
                      className="me-3 my-3"
                    >
                      Xác nhận
                    </Button>
                  </Col>
                </Row>
                <Form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formCategoryName"
                  >
                    <Form.Label className="text-start ps-4" column sm="2">
                      Tên sản phẩm:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formCategoryDescriptions"
                  >
                    <Form.Label className="text-start ps-4" column sm="2">
                      Mô tả sản phẩm:
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        value={productDescription}
                        as="textarea"
                        onChange={(e) => setProductDescription(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Row className="mb-3 pe-5 ps-5">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                      <FloatingLabel
                        controlId="floatingSelectGridCategory"
                        label={
                          <>
                            Danh mục <span className="text-danger">*</span>
                          </>
                        }
                      >
                        <Form.Select
                          onChange={(e) => setCategoryID(e.target.value)}
                        >
                          <option value={0}>---Chọn danh mục---</option>
                          {allCategories?.map((cat) => (
                            <option
                              selected={categoryId === cat?.id}
                              value={cat?.id}
                              key={cat?.id}
                            >
                              {cat?.category_name}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom04">
                      <FloatingLabel
                        controlId="floatingSelectGridBrand"
                        label={
                          <>
                            Thương hiệu <span className="text-danger">*</span>
                          </>
                        }
                      >
                        <Form.Select
                          onChange={(e) => setBrandId(e.target.value)}
                        >
                          <option>---Chọn thương hiệu---</option>
                          {allBrands?.map((brand) => (
                            <option
                              selected={brandId === brand?.id}
                              value={brand?.id}
                              key={brand?.id}
                            >
                              {brand?.brand_name}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formChildCategories"
                  >
                    <Form.Label className="text-start ps-4">
                      Danh sách mẫu mã:
                    </Form.Label>
                    <Col className="d-flex justify-content-end me-5 align-items-center">
                      <AdninSearchComponent
                        onChange={onChange}
                        placeholder={placeholder}
                        value={search}
                      />
                    </Col>
                    <Table
                      responsive
                      className="category-table"
                      style={{ overflowY: "scroll" }}
                    >
                      <thead>
                        <tr style={{ backgroundColor: "grey" }}>
                          <th>
                            <Form.Check
                              onChange={handleCheckAll}
                              checked={
                                checkedItems?.length ===
                                productItems?.results?.length
                              }
                            />
                          </th>
                          <th>Tên sản phẩm</th>
                          <th>Hình ảnh 1</th>
                          <th>Hình ảnh 2</th>
                          <th>Hình ảnh 3</th>
                          <th>Hình ảnh 4</th>
                          <th>Màu sắc</th>
                          <th>Giá gốc</th>
                          <th>Giá khuyến mại</th>
                          <th>Ngày tạo</th>
                          <th>Ngày cập nhật</th>
                          <th>Tùy chỉnh</th>
                        </tr>
                      </thead>
                      <Collapse in={!!productItems} dimension={"height"}>
                        <tbody>
                          {productItems?.results?.map((productItem) => {
                            const created_date = new Date(productItem?.created);
                            const updated_date = new Date(productItem?.updated);
                            const formattedCreatedDate =
                              created_date.toLocaleString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              });
                            const formattedUpdatedDate =
                              updated_date.toLocaleString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              });
                            return (
                              <tr key={productItem?.id}>
                                <td>
                                  <Form.Check
                                    checked={isChecked(productItem?.id)}
                                    onChange={() =>
                                      handleCheckItem(productItem?.id)
                                    }
                                  />
                                </td>
                                <td>{product?.product_name}</td>
                                {/* <td>{product?.product_name}</td> */}
                                {[...Array(4)].map((_, index) => (
                                  <td key={index}>
                                    {" "}
                                    <Image
                                      src={
                                        productItem?.images[index]
                                          ?.image_filename
                                          ? productItem?.images[index]
                                              ?.image_filename
                                          : noimage
                                      }
                                      style={{ width: "60px", height: "60px" }}
                                    />
                                  </td>
                                ))}
                                <td>{productItem?.colour?.colour_name}</td>
                                <td>{productItem?.original_price}</td>
                                <td>{productItem?.sale_price}</td>
                                <td>{formattedCreatedDate}</td>
                                <td>{formattedUpdatedDate}</td>
                                <td style={{ width: "200px" }}>
                                  <Button
                                    variant="success"
                                    onClick={() =>
                                      navigate(
                                        `/admin/product/productItem/${productItem?.id}`
                                      )
                                    }
                                  >
                                    <IoEyeOutline />
                                  </Button>
                                  <OverlayTrigger
                                    trigger="click"
                                    placement={"top"}
                                    overlay={popoverSingle}
                                    show={currentPopoverId === productItem?.id}
                                    onToggle={() =>
                                      handleTogglePopover(productItem?.id)
                                    }
                                    rootClose={true}
                                  >
                                    <Button
                                      variant="danger"
                                      onClick={() =>
                                        handleTogglePopover(productItem?.id)
                                      }
                                      className="ms-2 d-flex-inline"
                                    >
                                      <MdDeleteOutline />
                                    </Button>
                                  </OverlayTrigger>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Collapse>
                    </Table>
                  </Form.Group>
                </Form>

                <div className="d-flex justify-content-end align-items-center">
                  <PaginationComponent
                    numPage={Math.ceil(productItems?.count / limit)}
                    pageCurrent={page}
                    next={productItems?.next}
                    previous={productItems?.previous}
                    refetch={refetchProductItems}
                    search={search}
                  />
                </div>
              </div>
            </Container>
            <ModalAddComponent
              handleClose={handleClose}
              handleShow={handleShow}
              show={show}
              refetch={refetchProductItems}
              product={product}
              allColours={allColours}
            />
          </div>
        )}
      </>
    </DetailProductContext.Provider>
  );
};

export default DetailProductPage;
