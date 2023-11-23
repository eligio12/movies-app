const request = require('supertest');
const app = require('../app');

let id;


test('GET /directors debe de traer todos los directores', async () => { 
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /directors debe de crear un director', async () => { 
    const director = {
        firstName: "Martin",
        lastName: "Scorsese",
        nationality: "American",
        image: "https://www.nme.com/wp-content/uploads/2016/10/MartinScorseseBoardwalkEmpirePA190911-3-696x464.jpg",
        birthday: "1942-11-17"
    }
    const res = await request(app).post('/directors').send(director)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(director.firstName);
  });

  test('PUT /directors/:id debe actualizar un director',async () => { 
    const director = {
        firstName: "Martin Actualizado",
    }
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(director.firstName);
   });
  

  test("DELETE /directors/:id debe eliminar un director", async() => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
  });