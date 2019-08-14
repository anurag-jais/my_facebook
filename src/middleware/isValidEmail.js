
const axios = require('axios');
module.exports = (req,res,next)=>{
    const email = req.body.useremail;
    const index = email.indexOf('@');
    
    const emailserver = email.substring(index+1);
    console.log(emailserver);
    console.log(typeof(emailserver))
    axios.get(emailserver)
    .then(response=>{
        console.log("response////////////////////////////////////////////////////",response)
        if(response.status === 200){
            next();
        }
        else{
            res.send('Invalid Email Server');
        }
    })
    .catch(err=>{
        console.log("err>>>>>>>>>>>>>>>",err);
        console.trace("trace",err);
        throw err;

    });
    
}