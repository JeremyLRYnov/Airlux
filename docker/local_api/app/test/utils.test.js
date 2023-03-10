const axios = require('axios').default;
const bcrypt = require('bcryptjs');


describe('Controller User', () => {
  it('GET /', async () => {
    const response = await axios.get('http://localhost:6869/user');
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({"result": []});
  });


  it('POST /signup', async () => {
  const name = 'Enzo';
  const email = 'enzo@example.com';
  const password = 'password';
  const admin = false;
  const response = await axios.post('http://localhost:6869/user/signup', {
    name,
    email,
    password,
    confirmPassword: password, // send the same password for confirmation
    admin
  });

  expect(response.status).toEqual(200);

  const { message, result, token } = response.data;
  expect(message).toEqual('Inscription réussi');

  // compare the hash of the password in the response with the expected hash
  expect(result.name).toEqual(name);
  expect(result.email).toEqual(email);
  expect(result.admin).toEqual(admin);
  expect(token).toBeDefined();
  expect(result).toHaveProperty('id');
});





it('GET /', async () => {
    const response = await axios.get('http://localhost:6869/user');
    expect(response.status).toEqual(200);
    const user = response.data.result[0];
    expect(user.name).toEqual('Enzo');
    expect(user.email).toEqual('enzo@example.com');
    expect(user.admin).toEqual(false);
    //const hashedPassword = await bcrypt.hash("Natsu31570..", 12);
    const passwordsMatch = await bcrypt.compare("password", user.password);
    expect(passwordsMatch).toBe(true);
});
  
});

