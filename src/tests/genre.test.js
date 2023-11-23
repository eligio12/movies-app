const request = require('supertest');
const app = require('../app');

let id;


test('GET /genres debe de traer todos los generos', async () => { 
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /genres debe de crear un genero', async () => { 
    const genero = {
        name: "Drama"
    }
    const res = await request(app).post('/genres').send(genero)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(genero.name);
  });

  test('PUT /genres/:id debe actualizar un genero',async () => { 
    const genero = {
        name: "Drama Actualizado",
    }
    const res = await request(app).put(`/genres/${id}`).send(genero);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genero.name);
   });
  

  test("DELETE /genres/:id debe eliminar un genero", async() => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
  });