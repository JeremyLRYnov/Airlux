import express from 'express'

import validator from '../middleware/validator.js'
import { createBuilding, deleteBuilding, getBuilding, getBuildings, updateBuilding } from "../controller/building.controller.js"
import schema from '../validation/building.validation.js'