// tests/products.test.js
const request = require("supertest");
const app     = require("../src/app");

let testUserId;
let createdProductId;

beforeAll(async () => {
  // Crear usuario de apoyo para los tests de productos
  const res = await request(app)
    .post("/api/users")
    .send({ name: "Prod Tester", email: `prodtest_${Date.now()}@bia.app`, role: "user" });
  testUserId = res.body.data.id;
});

afterAll(async () => {
  // Limpiar usuario de apoyo (borra sus productos por CASCADE)
  await request(app).delete(`/api/users/${testUserId}`);
});

describe("Products API", () => {

  describe("GET /api/products", () => {
    it("devuelve lista de productos con success:true", async () => {
      const res = await request(app).get("/api/products");
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe("POST /api/products", () => {
    it("crea un producto y devuelve 201", async () => {
      const res = await request(app)
        .post("/api/products")
        .send({ name: "Producto Test", price: 99.9, stock: 5, user_id: testUserId });
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe("Producto Test");
      createdProductId = res.body.data.id;
    });

    it("rechaza crear sin name (400)", async () => {
      const res = await request(app)
        .post("/api/products")
        .send({ price: 10, user_id: testUserId });
      expect(res.statusCode).toBe(400);
    });

    it("rechaza user_id inexistente (404)", async () => {
      const res = await request(app)
        .post("/api/products")
        .send({ name: "X", price: 10, user_id: 999999 });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("GET /api/products/:id", () => {
    it("devuelve el producto creado", async () => {
      const res = await request(app).get(`/api/products/${createdProductId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.id).toBe(createdProductId);
    });

    it("devuelve 404 para id inexistente", async () => {
      const res = await request(app).get("/api/products/999999");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("PUT /api/products/:id", () => {
    it("actualiza el precio del producto", async () => {
      const res = await request(app)
        .put(`/api/products/${createdProductId}`)
        .send({ price: 149.9 });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.price).toBe(149.9);
    });
  });

  describe("DELETE /api/products/:id", () => {
    it("elimina el producto creado", async () => {
      const res = await request(app).delete(`/api/products/${createdProductId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe("GET /api/users/:id/products", () => {
    it("devuelve productos del usuario", async () => {
      const res = await request(app).get(`/api/users/${testUserId}/products`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

});
