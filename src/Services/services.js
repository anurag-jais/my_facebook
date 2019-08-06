const User = require('../Models/user');
const Post = require('../Models/post');
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

exports.findUserFunc= (userId)=>{
    return User.findOne({
        where: {
            id: userId
        }
    })
};

exports.createPostFunc = (body,user)=>{
    const Title = body.title;
    const Content = body.content;
    return Post.create({
        Title: Title,
        Content: Content,
        id: user.id,
        creator: user.firstname
    })
};


