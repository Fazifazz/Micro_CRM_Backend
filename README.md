# Multi-Tenant CRM Application (backend)

## How to run the backend:

npm install
npm run dev


## Tech Choices
- **Backend:** Node.js, Express.js, Sequelize ORM, Postgres SQL  
- **Frontend:** React + Context API  
- **Auth:** JWT-based authentication  
- **Multi-tenancy approach:** Organization-based row-level data isolation

---

## Multi-tenancy reasoning
Each record (Users, Contacts, etc.) contains an `org_id`, ensuring:
- Users can only access data for their organization
- No cross-org data leakage
- Simplified data partitioning at the DB level

---

## Tradeoffs
- Performance may decrease with many tenants in one shared DB
- Organization row filtering requires careful authorization middleware
- But simple & fast for small–mid scale systems