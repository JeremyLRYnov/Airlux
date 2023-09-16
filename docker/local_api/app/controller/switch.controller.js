import { switchRepository } from '../models/switch.models.js'
import { syncService } from '../WebSocket/ServeurWebSocket.js';

export const createSwitch = async (req, res) => {
  const { name, switchId, roomId, status } = req.body
  const existingSwitch = await switchRepository.search().where('name').is.equalTo(name).return.first()
  // check if switch already registered with the name
  if (existingSwitch) {
    return res.status(400).json({ message: 'Un switch est déjà enregistré sous ce nom.' })
  }
  const switchSensor = await switchRepository.createAndSave({ name: `${name}`, switchId, roomId, status })
  const { entityId, ...rest } = switchSensor.toJSON()
  const data = { id: switchSensor.entityId, ...rest }
  res.status(200).json({ result: data })

  //Data to send in the socket
  const dataToSend = {
    id: switchSensor.entityId,
    switchId: switchId,
    name: name,
    roomId: roomId,
    status: status
  };

  syncService.syncData(dataToSend, 'switch', 'create');
}

export const getSwitches = async (req, res) => {
  const switches = await switchRepository.search().return.all()
  res.status(200).json({ result: switches })
}

export const getSwitch = async (req, res) => {
  const { id } = req.params
  const switchSensor = await switchRepository.fetch(id)
  res.status(200).json({ result: switchSensor })
}

export const updateSwitch = async (req, res) => {
  const { id } = req.params
  const switchSensor = await switchRepository.fetch(id)

  switchSensor.name = req.body.name ?? null
  switchSensor.roomId = req.body.roomId ?? null
  switchSensor.status = req.body.status ?? null

  await switchRepository.save(switchSensor)

  res.status(200).json({ result: switchSensor })

  //Data to send in the socket
  const dataToSend = {
    id: id,
    name: switchSensor.name,
    roomId: switchSensor.roomId,
    status: switchSensor.status 
  };

  syncService.syncData(dataToSend, 'switch', 'update');

}

export const updateSwitchBoolean = async (switchId, newStatus) => {
  try {
    // Récupérez le switch à partir de la base de données en utilisant son ID
    const switchSensor = await switchRepository.search().where('switchId').is.equalTo(switchId).return.first();

    // Mettez à jour l'état du switch
    switchSensor.status = newStatus;

    // Enregistrez les modifications dans Redis
    await switchRepository.save(switchSensor);

    console.log(`Switch ${switchId} mis à jour avec succès avec le nouvel état ${newStatus}`);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du switch ${switchId} :`, error);
  }

    //Data to send in the socket
    const dataToSend = {
      switchId: switchId,
      status: newStatus
    };
  
    syncService.syncData(dataToSend, 'switch', 'updateStatus');
}

export const deleteSwitch = async (req, res) => {
  const { id } = req.params
  await switchRepository.remove(id)
  res.status(200).json({ message: 'Switch ' + id + ' Supprimé avec succès.' })

  syncService.syncData({id: id}, 'switch', 'delete');
}

// Path: docker/local_api/app/controller/switch.controller.js
