const useSearch = (callback) => {
  const searchHandler = (() => {
    let id = null;
    return (e) => {
      id && clearTimeout(id);
      id = setTimeout(() => {
        callback(e.target.value.trim());
      }, 500);
    };
  })();


  return searchHandler;
};

export default useSearch;
