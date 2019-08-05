const User = require('../Models/user');
const bcrypt = require('bcryptjs');
 exports.getSignInFunc = (body,otp,hashedPassword)=>{ 
    const firstname = body.firstname;
    const lastname = body.lastname;
    const useremail = body.useremail;
    const username = body.username;
    const userpassword = hashedPassword;
    const userdob =  body.userdob;
    return  User.create({
        firstname: firstname,
        lastname: lastname,
        useremail:useremail,
        username: username,
        userpassword: userpassword,
        userdob: userdob,
        userotp: otp
    })
};

 exports.getLogInFunc = (body)=>{
    //console.log("getUserFunc is running");
        return User.findOne({
            where: {
                useremail: body.useremail
              }
        })   
};

// exports.identifyUserFunc = (email,otpforrecovery)=>{
    
// }

exports.updatePasswordFunc = (body,updatedHashPassword)=>{
    return User.update({userpassword: updatedHashPassword},
        {where : {useremail: body.useremail}
    })
}
// exports.deleteFunc = (id)=>{
//     return User.deleteOne({id: id})
// };
// exports.filterAgeFunc = ()=>{
//     return User.find()
// }; 
// exports.filterNameFunc = (name)=>{
//     return User.find({name: name})
// };
// exports.filterAddressFunc =(address)=>{
//     return User.find({address: {$regex : address}})
// };
// exports.filterProfessionFunc = (profession)=>{
//     return User.find({profession: profession})
// }; 
//  exports.compoundfilterFunc = (queryBuilder)=>{
//      return User.find(queryBuilder)
//  };


