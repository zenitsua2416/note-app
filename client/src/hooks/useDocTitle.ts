export const useDocTitle = () => {
  const setTitle = (newTitle) => {
    document.title = newTitle;
  };

  return { setTitle };
};
