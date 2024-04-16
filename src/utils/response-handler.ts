const success = (message: string, data: any, code: number) => {
  return {
    message,
    code,
    data,
  };
}

const error = (message: string, code: number) => {
  return {
    message,
    code,
  };
}

export {
  success,
  error,
}

