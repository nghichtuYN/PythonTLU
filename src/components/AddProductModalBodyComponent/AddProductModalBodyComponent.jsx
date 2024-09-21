import React, { useContext, useEffect, useState } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import "./style.css";
import { ContextProducts } from "../../pages/ManageProduct/ManageProduct";

export default function AddProductModalBodyComponent({ dataRecord }) {
  const { allCategories, allBrands } = useContext(ContextProducts);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [categoryId, setCategoryID] = useState("");
  const [brandId, setBrandId] = useState("");
  useEffect(() => {
    if (dataRecord) {
      dataRecord.current = {
        product_name: productName,
        product_description: productDescription,
        product_category: categoryId,
        brand: brandId,
      };
    }
  }, [dataRecord, productName, productDescription, categoryId, brandId]);
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>
            Tên sản phẩm <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên sản phẩm"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Mô tả sản phẩm</Form.Label>
          <Form.Control
            as="textarea"
            type="password"
            placeholder="Nhập mô tả sản phẩm"
            style={{ height: "100px" }}
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <FloatingLabel
              controlId="floatingSelectGridCategory"
              label={
                <>
                  Danh mục <span className="text-danger">*</span>
                </>
              }
            >
              <Form.Select onChange={(e) => setCategoryID(e.target.value)}>
                <option value={0}>---Chọn danh mục---</option>
                {allCategories?.map((cat) => (
                  <option value={cat?.id} key={cat?.id}>
                    {cat?.category_name}{" "}
                    {cat?.category_description
                      ? "(" + cat?.category_description + ")"
                      : ""}
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
              <Form.Select onChange={(e) => setBrandId(e.target.value)}>
                <option>---Chọn thương hiệu---</option>
                {allBrands?.map((brand) => (
                  <option value={brand?.id} key={brand?.id}>
                    {brand?.brand_name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
          {/* <Form.Group as={Col} md="4" controlId="validationCustom05">
            <FloatingLabel
              controlId="floatingSelectGridColour"
              label={
                <>
                  Màu sắc <span className="text-danger">*</span>
                </>
              }
            >
              <Form.Select>
                <option>---Chọn màu sắc---</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </FloatingLabel>
          </Form.Group> */}
        </Row>
      </Form>
      {/* <Row>
        <Form.Group as={Col} md="6" controlId="validationOriginalPrice">
          <Form.Label>
            Giá gốc <span className="text-danger">*</span>
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              min={0}
              placeholder="Nhập giá gốc"
              className="lh-lg original-price"
            />
            <InputGroup.Text>0.00</InputGroup.Text>
            <InputGroup.Text>VNĐ</InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationSalePrice">
          <Form.Label>
            Giá khuyến mại <span className="text-danger">*</span>
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              min={0}
              placeholder="Nhập giá khuyến mại"
              className="lh-lg sale-price"
            />
            <InputGroup.Text>0.00</InputGroup.Text>
            <InputGroup.Text>VNĐ</InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </Row> */}
      {/* <Row className="align-items-center mb-3">
        <Form.Group as={Col} md="6" controlId="validationQuantity">
          <Form.Label>
            Số lượng trong kho <span className="text-danger">*</span>
          </Form.Label>
          <InputGroup as={Col} md="6">
            <Form.Control
              type="number"
              min={0}
              placeholder="Nhập số lượng"
              className="lh-lg sale-price"
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationSize">
          <Form.Label>
            Kích cỡ <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select>
            <option>---Chọn kích cỡ---</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>
      </Row> */}
      {/* <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>
          Hình ảnh {"("}tối đa 4{")"} <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group> */}
    </>
  );
}
