const axios = require('axios').default;

describe('Controller User', () => {
  it('GET /', async () => {
    const response = await axios.get('http://localhost:6869/user');
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({"result": []});
  });
});