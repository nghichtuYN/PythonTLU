import React, { useContext } from "react";
import { Pagination } from "react-bootstrap";
import "./style.css";
import { useNavigate } from "react-router-dom";
import {
  handleFirst,
  handleLast,
  handlePageNext,
  handlePagePrevious,
  renderPaginationItems,
} from "./handlePanination";
import { ContextCategory } from "../../pages/ManageCategoryPage/ManageCategoryPage";
import { ContextSizeCategory } from "../../pages/SizeCategoryPage/SizeCategoryPage";
import { ContextProducts } from "../../pages/ManageProduct/ManageProduct";
import { DetailProductContext } from "../../pages/DetailProductPage/DetailProductPage";
import { orderContext } from "../../pages/ManageOrdersPage/ManageOrdersPage";
export default function PaginationComponent(props) {
  const { numPage, pageCurrent, search } = props;
  const navigate = useNavigate();
  const pagesCurrent = Number(pageCurrent);
  const pageNumbers = Array.from({ length: numPage }, (_, index) => index);
  const { isCategory } = useContext(ContextCategory);
  const { isSizeCategory } = useContext(ContextSizeCategory);
  const { isProduct } = useContext(ContextProducts);
  const { isProductItems, product } = useContext(DetailProductContext);
  const { isOrders } = useContext(orderContext);
  const id = product?.id;
  return (
    <Pagination>
      <Pagination.First
        disabled={pagesCurrent === 1}
        onClick={() =>
          handleFirst(
            navigate,
            search,
            isCategory,
            isSizeCategory,
            isProduct,
            isProductItems,
            id,
            isOrders
          )
        }
      />
      <Pagination.Prev
        disabled={pagesCurrent === 1}
        tabIndex={-1}
        aria-disabled="true"
        onClick={() => {
          handlePagePrevious(
            pagesCurrent,
            navigate,
            search,
            isCategory,
            isSizeCategory,
            isProduct,
            isProductItems,
            id,
            isOrders
          );
        }}
      />
      {renderPaginationItems(
        pageNumbers,
        pagesCurrent,
        numPage,
        navigate,
        search,
        isCategory,
        isSizeCategory,
        isProduct,
        isProductItems,
        id,
        isOrders
      )}
      <Pagination.Next
        disabled={pagesCurrent === numPage}
        onClick={() => {
          handlePageNext(
            pagesCurrent,
            navigate,
            search,
            isCategory,
            isSizeCategory,
            isProduct,
            isProductItems,
            id,
            isOrders
          );
        }}
      />
      <Pagination.Last
        disabled={pagesCurrent === numPage}
        onClick={() => {
          handleLast(
            navigate,
            numPage,
            search,
            isCategory,
            isSizeCategory,
            isProduct,
            isProductItems,
            id,
            isOrders
          );
        }}
      />
    </Pagination>
  );
}
