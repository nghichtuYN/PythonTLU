import React from "react";
import { useParams } from "react-router-dom";
import { getProductByCatId } from "../../services/products";
import { useQueryHook } from "../../hooks/useQueryHook";
import { Col, Container, Dropdown, DropdownButton, Row } from "react-bootstrap";
import { getALLProductItemsByProductIdAPI } from "../../services/productItems";
import "./style.css";
import ProductCardComponent from "../../components/ProductCardComponent/ProductCardComponent";
import { getAllSizeOptionsV2 } from "../../services/sizeOption";
import { getAllColourNoPaninationAPI } from "../../services/colour";
const CategoryDetailClient = () => {
  const { gender, id, category } = useParams();

  const getAllProductByID = async (id) => {
    const res = await getProductByCatId({ catId: id });
    return res.data;
  };
  const { data: allProduct = [], isFetching } = useQueryHook(
    ["allProduct", id],
    async () => {
      try {
        const product = await getAllProductByID(id);
        const productItemsWithImages = await Promise.all(
          product.map(async (pro) => {
            try {
              const item = await getALLProductItemsByProductIdAPI(pro.id);
              return {
                ...pro,
                items: item || [],
              };
            } catch (error) {
              console.log(`Error fetching data for product ${pro.id}:`, error);
              return {
                ...pro,
                items: [],
              };
            }
          })
        );

        return productItemsWithImages;
      } catch (error) {
        console.log("Error fetching all products:", error);
        return [];
      }
    }
  );

  const idSizeCategory = allProduct[0]?.product_category?.size_category?.id;
  const getALlSizeOption = async (id) => {
    const res = await getAllSizeOptionsV2({ id });
    return res.data;
  };

  const getAllColour = async () => {
    const res = await getAllColourNoPaninationAPI();
    return res.data;
  };

  const { data: allSizeOption } = useQueryHook(
    ["allSizeOption", idSizeCategory],
    () => getALlSizeOption(idSizeCategory)
  );
  const { data: allColour } = useQueryHook(["allColour"], getAllColour);
  console.log(allColour);
  return (
    <>
      {isFetching ? (
        "Đang tải"
      ) : (
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
            {gender === "men" ? "Nam" : "Nữ"} {" > "} {category}
          </Row>
          <Row
            className="nav-navigate d-flex justify-content-center align-items-center gap-2 fw-bolder"
            style={{
              lineHeight: "30px",
              height: "145px",
              fontSize: "24px",
              padding: "0 120px",
            }}
          >
            {category}
          </Row>
          <Row style={{ padding: "0 120px", backgroundColor: "#eeeeee" }}>
            <Col md={2} className="mb-2 mt-2">
              <DropdownButton variant="seccondary" title="Sắp xếp">
                <Dropdown.Item href="#/action-1">
                  Giá từ thấp đến cao
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  Giá từ cao đến thấp
                </Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col md={2} className="mb-2 mt-2">
              <DropdownButton variant="seccondary" title="Kích cỡ">
                {allSizeOption &&
                  allSizeOption?.map((size) => (
                    <Dropdown.Item key={size?.id}>
                      {size?.size_name}
                    </Dropdown.Item>
                  ))}
              </DropdownButton>
            </Col>
            <Col md={2} className="mb-2 mt-2">
              <DropdownButton variant="seccondary" title="Thương hiệu">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col md={2} className="mb-2 mt-2">
              <DropdownButton variant="seccondary" title="Màu sắc">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col md={2} className="mb-2 mt-2">
              <DropdownButton variant="seccondary" title="Khoảng giá">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
          <Row style={{ padding: "0 120px" }} className="d-flex ">
            <p className="pt-2">{allProduct?.length} kết quả</p>
            {allProduct?.map((product) => (
              <ProductCardComponent key={product?.id} product={product} />
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default CategoryDetailClient;
