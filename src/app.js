require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
var cors = require('cors');
const dbpath = require('./db/db');
const path = require('path');
const templates_path = path.join(__dirname, '../template/views/');
const register = require('./db/models/user-registration');
const userProblem = require('./db/models/userdetails');
const ResearcherRegisterCollection = require('./db/models/researcher-register');
const bcrypt = require('bcryptjs');
const contactusCollection = require('./db/models/contactus');
const session = require('express-session');
const shortid = require('shortid');
const MongoDBStore = require('connect-mongodb-session')(session);
const addWebsiteCollection = require('./db/models/add_website');
const dotenv = require('dotenv');
console.log('MongoDB connection string:', process.env.MONGO_CONNECT_URI);

const partials_path = path.join(__dirname, '../template/partial/');
const hbs = require('hbs');

app.use(cors());
app.set('view engine', 'hbs');
hbs.registerPartials(partials_path);
app.set('views', templates_path);
app.use(express.static(templates_path));
app.use(express.json());

/***************** Registering AdminBro ******************/
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');

// Register the Mongoose adapter
AdminBro.registerAdapter(AdminBroMongoose);

// Create a new instance of AdminBro
const adminBro = new AdminBro({
  resources: [
    { resource: register },
    { resource: ResearcherRegisterCollection },
    { resource: addWebsiteCollection },
    { resource: userProblem },
    { resource: contactusCollection },
    // Add more resources as needed
  ],
  rootPath: '/admin',
});

// Build and use the AdminBro router
const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    if (email === 'admin@webthreathunt.com' && password === 'Password') {
      // Create a dummy user object
      const user = {
        email: 'admin@webthreathunt.com',
        encryptedPassword: password,
      };
      return user;
    }
    return null; // Return null if authentication fails
  },
  cookiePassword: 'session Key', // Change this to a secure password
});

app.use(adminBro.options.rootPath, adminRouter);

app.use(express.urlencoded({ extended: false }));

/*************** End of AdminBro *******************/



  
//Middleware for auth 
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.redirect(`/signin_customer`);
    }
}
const store = new MongoDBStore({
    uri: process.env.MONGO_CONNECT_URI,
    collection: 'mySessions'
  });
  
  // Configure session middleware
  app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      store: store,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // Session expiration time (1 day)
      },
    })
  );


app.get('/', (req, res) => {
    res.render(`index`);
});
app.get(`/signup`, (req, res) => {
    res.render(`signup`);
});
app.get(`/about`, (req, res) => {
    res.render(`about`);
});
app.get(`/contact`, (req, res) => {
    res.render(`contact`);
});

app.get(`/service`, (req, res) => {
    res.render(`service`);
});
app.get(`/quote`, (req, res) => {
    res.render(`quote`);
});
app.get(`/project`, (req, res) => {
    res.render(`project`);
});
app.get(`/feature`, (req, res) => {
    res.render(`feature`);
});
app.get(`/testimonial`, (req, res) => {
    res.render(`testimonial`);
});
app.get(`/signin_customer`, (req, res) => {
    res.render(`signin_customer`);
});
app.get(`/signup_researcher`, (req, res) => {
    res.render(`signup_researcher`);
});

app.get(`/dashboard`, isAuth, (req, res) => {
    res.render(`dashboard`);
});
app.get(`/logout`, isAuth, (req, res) => {
    res.render(`index`);
});

app.get(`/dashboard_customer`, isAuth, (req, res) => {
    res.render(`dashboard_customer`);
});

app.get(`/contact_researcher`, isAuth, (req, res) => {
    res.render(`contact_researcher`);
});

app.get(`/team`, isAuth, (req, res) => {
    res.render(`team`);
});

app.get(`/team_client`, isAuth, (req, res) => {
    res.render(`team_client`);
});

app.get(`/contact_client`, isAuth, (req, res) => {
    res.render(`contact_client`);
});

app.get(`/signin_researcher`, (req, res) => {
    res.render(`signin_researcher`);
});

app.post('/dashboard_customer', isAuth, (req, res) => {
    res.render('/dashboard_customer');
});



app.get('/add_website', isAuth, (req, res) => {
    res.render('add_website');
});

app.get('/editdashboard', isAuth, (req, res) => {
    res.render('editdashboard');
});

// Route handler to display website data
app.get('/listedwebsite', isAuth, async (req, res) => {
    try {
      const websites = await addWebsiteCollection.find().select('cname email website');
      res.render('listedwebsite', { websites: websites });
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

  

//customer Signup Form sync
app.post(`/signup`, async (req, res) => {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.cpassword;
        if (password === confirmpassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const chashpassword = await bcrypt.hash(confirmpassword, salt)
            const registerUser = new register({
                name: req.body.firstname, // Ensure that name field is included in data
                email: req.body.email,
                password: hashedPassword,
                confirmpassword: chashpassword
            });

            const registered = await registerUser.save();
            res.status(201).render(`index`);
        } else {
            res.status(400).send("Passwords do not match");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});
//Normal user Problem details
app.post('/index', async (req, res) => {
    try {
        const userDetails = new userProblem({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            message: req.body.message,
            selector: req.body.selector
        })
        const registered2 = await userDetails.save();
        res.status(201).render(`index`);
    } catch (error) {
        res.status(400).send(error);
    }
}); // <--- Add this closing brace


//Researcher Signup Form sync

app.post(`/signup_researcher`, async (req, res) => {
    try {
        const password = req.body.password;
        const confirmpassword = req.body.cpassword;
        if (password === confirmpassword) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const chashpassword = await bcrypt.hash(confirmpassword, salt)

            const ResearcherUser = new ResearcherRegisterCollection({
                name: req.body.firstname, // Ensure that name field is included in data
                email: req.body.email,
                password: hashedPassword,
                confirmpassword: chashpassword
            });
            console.log("User is signed in", req.session);
            const registered = await ResearcherUser.save();
            res.status(201).render(`index`);
        } else {
            res.status(400).send("Passwords do not match");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

//login checking for customer
app.post(`/signin_customer`, async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;
        const user = await register.findOne({
            email: email
        });
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const userId = shortid.generate();
            req.session.userId = userId;
            req.session.isAuth = true;
            req.session.user = register.email;
            res.status(201).render(`dashboard_customer`, {
                user: user
            });
        } else {
            res.send("invalid password details");
        }

    } catch (error) {
        res.status(400).send("invalid login details");
    }

})

//login checking for researcher
app.post(`/signin_researcher`, async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await ResearcherRegisterCollection.findOne({
            email: email
        });

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            req.session.isAuth = true;
            res.status(201).render(`dashboard.hbs`, {
                user: user
            });
        } else {
            res.send("invalid password details");
        }
    } catch (error) {
        res.status(400).send("invalid login details");
    }
});

//contact us informations
app.post(`/contact`, async (req, res) => {
    try {
        let {
            name,
            email,
            subject,
            message
        } = req.body;
        const contactusData = new contactusCollection({
            name,
            email,
            subject,
            message,
        })
        const contactfetch = await contactusData.save();
        res.status(201).render(`index`);


    } catch (error) {
        res.status(400).send(error)
    }

});

//Add website

app.post(`/add_website`, async (req, res) => {
    try {
        const vdp = new addWebsiteCollection({
            fname: req.body.fname,
            lname: req.body.lname,
            cname: req.body.cname,
            country: req.body.country,
            email: req.body.email,
            phone: req.body.phone,
            website: req.body.website,
            
        });

        const vdpfetch = await vdp.save();
        res.status(200).render(`add_website`);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post(`/logout`, (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.render(`index`);
    });
})

app.listen(port, () =>

    {
        console.log(`Nodejs server is Running on ${port}`);
    })