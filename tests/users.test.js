// tests/users.test.js
const request = require("supertest");
const app     = require("../src/app");

// Usamos un email único por ejecución para evitar conflictos
const TEST_EMAIL = `test_${Date.now()}@bia.app`;
let createdUserId;

describe("Users API", () => {

  // ── GET /api/users ─────────────────────────────────────────────────────────
  describe("GET /api/users", () => {
    it("devuelve lista de usuarios con success:true", async () => {
      const res = await request(app).get("/api/users");
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(typeof res.body.total).toBe("number");
    });
  });

  // ── POST /api/users ────────────────────────────────────────────────────────
  describe("POST /api/users", () => {
    it("crea un usuario y devuelve 201", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({ name: "Test User", email: TEST_EMAIL, role: "user" });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe(TEST_EMAIL);
      createdUserId = res.body.data.id;
    });

    it("rechaza crear usuario sin email (400)", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({ name: "Sin Email" });
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("rechaza email duplicado (409)", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({ name: "Duplicado", email: TEST_EMAIL });
      expect(res.statusCode).toBe(409);
      expect(res.body.success).toBe(false);
    });
  });

  // ── GET /api/users/:id ─────────────────────────────────────────────────────
  describe("GET /api/users/:id", () => {
    it("devuelve el usuario creado", async () => {
      const res = await request(app).get(`/api/users/${createdUserId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.id).toBe(createdUserId);
    });

    it("devuelve 404 para id inexistente", async () => {
      const res = await request(app).get("/api/users/999999");
      expect(res.statusCode).toBe(404);
    });
  });

  // ── PUT /api/users/:id ─────────────────────────────────────────────────────
  describe("PUT /api/users/:id", () => {
    it("actualiza el nombre del usuario", async () => {
      const res = await request(app)
        .put(`/api/users/${createdUserId}`)
        .send({ name: "Test Actualizado" });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.name).toBe("Test Actualizado");
    });

    it("devuelve 404 al actualizar id inexistente", async () => {
      const res = await request(app)
        .put("/api/users/999999")
        .send({ name: "No existe" });
      expect(res.statusCode).toBe(404);
    });
  });

  // ── DELETE /api/users/:id ──────────────────────────────────────────────────
  describe("DELETE /api/users/:id", () => {
    it("elimina el usuario creado", async () => {
      const res = await request(app).delete(`/api/users/${createdUserId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("devuelve 404 al eliminar id inexistente", async () => {
      const res = await request(app).delete("/api/users/999999");
      expect(res.statusCode).toBe(404);
    });
  });

});
