import React from "react";

const BiographyItem = ({ icon, title, description }) => {
  return (
    <li className="w-full h-max flex gap-x-2 items-center justify-between px-2 py-1 sm:flex-col sm:items-start sm:text-[12px]">
      <span className="flex gap-x-2 items-center">
        {icon}
        {title}
      </span>
      <p className="sm:w-full text-end">{description}</p>
    </li>
  );
};

export default BiographyItem;
