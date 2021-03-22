const express = require('express')
const router = express.Router()
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')

router.use('/api/v1/admin/',adminRoutes)
router.use('/api/v1/user/',userRoutes)

module.exports = router;