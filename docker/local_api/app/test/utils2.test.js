const axios = require('axios').default;
const bcrypt = require('bcryptjs');

//Controller 
describe('Controller User', () => {
  it('GET /', async () => {
    const response = await axios.get('http://localhost:6869/user');
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({"result": []});
  });

  it('Signup POST /', async () => {
    const response = await axios.post('http://localhost:6869/user/signup', {
        name: 'nicolas',
        email: 'nicolas@example.com',
        password: 'autttt..',
        admin: false
      });
    expect(response.status).toEqual(200);
    expect(response.data.message).toEqual('Inscription réussi');
    expect(response.data.result).toBeDefined();
    expect(response.data.result.id).toBeDefined();

    // Vérification des données renvoyées
    const responseData = response.data.result;
    expect(responseData.name).toEqual('nicolas');
    expect(responseData.email).toEqual('nicolas@example.com');
    expect(responseData.admin).toEqual(false);

  });

  it('GET /', async () => {
    const response = await axios.get('http://localhost:6869/user');
    expect(response.status).toEqual(200);
    const user = response.data.result[0];
    expect(user.name).toEqual('nicolas');
    expect(user.email).toEqual('nicolas@example.com');
    expect(user.admin).toEqual(false);
    const passwordsMatch = await bcrypt.compare("autttt..", user.password);
    expect(passwordsMatch).toBe(true);
});
});