import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { MdOutlineCategory } from "react-icons/md";
import { LuHome } from "react-icons/lu";
import { RiProductHuntLine } from "react-icons/ri";
import { RiMenuFold3Fill } from "react-icons/ri";
import { RiMenuFold4Fill } from "react-icons/ri";
export const FaRegUserIcon = () => {
  return (
    <div>
      <FaRegUser size={25} color="white" />
    </div>
  );
};
export const FaRegHeartIcon = () => {
  return (
    <div>
      <FaRegHeart size={25} color="white" />
    </div>
  );
};
export const HiOutlineShoppingBagIcon = () => {
  return (
    <div>
      <HiOutlineShoppingBag size={25} color="white" />
    </div>
  );
};
export const GoSearchIcon = () => {
  return (
    <div>
      <GoSearch size={25} color="white" />
    </div>
  );
};
export const MdOutlineCategoryIcon = () => {
  return (
    <div>
      <MdOutlineCategory size={15} color="white" />
    </div>
  );
};
export const AiOutlineDashboardIcon = ({ isActive }) => {
  return (
    <div>
      <LuHome size={15} color={isActive ? `white + ${isActive}` : "black"} />
    </div>
  );
};
export const RiProductHuntLineIcon = ({ isActive }) => {

  return (
    <div>
      <RiProductHuntLine
        size={20}
       c
      />
    </div>
  );
};
export const RiMenuFold3FillIcon = ({ Toggle }) => {
  return (
    <div>
      <RiMenuFold3Fill size={30} color="black" onClick={Toggle} />
    </div>
  );
};
export const RiMenuFold4FillIcon = ({ Toggle }) => {
  return (
    <div>
      <RiMenuFold4Fill size={30} color="black" onClick={Toggle} />
    </div>
  );
};
