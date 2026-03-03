import express from "express";
import cors from "cors";

const app = express();
const initialPort = Number(process.env.PORT) || 5235;

app.use(cors());
app.use(express.json());

const products = [
  {
    _id: "mock-1",
    name: "Women Round Neck Cotton Top",
    description: "Mock product for ProductItem UI",
    price: 199000,
    image: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1716634345448,
    bestseller: true
  },
  {
    _id: "mock-2",
    name: "Men Cotton T-shirt",
    description: "Mock product for ProductItem UI",
    price: 249000,
    image: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    date: 1716621345448,
    bestseller: false
  },
  {
    _id: "mock-3",
    name: "Kids Soft Cotton Tee",
    description: "Mock product for ProductItem UI",
    price: 159000,
    image: ["https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80"],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "M"],
    date: 1716626645448,
    bestseller: true
  },
  {
    _id: "mock-4",
    name: "Women Casual Jacket",
    description: "Mock product for ProductItem UI",
    price: 399000,
    image: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80"],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["M", "L", "XL"],
    date: 1716635445448,
    bestseller: false
  }
];

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/products", (_req, res) => {
  res.json({ success: true, products });
});

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Mock backend running at http://localhost:${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      const nextPort = port + 1;
      console.warn(`Port ${port} is busy, retrying on ${nextPort}...`);
      startServer(nextPort);
      return;
    }

    throw error;
  });
};

startServer(initialPort);
