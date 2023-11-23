const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')

let id;


test('GET /movies debe de traer todas las peliculas', async () => { 
    const res = await request(app).get('/movies');
    console.log()
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

 test('POST /movies debe de crear una pelicula', async () => { 
    const movie = {
        name: "El lobo de Wall Street",
        image: "https://images.cdn3.buscalibre.com/fit-in/360x360/7a/4f/7a4f1d1c0d75907fbe6e64b855a507d9.jpg",
        synopsis: "En 1987 el joven Jordan Belfort (Leonardo DiCaprio) decide trabajar en Wall Street en la firma de Mark Hanna (Matthew McConaughey), el cual le aconseja sobre cómo vivir en Wall Street: las drogas, en especial la cocaína, ya que según sus propias palabras: «mantiene el cerebro despierto y hace que logres teclear rápido»;",
        releaseYear: 2013
    }
    const res = await request(app).post('/movies').send(movie)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
  });

  test('PUT /movies/:id debe actualizar una pelicula',async () => { 
    const movie = {
        name: "El lobo de Wall Street Actualizado",
    }
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
   });


   test("POST /movies/:id/actors   debe insertar los actores de la pelicula", async () => {
    const actor = await Actor.create({
        firstName: "Margot",
        lastName: "Robbie",
        nationality: "Australian",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Robbie_at_2019_Cannes_%28cropped%29.jpg",
        birthday: "1990-07-02"
    })
    const res = await request(app).post(`/movies/${id}/actors`)
      .send([actor.id]);
    actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);  
   });
   
   
   test("POST /movies/:id/directors   debe insertar los directores de la pelicula", async () => {
    const director = await Director.create({
        firstName: "Martin",
        lastName: "Scorsese",
        nationality: "American",
        image: "https://www.nme.com/wp-content/uploads/2016/10/MartinScorseseBoardwalkEmpirePA190911-3-696x464.jpg",
        birthday: "1942-11-17"
    })
    const res = await request(app).post(`/movies/${id}/directors`)
      .send([director.id]);
    director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);  
   });
   
   
   test("POST /movies/:id/genres   debe insertar los generos de la pelicula", async () => {
    const genre = await Genre.create({
        name: "Drama"
    })
    const res = await request(app).post(`/movies/${id}/genres`)
      .send([genre.id]);
    genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);  
   }); 
  

  test("DELETE /movies/:id debe eliminar una pelicula", async() => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
  });