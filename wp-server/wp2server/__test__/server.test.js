const request = require('supertest');
const app = require('../app')


// Testataan topiceja:
test("/api/topics should return data (statuscode 200)", () => {
  return request(app)
    .get('/api/topics').then(response => {
      expect(response.statusCode).toBe(200);
  });
});
test("/api/topics/1 should return topic with id 1", ()=>{
    return request(app)
    .get('/api/topics/1').then(response => {
        expect(response.statusCode).toBe(200);
    })
})
test("/api/topics should be able to make a post SC(201)", ()=>{
    return request(app)
    .post('/api/topics').send({title:'new title from test', detail: 'basic description', src: 'www.localhost3000.org', inprog: true}).then(response => {
        expect(response.statusCode).toBe(201);
    })
})

test("/api/topics/:id should delete a topic", () => {
    const id = 4;
    return request(app)
    .delete(`/api/topics/${id}`).then(response => {
        expect(response.statusCode).toBe(202);
    })
})

test("/api/topics/:id update a topic", ()=>{
    const id = 5;
    const detail = "Description from jest test PUT";
    const title = "title from jest test PUT";
    const src = 'www.urlfromjesttestPUT.com';
    const inprog = true;
    return request(app)
    .put(`/api/topics/${id}`).send({title, detail, src, inprog}).then(response => {
        expect(response.statusCode).toBe(200 || 204);
        expect(response.body).toBeDefined();
        expect(response.body.title).toMatch('title from jest test PUT');
    })
})
