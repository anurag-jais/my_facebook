const User = require('../Models/user');
const Post = require('../Models/post');
const services = require('../Services/services');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
//const sendgridTransport = require('nodemailer-sendgrid-transport');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretsecret';
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("Here----------->>>>>>>>>>>",jwt_payload);
    User.findOne({
        where:{
            id: jwt_payload.userId
        }
    }).then(user=>{
        if(user){
            console.log('user??????????>>>>>>>>>>>>>>>',user);
            return done(null,user);
        }
        else{
            console.log('unauthenticated');
            return done(null, false);
        }
    }).catch(err=>{
        console.log(err);
    });
    // User.findOne({id: jwt_payload.userId}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
}));




const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'anurag@cronj.com',
        pass: 'Sangeeta@1996'
        //pass: 'Ayush2609'
    }
});

const otp = Math.floor(100000 + Math.random() * 900000);

exports.identifyUser = (req, res, next) => {
    User.findOne({
        where: {
            useremail: req.params.useremail
        }
    })
    .then(found=>{
        if(!found){
            res.send('Email Not Found');
        }
        else{
            User.findOne({
                where: {
                    useremail: req.params.useremail,
                    useremailverifiedstatus: false
                }
            })
                .then(identifyButNotRegister => {
                    //console.log(R);
                    if (identifyButNotRegister) {
                        const otpForCompletingRegistration = Math.floor(100000 + Math.random() * 900000);
                        console.log("Incomplete Registration");
                        res.send("Incomplete Registration");
                        // return transporter.sendMail( {
                        //     from: 'anurag@cronj.com',
                        //     to: req.params.useremail,
                        //     subject: 'OTP for Completing your Registration',
                        //     html: '<h1>'+otpForCompletingRegistration+'</h1>'
                        // }, function(error, info){
                        //     if (error) {
                        //     console.log("error ------w-->",error);
                        //     } else {
                        //     console.log('Email sent: ' + info.response);
                        //     }
                        // });
                    }
                    else {
                        User.findOne({
                            where: {
                                useremail: req.params.useremail,
                                useremailverifiedstatus: true
                            }
                        })
                        .then(identified => {
                            const otpForRecoverAccount = Math.floor(100000 + Math.random() * 900000);
                            if (identified) {
                                console.log("updation start");
                                User.update({ userotp: otpForRecoverAccount },
                                    { where: { useremail: req.params.useremail } })
                                    .then(otpUpdate => {
                                        if (otpUpdate) {
                                            console.log("otp Updated");
                                            res.send('Email Searched');
                                            return transporter.sendMail({
                                                from: 'anurag@cronj.com',
                                                to: req.params.useremail,
                                                subject: 'OTP for Recover Your Account',
                                                html: '<h1>' + otpForRecoverAccount + '</h1>'
                                                }, function (error, info) {
                                                if (error) {
                                                    console.log("error -------->", error);
                                                } else {
                                                    console.log('Email sent: ' + info.response);
                                                }
                                            });
                                        }
                                    })
                                    .catch(err => {
                                       console.log(err);
                                    });
                            }
                            }).catch(err => {
                                console.log(err);
                            });
        
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }).catch(err=>{
        console.log(err);
    });
    
}

exports.verifyOtpRecovery = (req, res, next) => {
    console.log("i'm running.;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
    User.findOne({
        where: {
            userotp: req.params.userotp,
            useremail: req.params.useremail
        }
    }).then(otpRecoveryVerified=>{
        console.log(".............>>>>>>>>>>>>>>>recovery otp verification done");
        if(otpRecoveryVerified){
            res.send("Email Identification Done");
        }
        else{
            res.send("Recover Otp Not Match");
        }
    }).catch(err => {
        console.log(err);
    });
}
exports.verifyUserOtp = (req, res, next) => {
    console.log('------>>>>', req.params.userotp);
    console.log('------>>>>>', req.params.useremail);
    User.findOne({
        where: {
            userotp: req.params.userotp,
            useremail: req.params.useremail
        }
    }).then(otpverify => {
        console.log("otpverify---->>>:;;;>>>", otpverify);
        if (otpverify) {
            User.update({ useremailverifiedstatus: 'true' },
                { where: { useremail: req.params.useremail } })
                .then(rowUpdate => {
                    console.log("rowsUpdated;';';';>>>", rowUpdate);


                })
                .catch(err => {
                    console.log(err);
                });
            return res.send("Email Verified");
        }
        else {
            return res.send("Email Not Verified");
        }
    })
}
exports.verifyUserName = (req, res, next) => {
    //alert(req.params.username);
    console.log("=-=-=-=>", req.params.username);
    User.findOne({
        where: { username: req.params.username }
    }).then(alreadyusername => {
        console.log("result///////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", alreadyusername);
        if (alreadyusername) {
            return res.send("Username Already Exist");
        }

        else {
            return res.send("Unique Username");
        }
    }).catch(err => {
        console.log(err);
    })

}
exports.getSignIn = (req, res, next) => {
    console.log("req ===>>>>", req.body.useremail);
    User.findOne({
        where: { useremail: req.body.useremail }
    }).then(alreadyuser => {
        if (alreadyuser) {
            console.log("already exist email");
            console.log("alreadyuseremail.......>>>>>>>>>>>>>>>>>>", alreadyuser);
            return res.send("User Already Exist");
        }
        else {
            bcrypt.hash(req.body.userpassword, 12).then(hashedPassword => {
                services.getSignInFunc(req.body, otp, hashedPassword)
                    .then(result => {
                        if (result) {
                            console.log("otp is...", otp);
                            res.send("Unique user");
                            return transporter.sendMail({
                                from: 'anurag@cronj.com',
                                to: req.body.useremail,
                                subject: 'OTP for registration',
                                html: '<h1>' + otp + '</h1>'
                            }, function (error, info) {
                                if (error) {
                                    console.log("error -------->", error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                        }
                    })
                    .catch(err => {
                        console.log("err", err);
                        res.status(500).send(err);
                    });
            }).catch(err => { console.log(err) })

        }
    }).catch(err => {
        console.log("===================error");
        console.log(err);
    });

};
exports.getLogIn = (req, res, next) => {
    console.log("body");
    console.log(req.body);
    let loadeduser;
    services.getLogInFunc(req.body)
        .then(result => {
            //console.log("res ---------->>>>>>>>>>>>>>>>>=====>>>>>>>>>>>>>>",result);
            if (result && result.useremailverifiedstatus === false) {
                res.send("Redirect to SignUp Page");
            }
            else if (result && result.useremailverifiedstatus === true) {
                console.log("===========-------------------------------------00>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",result);
                //loadeduser = result
                bcrypt.compare(req.body.password, result.userpassword)
                    .then(isMatch => {
                        if (isMatch) {
                            const token = jwt.sign(
                                {
                                  email: result.useremail,
                                  userId: result.id
                                },
                                'secretsecret',
                                { expiresIn: '1h' }
                              );
                              console.log("token>>>>>>>>>>>>>>>>>>>>>>>",token);
                                res.status(200).json({ token: token, userId: result.id, message: "Password Match" });

                        }
                        else {
                            console.log("Invalid Password");
                            res.send("Invalid Password");
                        }
                    })
                    .catch(err => { console.log(err) })
            }

            else {
                console.log("Such email is not registered yet");
                res.send("Such email is not registered yet");
            }
            //res.send("USER NOT FOUND");
        })
        .catch(err => {
            res.status(500).send("err");
        });
};

exports.updatePassword = (req,res,next)=>{
    bcrypt.hash(req.body.userpassword,12).then(updatedHashPassword=>{
        services.updatePasswordFunc(req.body,updatedHashPassword)
        .then(updated=>{
            if(updated){
                res.send("Password Updated");
            }
        })
        .catch(err=>{
            console.log(err);
        });
    }).catch(err=>{
        console.log(err);
    });
    
}


exports.verifyToken = (req,res,next)=>{
    console.log("i'm running");
    res.send('Authenticated');

}




exports.createPost = (req,res,next)=>{
    const userId = localStorage.getItem('userId');
    services.findUserFunc(userId)
    .then(user=>{
        if(user){
            console.log('userfound');
            console.log(user);
            services.createPostFunc(req.body,user)
            .then(postcreated =>{
                if(postcreated){
                    console.log('post created');
                }
                else{
                    console.log('post not created');
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
    })
    .catch(err=>{
        console.log(err);
    });
}

// exports.updateUser = (req,res,next)=>{
//     services.updateFunc(req.params.id,req.body)
//     .then(user=>{
//         if(user.nModified === 0)
//             res.send("NOT UPDATED");
//         else
//             res.send("USER IS UPDATED");
//     })
//     .catch(err=>{
//         if(err){ res.status(500).send("ERROR");}
//     });
// };

// exports.deleteUser = (req,res,next)=>{
//     services.deleteUserFunc(req.params.id)
//     .then(user=>{
//         if(user.deletedCount === 0)
//             res.send("ID NOT FOUND");
//         else
//             res.send("USER IS DELETED");
//     })
//     .catch(err=>{
//         res.send(err);
//     });
// };
// exports.filterAge = (req,res,next)=>{
//     services.filterAgeFunc()
//     .then(users=>{
//         console.log(users);
//         function isGreaterThan(value){
//             let today = new Date();
//             let age = today.getFullYear()-value.dob.getFullYear();
//             let m = today.getMonth() - value.dob.getMonth();
//             if(m<0||(m === 0 && today.getDate()<value.dob.getDate())){
//                 age--;
//             } 
//             return age>req.params.age;
//         }
//         const filteredarray = users.filter(isGreaterThan);
//         console.log(filteredarray);
//         if(filteredarray.length>0)
//             res.send(filteredarray);
//         else
//             res.send("SUCH FILTER NOT EXIST");
//     });
// };

// exports.filterName = (req,res,next)=>{
//     services.filterNameFunc(req.params.value)
//     .then(user=>{
//         if(user.length>0)
//             res.send(users);
//         else
//             res.send("SUCH FILTER NOT EXIST");
//     })
//     .catch(err=>{
//         res.status(500).send("NAME NOT FOUND");
//     });
// };
// exports.filterAddress = (req,res,next)=>{

//     services.filterAddressFunc()
//     .then(user=>{
//         if(user.length>0)
//             res.send(users);
//         else 
//             res.send("SUCH FILTER NOT EXIST");
//     })
//     .catch(err=>{
//         res.status(500).send("ADDRESS NOT FOUND");
//     });
// };
// exports.filterProfession = (req,res,next)=>{

//     services.filterProfessionFunc(req.params.value)
//     .then(user=>{
//         if(user.length>0)
//             res.send(users);
//         else
//             res.send("SUCH FILTER NOT EXIST");
//     })
//     .catch(err=>{
//         res.status(500).send("PROFESSION NOT FOUND");
//     });
// };

// exports.compoundFilter = (req,res,next)=>{
//     let queryBuilder = {};
//     if(req.query.name){
//             console.log(req.query.name);
//            queryBuilder.name = {$regex:req.query.name,$options:"i"};
//     }
//     if(req.query.profession){
//         queryBuilder.profession = {$regex:req.query.profession};
//     }
//     if(req.query.dob){
//         queryBuilder.dob = req.query.dob;
//     }
//     if(req.query.address){
//         queryBuilder.address = {$regex: req.query.address};
//     }
//     if(req.query.gender){
//         queryBuilder.gender = req.query.gender;
//     }
//     //User.find(queryBuilder)
//     services.compoundfilterFunc()
//     .then(users=>{
//         res.send(users);
//     })
//     .catch(err=>{
//         console.log(err);
//         res.send(err);
//     });
// };
