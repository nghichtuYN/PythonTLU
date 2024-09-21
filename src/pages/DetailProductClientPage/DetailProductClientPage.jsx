import React, { useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryHook } from "../../hooks/useQueryHook";
import { getALLProductItemsByProductIdAPI } from "../../services/productItems";
import { getProductImageByProductItemsAPI } from "../../services/productImgae";
import "./style.css";
import { Heart, Truck } from "lucide-react";
import { TbTruckReturn } from "react-icons/tb";
import { getAllProductVaritaionNoPanination } from "../../services/productVariation";
import { useDispatch } from "react-redux";
import { addOrderProduct } from "../../redux/Order/OrderSlide";

const DetailProductClientPage = () => {
  const { gender, id, itemID } = useParams();
  const [index, setIndex] = useState(0);
  const [hoveredColor, setHoveredColor] = useState(""); // State for color name
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAllVariation = async (id) => {
    const res = await getAllProductVaritaionNoPanination(id);
    return res.data;
  };

  const { data: allVariation, refetch: reFetchVariation } = useQueryHook(
    ["allVariation", itemID],
    () => getAllVariation(itemID)
  );
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleThumbnailClick = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleMouseEnter = (colorName) => {
    setHoveredColor(colorName);
  };

  const handleMouseLeave = () => {
    setHoveredColor(""); // Reset color name when mouse leaves
  };

  const handleClick = (item) => {
    navigate(
      `/${item?.product?.product_name}/prd/${item?.product?.id}/items/${
        item && item?.id
      }`,
      {
        state: { category: item?.product?.product_category?.category_name },
      }
    );
  };

  const location = useLocation();
  const category = location.state.category;
  const { data: productItems, refetch: refetchProductItems } = useQueryHook(
    ["productItems", id],
    async () => {
      try {
        const res = await getALLProductItemsByProductIdAPI(id);
        const items = res.data;
        const productItems = await Promise.all(
          items.map(async (item) => {
            try {
              const itemImages = await getProductImageByProductItemsAPI(
                item.id
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
        return productItems;
      } catch (error) {
        console.log("Error fetching product items:", error);
        return [];
      }
    }
  );

  const currentItem = productItems?.find((item) => item.id === itemID);

  const handleAddOrderProduct = () => {
    dispatch(
      addOrderProduct({
        orderItem: {
          name: currentItem?.product?.product_name,
          amount: 1,
          image: currentItem?.images[0]?.image_filename,
          price: currentItem?.original_price,
          product: currentItem?.id,
        },
      })
    );
  };
  console.log(currentItem)
  return (
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
        {gender === "men" ? "Nam" : "Nữ"} {" > "} {category} {">"}{" "}
        {currentItem?.product?.product_name}
      </Row>

      <Row style={{ padding: "2px 200px" }}>
        <Col md={2}>
          <Row className="d-flex flex-column justify-content-end align-items-end">
            {currentItem?.images?.map((image, idx) => (
              <Col
                className="d-flex justify-content-end align-items-center"
                key={image?.id}
                onClick={() => handleThumbnailClick(idx)}
              >
                <Image
                  src={image?.image_filename}
                  style={{ height: "60px", width: "60px" }}
                  className="mb-2"
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={6}>
          <Carousel
            style={{ height: "654px", width: "512px", border: "1px solid" }}
            activeIndex={index}
            onSelect={handleSelect}
          >
            {currentItem?.images?.map((image) => (
              <Carousel.Item key={image?.id}>
                <Image
                  src={image?.image_filename}
                  style={{
                    height: "654px",
                    width: "100%",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={4}>
          <Row>
            <p
              className="text-start"
              style={{
                fontSize: "18px",
                fontWeight: "400",
                lineHeight: "24px",
              }}
            >
              {currentItem?.product?.product_name}
            </p>
            <p
              className="text-start"
              style={{
                fontSize: "18px",
                fontWeight: "700",
                lineHeight: "24px",
                color: "#666666",
              }}
            >
              {currentItem?.original_price}
            </p>
            <Container>
              <p
                className="text-start"
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  lineHeight: "16px",
                }}
              >
                Colour:{" "}
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    lineHeight: "16px",
                  }}
                >
                  {hoveredColor || currentItem?.colour?.colour_name}
                </span>
              </p>
              <Row className="d-flex justify-content-start align-items-start">
                {productItems?.map((item) => (
                  <Image
                    className="image_item"
                    style={{
                      width: "50px",
                      height: "60px",
                      ...(itemID === item?.id
                        ? { border: "1px solid" }
                        : { border: "none" }),
                    }}
                    key={item?.id}
                    src={item.images[0]?.image_filename}
                    onMouseEnter={() =>
                      handleMouseEnter(item.colour?.colour_name)
                    }
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(item)}
                  />
                ))}
                <Form.Group className="mb-3 mt-3 text-start">
                  <Form.Label>Kích cỡ</Form.Label>
                  <Form.Select>
                    <option>Lựa chọn kích cỡ</option>
                    {allVariation?.map((variation) => (
                      <option key={variation?.id} value={variation?.id}>
                        {variation?.size_option?.size_name}
                      </option>
                    ))}
                  </Form.Select>
                  <div className="d-flex justify-content-start align-items-center gap-2 mt-3">
                    <Button
                      variant="success"
                      className="btn-add-to-cart"
                      size="lg"
                      onClick={handleAddOrderProduct}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                    <Heart size={40} />
                  </div>
                </Form.Group>
                <Card
                  className="text-start"
                  style={{ width: "100%", borderRadius: 0 }}
                >
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted w-100">
                      <Truck size={25} /> Miễn phí vận chuyển dựa trên số lượng
                    </Card.Subtitle>
                    <Card.Subtitle className=" text-muted">
                      <TbTruckReturn size={25} /> Trả hàng miễn phí
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Row>
            </Container>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailProductClientPage;
