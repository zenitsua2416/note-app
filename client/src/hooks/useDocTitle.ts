export const useDocTitle = () => {
  const setTitle = (newTitle: string) => {
    document.title = newTitle;
  };

  return { setTitle };
};
