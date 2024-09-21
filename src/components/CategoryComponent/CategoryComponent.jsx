import React, { useState, useEffect } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "./style.css";
import { useQueryHook } from "../../hooks/useQueryHook";
import TableComponent from "../TableComponent/TableComponent.jsx";
import { getAllChildCategoresByID } from "../../services/productCategory";

const CategoryComponent = (props) => {
  const { memoizedCategory } = props;
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { data: childCategoriesWithSubChildren = [], refetch } = useQueryHook(
    ["childCategories", hoveredIndex],
    async () => {
      const res = await getAllChildCategoresByID(hoveredIndex);
      const childCategories = res.data;

      return childCategories;
    },
    {
      enabled: !!hoveredIndex,
    }
  );
  useEffect(() => {
    if (hoveredIndex !== null) {
      refetch();
    }
  }, [hoveredIndex, refetch]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      <Navbar
        style={{ backgroundColor: "#525050" }}
        className="category-navbar d-none d-lg-flex gap-5"
      >
        <Container className="container" style={{ padding: 0, margin: 0, marginLeft: '70px' }}>
          <Nav className="category-nav me-auto d-flex justify-content-start align-items-center">
            {memoizedCategory.map((category) => (
              <div
                key={category?.id}
                className="category-wrapper"
                onMouseEnter={() => handleMouseEnter(category?.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Nav.Link className="category text-center pt-3">
                  {category.category_name}
                </Nav.Link>
                {hoveredIndex === category?.id && (
                  <div className="hover-menu">
                    {childCategoriesWithSubChildren?.length > 0 && (
                      <TableComponent
                        memoizedChildCategories={childCategoriesWithSubChildren}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default CategoryComponent;
