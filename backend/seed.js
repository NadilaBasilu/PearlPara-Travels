require('dotenv').config();
const mongoose    = require('mongoose');
const bcrypt      = require('bcryptjs');
const User        = require('./models/User');
const Testimonial = require('./models/Testimonial');

const ADMIN = {
  name:     'Admin',
  email:    'admin@pearlpara.com',
  password: 'Admin@1234',
  role:     'admin',
};

const TESTIMONIALS = [
  { name: 'Sarah M.',  country: 'United Kingdom', rating: 5, tour: 'Cultural Triangle Explorer',  text: 'Absolutely magical trip! PearlPara handled everything perfectly. Sri Lanka exceeded every expectation.' },
  { name: 'James K.',  country: 'Australia',      rating: 5, tour: 'Wildlife Safari Adventure',   text: 'The wildlife safari at Yala was the highlight of our lives. Incredible service from start to finish.' },
  { name: 'Priya R.',  country: 'India',          rating: 5, tour: 'Golden Beaches Escape',       text: 'From Sigiriya to Galle, every destination was breathtaking. Highly recommend PearlPara Travels!' },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Seed admin
    const exists = await User.findOne({ email: ADMIN.email });
    if (exists) {
      console.log('Admin already exists:', ADMIN.email);
    } else {
      const hashed = await bcrypt.hash(ADMIN.password, 10);
      await User.create({ ...ADMIN, password: hashed });
      console.log('✅ Admin created successfully!');
      console.log('   Email:   ', ADMIN.email);
      console.log('   Password:', ADMIN.password);
    }

    // Seed testimonials
    const count = await Testimonial.countDocuments();
    if (count === 0) {
      await Testimonial.insertMany(TESTIMONIALS);
      console.log('✅ Testimonials seeded successfully!');
    } else {
      console.log('Testimonials already exist:', count);
    }

    process.exit(0);
  })
  .catch(err => { console.error(err); process.exit(1); });
