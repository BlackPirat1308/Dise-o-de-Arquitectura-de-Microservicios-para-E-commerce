import request from 'supertest';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { app } from '../../src/app'; // Asegúrate de que esta ruta sea correcta

let server: http.Server;
let io: Server;

beforeAll((done) => {
  server = createServer(app);
  io = new Server(server);
  server.listen(done);
});

afterAll((done) => {
  io.close();
  server.close(done);
});

describe('API Endpoints', () => {
  it('GET /api/products debería devolver una lista de productos', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('POST /api/login debería autenticar al usuario', async () => {
    const response = await request(server)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});