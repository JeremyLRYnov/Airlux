const axios = require('axios').default;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

  it('Signin POST /', async () => {
    const response = await axios.post('http://localhost:6869/user/signin', {
      email: 'nicolas@example.com',
      password: 'autttt..'
    });
    expect(response.status).toEqual(200);
    expect(response.data.message).toEqual('Connexion réussi');
    expect(response.data.result).toBeDefined();
    expect(response.data.token).toBeDefined();
  
    // Vérification des données renvoyées
    const responseData = response.data.result;
    expect(responseData.name).toEqual('nicolas');
    expect(responseData.email).toEqual('nicolas@example.com');
    expect(responseData.admin).toEqual(false);
  
  });

  it('Delete/', async () => {
    // création de l'utilisateur
    const signupResponse = await axios.post('http://localhost:6869/user/signup', {
      name: 'john',
      email: 'john@example.com',
      password: 'password',
      admin: false
    });
  
    // récupération de l'ID de l'utilisateur créé
    const userId = signupResponse.data.result.id;
  
    // suppression de l'utilisateur
    const response = await axios.delete(`http://localhost:6869/user/${userId}`);
    expect (response.data).toEqual({
        "result": "User "+userId+" deleted successfully."
    })
    expect(response.status).toEqual(200);
  
    // vérification que l'utilisateur a bien été supprimé
    const getResponse = await axios.get('http://localhost:6869/user');
    const users = getResponse.data.result;
    const user = users.find(u => u.id === userId);
    expect(user).toBeUndefined();
  });
});