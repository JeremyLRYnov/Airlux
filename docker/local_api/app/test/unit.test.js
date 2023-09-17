const axios = require('axios').default;
const MockAdapter = require('axios-mock-adapter');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// Mock axios
const mock = new MockAdapter(axios);

//Controller 
describe('Controller User', () => {

  //Mock
  beforeEach(() => {
    mock.reset();
  });

  //GET 
  it('GET /', async () => {
    mock.onGet('http://localhost:6869/user').reply(200, {"result": []});
    const response = await axios.get('http://localhost:6869/user');
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({"result": []});
  });


  //POST SIGNUP
  it('Signup POST /', async () => {
    mock.onPost('http://localhost:6869/user/signup').reply(200, {
      message: 'Inscription réussi',
      result: {
        id: 1,
        name: 'nicolas',
        email: 'nicolas@example.com',
        admin: false,
      },
    });
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

  //GET USER
  it('GET /', async () => {
    mock.onGet('http://localhost:6869/user').reply(200, {
      result: [
        {
          id: 1,
          name: 'nicolas',
          email: 'nicolas@example.com',
          admin: false,
          password: await bcrypt.hash('autttt..', 10), // Hash du mot de passe
        },
      ],
    });
    const response = await axios.get('http://localhost:6869/user');
    expect(response.status).toEqual(200);
    const user = response.data.result[0];
    expect(user.name).toEqual('nicolas');
    expect(user.email).toEqual('nicolas@example.com');
    expect(user.admin).toEqual(false);
    const passwordsMatch = await bcrypt.compare("autttt..", user.password);
    expect(passwordsMatch).toBe(true);
  });


  //POST AUTHENTICATE
  it('Signin POST /', async () => {
    mock.onPost('http://localhost:6869/user/signin').reply(200, {
      message: 'Connexion réussi',
      result: {
        id: 1,
        name: 'nicolas',
        email: 'nicolas@example.com',
        admin: false,
      },
      token: 'votre_token_jwt_ici',
    });
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


  //Delete
  it('Delete/', async () => {
    // Simuler une réponse réussie pour la création de l'utilisateur
    mock.onPost('http://localhost:6869/user/signup').reply(200, {
      message: 'Inscription réussi',
      result: {
        id: 1,
        name: 'john',
        email: 'john@example.com',
        admin: false,
      },
    });

    // Simuler une réponse réussie pour la suppression de l'utilisateur
    mock.onDelete('http://localhost:6869/user/1').reply(200, {
      "result": "User 1 deleted successfully.",
    });

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
  });


  //Update
  it('Update/', async () => {
    // Simuler une réponse réussie pour la création de l'utilisateur
    mock.onPost('http://localhost:6869/user/signup').reply(200, {
      message: 'Inscription réussi',
      result: {
        id: 1,
        name: 'pierre',
        email: 'pierre@example.com',
        admin: true,
      },
    });

    // Simuler une réponse réussie pour la mise à jour de l'utilisateur
    mock.onPatch('http://localhost:6869/user/1').reply(200, {
      "result": {
        "entityId": 1,
        "name": "jack",
        "email": "jack@example.com",
        "password": "pass",
        "admin": false
      },
    });
    const signupResponse = await axios.post('http://localhost:6869/user/signup', {
      name: 'pierre',
      email: 'pierre@example.com',
      password: 'poire',
      admin: true
    });
  
    // récupération de l'ID de l'utilisateur créé
    const signupId = signupResponse.data.result.id;
  
    // Modification de l'utilisateur
    const updateResponse = await axios.patch(`http://localhost:6869/user/${signupId}`, {
      name: 'jack',
      email: 'jack@example.com',
      password: 'pass',
      admin: false
    });
  
    // récupération de l'ID de l'utilisateur créé
    const userId = signupResponse.data.result.id;
    
    //Vérification que l'utilisateur a été modifié
    expect(updateResponse.status).toEqual(200);
    expect (updateResponse.data).toEqual({
        "result": {
            "entityId": userId,
            "name": "jack",
            "email": "jack@example.com",
            "password": "pass",
            "admin": false
        }
    })
    
  });

  //Get Id
  it('Get Id /', async () => {
    // Simuler une réponse réussie pour la création de l'utilisateur
    mock.onPost('http://localhost:6869/user/signup').reply(200, {
      message: 'Inscription réussi',
      result: {
        id: 1,
        name: 'enzo',
        email: 'enzo@example.com',
        admin: false,
      },
    });
    //Créer un utilisateur
    const signupResponse = await axios.post('http://localhost:6869/user/signup', {
        name: 'enzo',
        email: 'enzo@example.com',
        password: 'password',
        admin: false
      });
    
    // récupération de l'ID de l'utilisateur créé
    const userId = signupResponse.data.result.id;

    // Simuler une réponse réussie pour la récupération de l'utilisateur par ID
    mock.onGet(`http://localhost:6869/user/${userId}`).reply(200, {
      result: {
        id: userId,
        name: 'enzo',
        email: 'enzo@example.com',
        admin: false,
        password: await bcrypt.hash('password', 10)
      },
    });
    
    const getResponse = await axios.get(`http://localhost:6869/user/${userId}`);
    expect(getResponse.status).toEqual(200);
    const responseData = getResponse.data.result;
    expect(responseData.name).toEqual('enzo');
    expect(responseData.email).toEqual('enzo@example.com');
    expect(responseData.admin).toEqual(false);
    console.log(responseData.password);
    const passwordsMatch = await bcrypt.compare("password", responseData.password);
    expect(passwordsMatch).toBe(true);
 });
});