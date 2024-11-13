// delayMiddleware.js
// delayMiddleware.js

export default (req, res, next) => {
    setTimeout(() => next(), 500); // 500 ms delay
  };
  
  