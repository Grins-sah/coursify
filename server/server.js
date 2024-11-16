//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
app.use(cors());

app.use(express.json());

const secret = "DARKSIDE"

// Define mongoose schemas
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    courses: [String],
    balance:{type:Number}
    // userSchema here
});

const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
    // adminSchema here
});

const courseSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: String
    // courseSchema here
});

// Define mongoose models
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);

const authMiddleware = (req, res, next) => {
    //  authMiddleware logic here 
    console.log(req);
    const token = req.body.token;
    try {
        const verify = jwt.verify(token, secret);
        req.username=verify.username;
        next();
    } catch (err) {
        res.status(300).json({
            msg: "authentication failed"
        })
    }
};
const authMiddlewareAdmin = (req, res, next) => {
    //  authMiddleware logic here 
    const adminToken = req.body.adminToken;
    try {
        const verify = jwt.verify(adminToken, secret);
        console.log(verify);
        req.username=verify.username;
        next();
    } catch (err) {
        res.status(403).json({
            msg: "authentication failed"
        })
    }
};

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:g!VQGQn7tqB*82P@cluster0.ekkva.mongodb.net/coursify');


// Admin routes
app.post('/admin/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hasedPass = await bcrypt.hash(password, 5);
    try {
        await Admin.create({
            username: username,
            password: hasedPass
        })
        res.json({
            msg:"admin signup "
        })
    } catch (err) {
        res.json({
            msg: err
        })
    }
});

app.post('/admin/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let foundUser = null;
    foundUser = await Admin.findOne({
        username: username
    });
    if (foundUser) {
        const response = await bcrypt.compare(password, foundUser.password);
        if (response) {
            const adminToken = jwt.sign({
                username: username
            },secret);
            res.json({
                msg: "Admid logged in",
                adminToken: adminToken
            })
        }
        else res.json({
            msg: "login credensial invalid"
        })

    }
    else{
        res.json({
            msg:"username name not found"
        })
    }


});

app.post('/admin/courses',authMiddlewareAdmin, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const published = req.body.published;
    const count = await Course.countDocuments();
    try{
        await Course.create({
            title:title,
            id:count+1,
            description:description,
            published:published,
            price:price,
            imageLink:imageLink
    
        })
        res.json({
            msg:"Course Created",
            cousrseId:`${count+1}`
        })

    }catch(err){
        res.json({msg:err.errmsg})
    }

    


});

app.put('/admin/courses/:courseId', authMiddlewareAdmin,async (req, res) => {
    const courseId = req.params.courseId;
    try{
        let foundCourse = null;
        foundCourse = await Course.updateOne({
            id:courseId
        },{$set:{
            title:req.body.title,
            description:req.body.description,
            price:req.body.price,
            imageLink:req.body.imageLink,
            published:req.body.published

        }});
        res.json({
            title:foundCourse.title,
            description:foundCourse.description,
            price:foundCourse.price,
            imageLink:foundCourse.imageLink,
            published:foundCourse.published
        })
    }catch(err){
        res.json({
            mag:err
        })
    }

});

app.get('/admin/courses', authMiddlewareAdmin,async (req, res) => {
    try{
        const courses = await Course.find();
        res.json({
            courses:courses
        })

    }
    catch(err){
        res.json({
            msg:err.errmsg
        })
    }
});

// User routes
app.post('/users/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hasedPass = await bcrypt.hash(password, 5);
    console.log(hasedPass);
    try{
        await User.create({
            username: username,
            password: hasedPass,
            courses: [],
            balance:100000000000
        })
        res.json({
            "msg": "You have Signed in"
        })
    

    }catch(err){
        res.json({
            msg:err.errmsg
        })
    }
    
    // logic to sign up user
});

app.post('/users/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let foundUser = null;
    foundUser = await User.findOne({
        "username": username,
    });
    const response = await bcrypt.compare(password, foundUser.password);
    console.log(response);
    if (response) {
        const token = jwt.sign({
            username: foundUser.username
        }, secret);
        res.status(200).json({
            msg: "password matched",
            token: token
        })
    }
    else res.status(403).json({
        msg: "password not matched"
    })
    // logic to log in user
});

app.post('/users/courses', authMiddleware, async (req, res) => {
    try{
        const courses = await Course.find({
            published:"YES"
        });
        res.json({
            courses:courses
        })

    }
    catch(err){
        res.json({
            msg:err.errmsg
        })
    }
    
});

app.post('/users/courses/:courseId',authMiddleware,async  (req, res) => {
    // logic to purchase a course
    const couresId = req.params.courseId;
    try{
        const course = await Course.findOne({
            id:couresId
        });
        const user = await User.findOne({
            username:req.username
        })
        if(user.balance>=course.price && !user.courses.includes(couresId)){
            await User.updateOne({username:req.username},{
                balance:user.balance-course.price,
                courses:[...user.courses,course.id]
            })
            res.json({
                msg:`purchased course with course id ${couresId} `
            })
        }
        else{
            res.json({
                msg:"you have already purchased it"
            })
        }
        

    }catch(err){
        res.json({
            msg:err.errmsg
        })
    }

});

app.get('/users/purchasedCourses',authMiddleware,async  (req, res) => {
    // logic to view purchased courses
    try{
        const user = await User.findOne({username:req.username});
        res.json({
            coursesPurchased:user.courses
        })
    }catch(err){
        msg:err.errmsg
    }
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});