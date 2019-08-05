const Sequelize = require('sequelize');
const sequelize = require('../Util/databse');
const express = require('express');
const adminRoutes = require('../Routes/adminRoutes');
const loginRoutes = require('../Routes/loginRoutes');
const homeRoutes = require('../Routes/homeRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');



//const register_user = require('../Models/user');
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/registration', adminRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/home', homeRoutes);
//app.use('/api/login',adminRoutes);

sequelize.authenticate()
.then(()=> {
    console.log("---------------------------------------connecting to the database");
});
sequelize
  .sync()
  .then(result =>{
   // console.log(result);
  })
  .catch(err=>{
    console.log(err);
  });
  

// register_user.create({
//   firstname: 'Anurag',
//   lastname: 'Jaiswal',
//   useremail: 'anurag@cronj.com',
//   username: 'anurag',
//   userpassword: '@nurag',
//   userdob: '12/20/1996'

// })

//app.use('*',errRoute);
app.listen(3007);
