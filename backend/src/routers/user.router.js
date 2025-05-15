import {Router} from "express";
import { sample_users } from "../data.js";
import jwt from "jsonwebtoken";
import handler from "express-async-handler";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import auth from "../middleware/Auth.mid.js";
import admin from "../middleware/admin.mid.js";
import {sendMail} from "../mailer/mailer.js";

const router = Router();

router.get("/verifytoken" , 
  auth , 
  handler (async (req ,res) => {
    try {
      res.status(200).json({
          success : true,
          msg : "User data fetched",
      })
    } catch (err){
        return res.status(401).json({
            success: false,
            msg : err.message
        })
    }
  }
));

router.post("/login", handler( async (req, res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne( {email : email.toLowerCase()});

    if(user && (await bcrypt.compare(password, user.password ))) {
        return res.send(generateTokenResponse(user));
    }
    res.status(400).send("username or password is invalid !");
}));

router.post("/register", 
    handler (async(req, res) => {
        const {name , email , password, address, phone} = req.body;
        const isAlreadyRegistered = await userModel.findOne({email});
        if(isAlreadyRegistered) return res.status(400).send("user already registered !");
        
        const salt_rounds = Number(process.env.SALT_ROUNDS);
        const encPass = await bcrypt.hash(password,salt_rounds);

        const newUserDetails = {
            name ,
            email : email.toLowerCase() , 
            password : encPass , 
            address,
            phone,
        }

        const resultUser = await userModel.create(newUserDetails);

        const msg = ` <p> 
                        <h2> Hello ,
                          <b> ${resultUser.name}</b> 
                        </h2> 
                        <br><br>
                        Please 
                        <a href='${process.env.CLIENT}/email_verification?id=${resultUser._id}' >
                          Verify
                        </a> 
                        your e-mail
                      </p>`;
        sendMail(email, "Mail Verification", msg);
        res.send(generateTokenResponse(resultUser));
    })
);
router.put("/email_verification/:id", async (req, res) => {
  try {
    if(req.params.id === undefined){
        return res.status(200).json({
            success : false,
            msg : "id undefined"
        })
    }
    const userData = await userModel.findOne({_id: req.params.id});
    if(userData){
      if(userData.is_verified){
          return res.status(200).json({
              success : true
          })
      }
      const updatedUser = await userModel.findOneAndUpdate(
        {_id : req.params.id},
        {
          $set:{
              is_verified : true
          },
        },
        {new : true}
      );
      return res.status(200).json({
          success : true,
          data : updatedUser
      })
    } else {
        return res.status(400).json({
            success : false
        })
    }
  } catch (err){
      return res.status(400).json({
          success : false
      })
  }
});

router.get("/send_email_verification/:id", async (req, res) => {
  try {
    if(req.params.id === undefined){
      return res.status(401).json({
        success : false,
        msg : "id undefined"
      })
    }
    const userData = await userModel.findById({_id : req.params.id});
    if(!userData){
        return res.status(400).json({
            success : false,
            msg : "user doesn't exist"
        })
    }
    if(userData.is_verified){
        return res.status(200).json({
            success : true,
            msg : userData.email + " is already verified"
        });
    }
    const msg = ` <p> 
                    <h2> Hello ,
                      <b> ${userData.name}</b> 
                    </h2> 
                    <br><br>
                    Please 
                    <a href='${process.env.CLIENT}/email_verification?id=${req.params.id}' >
                      Verify
                    </a> 
                    your e-mail
                  </p>`;
    sendMail(userData.email, "Mail Verification", msg);

    return res.status(200).json({
        success : true,
        msg : "Verification link sent!",
        userData 
    });
  } catch (err){
    console.log(err);
  }
})

router.put("/updateProfile",
    auth ,
    handler ( async (req , res) => {
        const {name , address , phone} = req.body;
        const user = await userModel.findByIdAndUpdate(
            req.user.id,
            {name , address , phone },
            {new : true }
        );
        res.send(generateTokenResponse(user));
    })
);

router.put("/changePassword" ,
    auth ,
    handler( async (req, res) => {
        const {currPass , newPass, confirmPass} = req.body;
        const user = await userModel.findById(req.user.id);
        if(!user) {
            res.status(400).send("Change password failed !");
            return;
        }
        const equal = await bcrypt.compare(currPass, user.password);
        if(!equal) {
            return res.status(400).send("Current password is not correct!");
        }
        user.password = await bcrypt.hash(newPass, Number(process.env.SALT_ROUNDS));
        await user.save();
        res.send();
    })
)


router.get(
    '/getall/:searchTerm?',
    admin,
    handler(async (req, res) => {
      const { searchTerm } = req.params;
  
      const filter = searchTerm
        ? { name: { $regex: new RegExp(searchTerm, 'i') } }
        : {};
  
      const users = await userModel.find(filter, { password: 0 });
      res.send(users);
    })
  );
  
  router.put(
    '/toggleBlock/:userId',
    admin,
    handler(async (req, res) => {
      const { userId } = req.params;
  
      if (userId === req.user.id) {
        res.status(BAD_REQUEST).send("Can't block yourself!");
        return;
      }
  
      const user = await userModel.findById(userId);
      user.isBlocked = !user.isBlocked;
      user.save();
  
      res.send(user.isBlocked);
    })
  );
  
  router.get(
    '/getById/:userId',
    admin,
    handler(async (req, res) => {
      const { userId } = req.params;
      const user = await userModel.findById(userId, { password: 0 });
      res.send(user);
    })
  );
  
  router.put(
    '/update',
    admin,
    handler(async (req, res) => {
      const { id, name, email, address, isAdmin } = req.body;
      await userModel.findByIdAndUpdate(id, {
        name,
        email,
        address,
        isAdmin,
      });
  
      res.send();
    })
  );
const generateTokenResponse = user => {
    const token = jwt.sign({
        id:user.id, email: user.email, isAdmin : user.isAdmin, 
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"7d"
    }
    );
    return {
        id:user.id, 
        email: user.email, 
        isAdmin : user.isAdmin, 
        name:user.name,
        address: user.address ,
        phone : user.phone , 
        token , 
        is_verified : user.is_verified
    }
}

export default router;