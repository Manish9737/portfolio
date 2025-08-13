const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const logger = require("morgan");
const connectDB = require("./config/DB");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const techStackRoutes = require("./routes/techStackRoutes");
const visitRouter = require("./routes/visitsRouter");
const contactRouter = require("./routes/contactUsRoutes");
const blogRouter = require("./routes/blogsRoutes");

require("dotenv").config();

const app = express();

// Connect to database
connectDB();

// CORS options
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/visits", visitRouter);
app.use("/api/projects", projectRoutes);
app.use("/api/techStack", techStackRoutes);
app.use("/api/contact", contactRouter);
app.use("/api/blogs", blogRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
