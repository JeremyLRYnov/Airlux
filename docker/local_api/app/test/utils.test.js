const request = require('supertest');
const app = require("../../app");

describe('Controller User',() => {
    it('GET/', async()=>{
        const response = await request(app).get("/user");
        //expect(response.body).toEqual([]);
        expect(response.body).toEqual([""]);
        expect(true).toBe(true);
    })
})
