require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./config/db"); // ✅ Shared DB

const app = express();

// ==============================
// ✅ MIDDLEWARE (Old Features Preserved)
// ==============================

// 1. Request Logger (Console me dikhne ke liye)
app.use((req, res, next) => {
    console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// 2. CORS & Parsing
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.use(express.json());

// 3. Static Files (Images ke liye)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==============================
// 📂 ROUTE IMPORTS (All Routes)
// ==============================
const orderRoutes = require("./routes/orderRoutes");       // 👈 Main Fix
const inventoryRoutes = require("./routes/inventoryRoutes");
const leadRoutes = require("./routes/leadRoutes");
const settingRoutes = require("./routes/settingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const staffRoutes = require("./routes/staffRoutes");
const productRoutes = require("./routes/productRoutes");
const masterRoutes = require("./routes/masterRoutes");
const hrmsRoutes = require("./routes/hrmsRoutes");
const roleRoutes = require("./routes/roleRoutes");

// ==============================
// 🔗 API ROUTES MAPPING
// ==============================

// ✅ Orders & Checkout
app.use("/api/orders", orderRoutes);

// ✅ Core Features
app.use("/api/inventory", inventoryRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/settings", settingRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/products", productRoutes);
app.use("/api/hrms", hrmsRoutes);
app.use("/api/roles", roleRoutes);

// ✅ Admin & Auth (FIXED: Ab Login aur Profile dono chalenge)
app.use("/api/admin", adminRoutes); // 👉 /api/admin/login ke liye zaroori hai
app.use("/api", adminRoutes);       // 👉 /api/users/:id (Settings/Sidebar) ke liye zaroori hai

// ✅ Master Data (Dropdowns, Categories, Lead Sources, etc.)
app.use("/api", masterRoutes);

// ==============================
// 🚀 SERVER & DB CONNECTION
// ==============================

// Root Route
app.get("/", (req, res) => {
    res.send("✅ Pizza POS Backend is Running 🚀");
});

// Database Connection Check
db.connect()
    .then((client) => {
        console.log("✅ Database Connected Successfully!");
        client.release(); // Connection free karna achi practice hai
    })
    .catch((err) => console.error("🔥 DB Connection Error:", err.message));

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("=================================");
    console.log(`✅ Server running on port ${PORT}`);
    console.log("=================================");
});