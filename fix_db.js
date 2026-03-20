const pool = require("./db"); // Ye ensure karega ki database connection mil jaye

const fixDatabase = async () => {
    try {
        console.log("🔄 Fixing Database Schema...");

        // 1. Add 'variants' column (Ye sabse jaruri hai)
        try {
            await pool.query("ALTER TABLE products ADD COLUMN variants TEXT DEFAULT '[]'");
            console.log("✅ Added column: variants");
        } catch (e) { 
            // Agar column pehle se hai to error ignore karein
            if (e.code !== '42701') console.log("ℹ️ Error adding variants:", e.message); 
        }

        // 2. Add 'is_jain' column
        try {
            await pool.query("ALTER TABLE products ADD COLUMN is_jain BOOLEAN DEFAULT FALSE");
            console.log("✅ Added column: is_jain");
        } catch (e) { if (e.code !== '42701') console.log("ℹ️ Error adding is_jain:", e.message); }

        // 3. Add 'calories' column
        try {
            await pool.query("ALTER TABLE products ADD COLUMN calories VARCHAR(50)");
            console.log("✅ Added column: calories");
        } catch (e) { if (e.code !== '42701') console.log("ℹ️ Error adding calories:", e.message); }

        // 4. Add 'tag' column
        try {
            await pool.query("ALTER TABLE products ADD COLUMN tag VARCHAR(50)");
            console.log("✅ Added column: tag");
        } catch (e) { if (e.code !== '42701') console.log("ℹ️ Error adding tag:", e.message); }

        console.log("🎉 Database Fixed Successfully! Ab aap backend restart kar sakte hain.");
        process.exit();

    } catch (err) {
        console.error("❌ Database Connection Error:", err);
        process.exit(1);
    }
};

fixDatabase();