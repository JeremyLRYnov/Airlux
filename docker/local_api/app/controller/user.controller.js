import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { userRepository } from '../models/user.models.js';
import { syncService } from '../WebSocket/ServeurWebSocket.js';

export const signup = async (req, res) => {
    console.log(req.body);
    const { name, email, admin } = req.body;

    // validate email
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!email.match(emailRegex)) {
        return res.status(400).json({ message: "Format de l'adresse e-mail invalide." });
    }

    const existingUser = await userRepository.search().where("email").is.equalTo(email).return.first();
    // check if user already registered with the email
    if (existingUser) {
      return res.status(400).json({ message: "Un user est déjà enregistré sous ce nom." });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = await userRepository.createAndSave({ name: `${name}`, email, password: hashedPassword, admin });
  
    const token = jwt.sign({ email: user.email, id: user.entityId }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    const { entityId, password, ...rest } = user.toJSON();
    const data = { id: user.entityId, ...rest };
    res.status(200).json({message: "Inscription réussi", result: data, token });

    //Data to send in the socket
    const dataToSend = {
      id: user.entityId,
      name: name,
      email: email,
      password: hashedPassword, 
      admin: admin
    };

    syncService.syncData(dataToSend, 'user', 'create');
    
};

export const signin = async (req, res) => {
    const { email } = req.body;
    const existingUser = await userRepository.search().where("email").is.equalTo(email).return.first();
    // check if user exists
    if (!existingUser) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }
    // check for correct password
    const isPasswordCorrect = await bcrypt.compare(req.body.password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Mot de passe invalide." });
    }
    // create auth token
    const token = jwt.sign({ email: existingUser.email, id: existingUser.entityId }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    const { entityId, password, ...rest } = existingUser.toJSON();
    const data = { id: existingUser.entityId, ...rest };
    res.status(200).json({message: "Connexion réussi.", result: data, token });
};

export const updateUser = async (req, res) => {
  const { id } = req.params
  const user = await userRepository.fetch(id)

  user.name = req.body.name ?? null
  user.email = req.body.email ?? null
  user.password = req.body.password ?? null
  user.admin = req.body.admin ?? null

  await userRepository.save(user)

  res.status(200).json({ result: user })

  //Data to send in the socket
  const dataToSend = {
    id: id,
    name: user.name,
    email: user.email,
    password: user.password, 
    admin: user.admin
  };

  syncService.syncData(dataToSend, 'user', 'update');
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  await userRepository.remove(id)
  res.status(200).json({ result: 'User ' + id + ' Supprimé avec succès.' })

  //WebSocket
  syncService.syncData({id: id}, 'user', 'delete');
}

export const getUser = async (req, res) => {
  const user = await userRepository.fetch(req.params.id)
  res.status(200).json({ result: user })
}

export const getUsers = async (req, res) => {
    const users = await userRepository.search().return.all();
    res.status(200).json({ result: users });
};
