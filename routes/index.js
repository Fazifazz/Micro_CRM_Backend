
import auth  from "./auth.js"
import contacts  from "./contacts.js"
import users  from "./user.js"

export default (app) => {
    app.use('/api/auth', auth)
    app.use('/api/contacts', contacts)
    app.use('/api/users', users)
}