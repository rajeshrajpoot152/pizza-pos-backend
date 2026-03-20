const pool = require("./db");

const fixOrdersTable = async () => {
    try {
        console.log("🔄 Fixing Orders Table...");

        // 1. Add cust_name column
        try {
            await pool.query("ALTER TABLE orders ADD COLUMN IF NOT EXISTS cust_name VARCHAR(255)");
            console.log("✅ Added column: cust_name");
        } catch (e) { console.log("ℹ️ cust_name error:", e.message); }

        // 2. Add cust_mobile column
        try {
            await pool.query("ALTER TABLE orders ADD COLUMN IF NOT EXISTS cust_mobile VARCHAR(50)");
            console.log("✅ Added column: cust_mobile");
        } catch (e) { console.log("ℹ️ cust_mobile error:", e.message); }

        console.log("🎉 Orders Table Fixed Successfully!");
        process.exit();

    } catch (err) {
        console.error("❌ Database Connection Error:", err);
        process.exit(1);
    }
};

fixOrdersTable();