import express from "express";
import cors from "cors";
import helmet from "helmet"
import "./loadEnvironment.mjs";
import "express-async-errors";
import authRoutes from "./routes/authRoutes.mjs"
import userRoutes from "./routes/userRoutes.mjs"

const PORT = process.env.PORT || 5050;
const app = express();
const corsOptions = {
  origin: "http://localhost:5051",
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

// Configure Helmet to allow API requests
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://apis.google.com"], // Allow scripts from trusted sources
        connectSrc: ["'self'", "http://localhost:5050"], // Allow API calls
      },
    },
  })
);

// Load routes
app.use(authRoutes);
app.use(userRoutes);

// Global error handling
// app.use((err, _req, res, next) => {
//   res.status(500).send("Uh oh! An unexpected error occured.\n" + err);
// })

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// status 403 is forbidden
// status 401 is unauthorized
// status 500 is internal server error
// status 200 is success
// status 204 is no content
// status 404 is not found
// status 400 is bad request