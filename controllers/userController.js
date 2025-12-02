import { UserRoles } from '../utils/constants.js'
import db from '../models/index.js'
const { User } = db

export const getAll = async (req, res) => {
  console.log('req', req?.user)

  if (req.user.role !== UserRoles.ADMIN)
    return res.json({ message: 'Sorry, You are not a Admin!' })
  const users = await User.findAll({})
  res.json({ data: users })
}

export const create = async (req, res) => {
  const c = await User.create({
    org_id: req.user.org_id,
    created_by: req.user.id,
    ...req.body,
  })
  res.status(201).json(c)
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

    const user = await User.findOne({ where: { id } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
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
