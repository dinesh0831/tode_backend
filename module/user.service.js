
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Userlist = require("../schema/userSchema");
const { registerSchema, logginSchema, resetSchema } = require("../schema/userValidation");


const mailgun = require("mailgun-js");
const DOMAIN = process.env.mailgunDomain;
const mg = mailgun({ apiKey: "9c4f011d75636f1882b03923dd7377af-7dcc6512-9c463b8e", domain: DOMAIN });

const UserService = {
 
    async register(req, res) {
        try {
            // validation
            let { email, mobileno, name, address, password } = req.body
            const { error } = await registerSchema.validate(req.body);
            if (error){
                return res.send({ message: "*validation failed" })
            }
           //password bcrypt
                const salt = await bcrypt.genSalt();
                password = await bcrypt.hash(password, salt)

            // check the email existing or not
            await Userlist.findOne({ email: email }).exec(async (err, user) => {
                if (user) {
                    return res.send({ message: "*User already exist" });
                }
                let users = new Userlist({
                    email: email,
                    password: password,
                    name: name,
                    mobileno: mobileno,
                    address: address,
                    role: "enduser"

                });
              const response = await users.save();
              res.send({message:"*successfully registered"})
               
            })

            // insert register data


        }
        catch (error) {
            res.sendStatus(500)
        }




    },
    async login(req, res) {
        try {


            // validation
            const { error } = await logginSchema.validate(req.body);
            if (error)
                return res.send({ message: "*validation failed" })


            // email is registered or not
            const user = await Userlist.findOne({ email: req.body.email }).exec()
            console.log(user)
            if (!user) return res.send({ message: "*User not exist" })



            // check the password
            const isValid = await bcrypt.compare(req.body.password, user.password)
            if (!isValid) return res.send({ message: "*email and password not matching", });



            // token for access the account
            const token = await jwt.sign({ user }, process.env.authkey, { expiresIn: "8hr" })
            console.log(token)


            // respose for logged in
            res.send({ message: "*successfully loggedIn", token })

        }
        catch (error) {
            console.log("Error", error)
            res.sendStatus(500)
        }
    },
    

}
module.exports = UserService
