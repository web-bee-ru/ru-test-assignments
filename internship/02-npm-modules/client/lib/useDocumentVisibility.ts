export const useDocumentVisibility: any = () => {
  console.log('implement me');

  return {
    count: 0,
    visible: true,
    onVisibilityChange: () => () => {},
  };
};
