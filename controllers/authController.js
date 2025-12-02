import db from '../models/index.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();

const { User } = db;

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })

    if (!user) return res.status(400).json({ message: 'Invalid email' })

    const valid = await bcrypt.compare(req.body.password, user.password_hash)
    if (!valid) return res.status(400).json({ message: 'Invalid password' })
      console.log('process.env.JWT_SECRET', process.env.JWT_SECRET)
    const token = jwt.sign(
      { id: user.id, org_id: user.org_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    return res.json({ user, token })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const getLoginedUser = async (req, res) => {
  try {
    const id = req.user?.id
    const user = await User.findOne({ where: { id } })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res
      .status(200)
      .json({ message: 'User loaded successfully', data: user })
  } catch (error) {
    return res.status(500).json({ message: 'Error loading user', error })
  }
}