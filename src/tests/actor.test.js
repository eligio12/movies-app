const request = require('supertest');
const app = require('../app');

let id;


test('GET /actors debe de traer todos los actores', async () => { 
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /actors debe de crear un actor', async () => { 
    const actor = {
        firstName: "Margot",
        lastName: "Robbie",
        nationality: "Australian",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Robbie_at_2019_Cannes_%28cropped%29.jpg",
        birthday: "1990-07-02"
    }
    const res = await request(app).post('/actors').send(actor)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName);
  });

  test('PUT /actors/:id debe actualizar un actor',async () => { 
    const actor = {
        firstName: "Margot Actualizado",
    }
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actor.firstName);
   });
  

  test("DELETE /actors/:id debe eliminar un actor", async() => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
  });