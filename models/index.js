'use strict'

import fs from 'fs'
import path from 'path'
import { Sequelize, DataTypes } from 'sequelize'
import { fileURLToPath, pathToFileURL } from 'url'
import process from 'process'
import dbConfig from '../config/config.js'
import dotenv from 'dotenv'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const env = process.env.NODE_ENV || 'development'
const config = dbConfig[env]

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

const db = {}
db.sequelize = sequelize
db.Sequelize = Sequelize

const modelFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file !== 'index.js' && file.endsWith('.js'))

for (const file of modelFiles) {
  const filePath = path.join(__dirname, file)
  const fileURL = pathToFileURL(filePath).href

  const modelModule = await import(fileURL)
  const model = modelModule.default(sequelize, DataTypes)
  db[model.name] = model
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

try {
  await sequelize.authenticate()
  console.log('Database Connection Success ✔')
} catch (err) {
  console.error('Database Connection Failed ❌', err)
}

export default db
