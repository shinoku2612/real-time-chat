const MenuIcon = ({ isClose, onClick }) => {
  return (
    <div
      className={`w-[20px] h-[15px] relative menu-icon cursor-pointer ${
        isClose ? "close" : ""
      }`}
      onClick={onClick}
    ></div>
  );
};

export default MenuIcon;
