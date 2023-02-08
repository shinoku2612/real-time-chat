import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Search = ({ placeholder, bgColor, onSearch, onFocus }) => {
  function changeHandler(e) {
    onSearch(e);
  }
  function focusHandler() {
    onFocus?.();
  }

  return (
    <div
      className={`flex items-center w-full min-w-36 h-max py-1 px-2 rounded-full ${bgColor} text-black text-[16px] sm:text-[12px] sm:px-1 sm:py-0 sm:rounded-xl`}
    >
      <SearchOutlinedIcon sx={{ fontSize: 20, color: "gray" }} />
      <input
        onFocus={focusHandler}
        onChange={changeHandler}
        placeholder={placeholder}
        onClick={(e) => e.stopPropagation()}
        type="search"
        className="bg-transparent w-full border-none outline-none px-1 placeholder:text-[14px] sm:placeholder:text-[12px]"
      />
    </div>
  );
};

export default Search;
