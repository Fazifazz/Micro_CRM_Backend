import { UserRoles } from '../utils/constants.js'
import db from '../models/index.js'
const { Contact } = db

export const getAll = async (req, res) => {
  const userId = req?.user?.id
  const filter = { org_id: req?.user?.org_id }
  if (req.user.role === UserRoles.USER) {
    filter.created_by = userId
  }
  const contacts = await Contact.findAll({
    where: filter,
  })
  res.json({ data: contacts })
}

export const create = async (req, res) => {
  const c = await Contact.create({
    org_id: req.user.org_id,
    created_by: req.user.id,
    ...req.body,
  })
  res.status(201).json(c)
}

export const getOne = async (req, res) => {
  try {
    const id = req.params.id
    const contact = await Contact.findOne({ where: { id } })

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' })
    }

    return res
      .status(200)
      .json({ message: 'Contact fetched successfully', data: contact })
  } catch (error) {
    return res.status(500).json({ message: 'Error updating contact', error })
  }
}

export const update = async (req, res) => {
  try {
    const id = req.params.id
    const inputParams = req.body

    const contact = await Contact.findOne({ where: { id } })

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' })
    }

    await contact.update(inputParams)

    return res
      .status(200)
      .json({ message: 'Contact updated successfully', contact })
  } catch (error) {
    return res.status(500).json({ message: 'Error updating contact', error })
  }
}

export const destroy = async (req, res) => {
  const contact = await Contact.findOne({
    where: { id: req.params.id, org_id: req.user.org_id },
  })

  if (!contact) return res.status(403).json({ message: 'Not allowed' })

  await contact.destroy()
  res.json({ message: 'Deleted' })
}
