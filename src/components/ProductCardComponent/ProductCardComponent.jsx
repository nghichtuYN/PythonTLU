import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css"
const ProductCardComponent = ({ product }) => {
  const navigate = useNavigate();
  console.log(product)
  const [currentImage, setCurrentImage] = useState(
    product?.items[0]?.images[0]?.image_filename
  );

  const handleMouseEnter = () => {
    if (product?.items[0]?.images[1]) {
      setCurrentImage(product?.items[0]?.images[1]?.image_filename);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImage(product?.items[0]?.images[0]?.image_filename);
  };

  const handleClick = () => {
    navigate(`/${product?.product_name}/prd/${product?.id}/items/${product && product?.items[0]?.id}`, {
      state: { category: product?.product_category?.category_name },
    });
  };



  return (
    <Col key={product?.id} lg={3} md={3} sm={6} xs={12}>
      <Card 
      className="card"
        style={{ border: "none" }}
      >
        <Card.Img
          style={{ height: "320px" }}
          variant="top"
          src={currentImage}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        />
        <Card.Body >
          <Card.Text className="text-start">{product?.product_name}</Card.Text>
          <Card.Title
            style={{
              fontSize: "16px",
              lineHeight: "20px",
              fontWeight: "700",
            }}
            className="text-start"
          >
            {product?.items[0]?.original_price} VNĐ
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCardComponent;
