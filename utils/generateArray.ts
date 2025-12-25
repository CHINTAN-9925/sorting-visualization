export const generateArray = (size: number) => {
  return Array.from({ length: size }, () =>
    Math.floor(Math.random() * 200) + 20
  );
};
