class Response {
  static success = (status, message, data) => {
    return {
      status: status,
      message: message,
      data: data,
    };
  };

  static error = (status, message) => {
    return {
      status: status,
      message: message,
      data: null,
    };
  };
}

export default Response;
