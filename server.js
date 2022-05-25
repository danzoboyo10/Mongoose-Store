// Dependencies 
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/products.js');
const methodOverride = require('method-override')


// Database Connection 
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
	useUnifiedTopology: true
})

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));


// SEED DATA: 
const productSeed = require('./models/productSeed.js');
const res = require('express/lib/response');

app.get('/products/seed', (req, res) => {
	Product.deleteMany({}, (error, allProducts) => {});

	Product.create(productSeed, (error, data) => {
		res.redirect('/products');
	});
});





// Routes


// INDEX 

app.get('/products', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        });
        
    });
});



//NEW
app.get('/products/new', (req, res) => {
    res.render('new.ejs');
})




//DELETE

app.delete('/products/:id', (req, res)=> {
    Product.findByIdAndDelete(req.params.id,(err, data) => {
        res.redirect("/products")
    })
})
// Update


 app.put("/products/:id", (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        },
        (error, updatedProduct) => {
          res.redirect(`/products/${req.params.id}`)
        }
      )
    })


//CREATE
app.post('/products', (req, res)=> {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products');
    });
});


//EDIT
app.get("/products/:id/edit", (req, res) => {
	Product.findById(req.params.id, (error, foundProduct) => {
        if(error) 
        console.log(err)
        res.render("edit.ejs", {
		product: foundProduct,
	  })
	})
  })

  



// SHOW
app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        res.render('show.ejs', {
            product : foundProduct,
        });
    });
});
app.post('/products/:id/buy', (req, res)=> {
    Product.findById(req.params.id, (err, data) => {
        if (data.qty > 0) {
            data.qty-- 
            data.save(()=> {
                res.redirect(`/products/${data.id}`)
            })

        } else {
            res.redirect(`/products/${data.id}`)

        }


    })

});
















//Listener
const PORT = process.env.PORT;

app.listen(PORT, () =>{
    console.log(`The server is listening on port: ${PORT}`)
})