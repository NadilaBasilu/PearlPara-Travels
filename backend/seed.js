require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const User     = require('./models/User');

const ADMIN = {
  name:     'Admin',
  email:    'admin@pearlpara.com',
  password: 'Admin@1234',
  role:     'admin',
};

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const exists = await User.findOne({ email: ADMIN.email });
    if (exists) {
      console.log('Admin already exists:', ADMIN.email);
      process.exit(0);
    }
    const hashed = await bcrypt.hash(ADMIN.password, 10);
    await User.create({ ...ADMIN, password: hashed });
    console.log('✅ Admin created successfully!');
    console.log('   Email:   ', ADMIN.email);
    console.log('   Password:', ADMIN.password);
    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });
