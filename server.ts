import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("oficina.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS affiliates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    neighborhood TEXT,
    code TEXT NOT NULL UNIQUE,
    referrals_count INTEGER DEFAULT 0,
    reward_released BOOLEAN DEFAULT 0,
    reward_paid BOOLEAN DEFAULT 0,
    total_paid INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    car_brand TEXT,
    problem_type TEXT,
    referral_code TEXT,
    payment_confirmed BOOLEAN DEFAULT 0,
    service_value INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // API Routes
  
  // Register Affiliate
  app.post("/api/affiliates", (req, res) => {
    const { name, phone, neighborhood } = req.body;
    try {
      const code = "FR" + Math.floor(1000 + Math.random() * 9000);
      const stmt = db.prepare("INSERT INTO affiliates (name, phone, neighborhood, code) VALUES (?, ?, ?, ?)");
      stmt.run(name, phone, neighborhood, code);
      res.json({ success: true, code });
    } catch (error: any) {
      if (error.message.includes("UNIQUE constraint failed")) {
        res.status(400).json({ error: "Telefone já cadastrado." });
      } else {
        res.status(500).json({ error: "Erro ao cadastrar afiliado." });
      }
    }
  });

  // Register Customer
  app.post("/api/customers", (req, res) => {
    const { name, phone, car_brand, problem_type, referral_code } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO customers (name, phone, car_brand, problem_type, referral_code) VALUES (?, ?, ?, ?, ?)");
      stmt.run(name, phone, car_brand, problem_type, referral_code || null);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Erro ao enviar solicitação." });
    }
  });

  // Admin Routes (Simple Auth for Demo)
  const ADMIN_PASSWORD = "admin123"; // In a real app, use env and hashing

  app.post("/api/admin/login", (req, res) => {
    if (req.body.password === ADMIN_PASSWORD) {
      res.json({ success: true, token: "mock-token" });
    } else {
      res.status(401).json({ error: "Senha incorreta" });
    }
  });

  app.get("/api/admin/affiliates", (req, res) => {
    const affiliates = db.prepare("SELECT * FROM affiliates ORDER BY referrals_count DESC").all();
    res.json(affiliates);
  });

  app.get("/api/admin/customers", (req, res) => {
    const customers = db.prepare("SELECT * FROM customers ORDER BY created_at DESC").all();
    res.json(customers);
  });

  app.post("/api/admin/confirm-payment", (req, res) => {
    const { customerId, serviceValue } = req.body;
    try {
      const customer = db.prepare("SELECT * FROM customers WHERE id = ?").get() as any;
      if (!customer) return res.status(404).json({ error: "Cliente não encontrado" });
      if (customer.payment_confirmed) return res.status(400).json({ error: "Pagamento já confirmado" });

      db.prepare("UPDATE customers SET payment_confirmed = 1, service_value = ? WHERE id = ?").run(serviceValue, customerId);

      if (customer.referral_code) {
        const affiliate = db.prepare("SELECT * FROM affiliates WHERE code = ?").get() as any;
        if (affiliate) {
          const newCount = affiliate.referrals_count + 1;
          const rewardReleased = newCount >= 2 ? 1 : 0;
          db.prepare("UPDATE affiliates SET referrals_count = ?, reward_released = ? WHERE id = ?")
            .run(newCount, rewardReleased, affiliate.id);
        }
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Erro ao confirmar pagamento" });
    }
  });

  app.post("/api/admin/pay-reward", (req, res) => {
    const { affiliateId } = req.body;
    try {
      const affiliate = db.prepare("SELECT * FROM affiliates WHERE id = ?").get() as any;
      if (!affiliate || !affiliate.reward_released) return res.status(400).json({ error: "Prêmio não disponível" });
      
      db.prepare("UPDATE affiliates SET reward_paid = 1, total_paid = total_paid + 15000, referrals_count = referrals_count - 2, reward_released = 0 WHERE id = ?")
        .run(affiliateId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Erro ao pagar prêmio" });
    }
  });

  app.get("/api/stats", (req, res) => {
    const totalCustomers = db.prepare("SELECT COUNT(*) as count FROM customers WHERE payment_confirmed = 1").get() as any;
    const totalPaidRewards = db.prepare("SELECT SUM(total_paid) as total FROM affiliates").get() as any;
    res.json({
      customersServed: totalCustomers.count,
      rewardsPaid: totalPaidRewards.total || 0
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
