const validateRequest = (requiredKeys: string[], request: Record<string, any>): boolean => {
  const requestKeys = new Set(Object.keys(request));

  // check if all required keys are present in the request and none of them is empty
  return requiredKeys.every((key) => requestKeys.has(key) && request[key]);
};


export { validateRequest };