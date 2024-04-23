const validateRequest = (requiredKeys: string[], request: object): boolean => {
  const requestKeys = new Set(Object.keys(request));
  return requiredKeys.every((key) => requestKeys.has(key));
};


export { validateRequest };