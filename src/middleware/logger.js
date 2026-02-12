//  Global Request–Response Logging Middleware
// This middleware logs every incoming request and its corresponding response.
// It captures: HTTP method, endpoint, status code, and response time.

const logger = (req, res, next) => {
  const start = Date.now(); // Record the start time of the request

  // 'finish' event is triggered when the response is sent
  res.on("finish", () => {
    const duration = Date.now() - start; // Calculate response time in ms

    // Log details in the format: METHOD URL STATUS - timems
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });

  // Pass control to the next middleware or route handler
  next();
};

// Export middleware so it can be used globally in server.js
module.exports = logger;
