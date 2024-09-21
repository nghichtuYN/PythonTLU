// TableComponent.jsx
import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
const TableComponent = (props) => {
  const { memoizedChildCategories } = props;
  const { gender } = useParams();
  const navigate = useNavigate();
  return (
    <Container className="table-component-container ">
      <Row className="d-flex flex-column">
        {memoizedChildCategories?.map((category) => (
          <Col key={category?.id} className="vertical-line  text-start">
            <div
              onClick={() =>
                navigate(
                  `/${gender}/${category?.category_name}/cat/${category?.id}`
                )
              }
              className="child-category-item"
            >
              {category?.category_name}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default React.memo(TableComponent);
