import { UserRoles } from '../utils/constants.js'
import db from '../models/index.js'
import bcrypt from 'bcrypt'
const { User } = db

export const getAll = async (req, res) => {
  if (req.user.role !== UserRoles.ADMIN)
    return res.json({ message: 'Sorry, You are not a Admin!' })
  const users = await User.findAll({ where: { org_id: req?.user?.org_id } })
  res.json({ data: users })
}

export const create = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const { org_id } = req?.user
    if (!password) {
      return res.status(400).json({ message: 'Password is required' })
    }

    const password_hash = await bcrypt.hash(password, 10)

    const user = await User.create({
      org_id,
      name,
      email,
      role,
      password_hash,
    })

    res.status(201).json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Failed to create user' })
  }
}

export const getOne = async (req, res) => {
  try {
    const id = req.params.id
    const user = await User.findOne({ where: { id } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res
      .status(200)
      .json({ message: 'User fetched successfully', data: user })
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error })
  }
}

export const update = async (req, res) => {
  try {
    const id = req.params.id
    const inputParams = req.body
    const user = await User.findOne({ where: { id, org_id: req?.user?.org_id } })

    if (!user) {
      return res.status(404).json({ message: 'User not found in this organization' })
    }

    await user.update(inputParams)

    return res.status(200).json({ message: 'user updated successfully', user })
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error })
  }
}

export const destroy = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id, org_id: req.user.org_id },
  })

  if (!user) return res.status(403).json({ message: 'Not allowed' })

  await user.destroy()
  res.json({ message: 'Deleted' })
}
