require("dotenv").config();

const path = require("path");
const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const db = require("./db");


const app = express();

const PORT = process.env.PORT || 3000;



// ======================
// MIDDLEWARE
// ======================

app.use(express.json());


app.use(express.static(
    path.join(__dirname,"../frontend")
));


// image folder access

app.use(
    "/uploads",
    express.static(
        path.join(__dirname,"uploads")
    )
);



app.get("/",(req,res)=>{

    res.redirect("/home.html");

});




// ======================
// IMAGE UPLOAD
// ======================


const storage = multer.diskStorage({

    destination:function(req,file,cb){

        cb(null,"uploads");

    },


    filename:function(req,file,cb){

        cb(
            null,
            Date.now()+"-"+file.originalname
        );

    }


});


const upload = multer({
    storage:storage
});





// ======================
// LOGIN
// ======================


app.post("/api/login",(req,res)=>{


const {
email,
password
}=req.body;



const user = db
.prepare(
"SELECT * FROM users WHERE email=?"
)
.get(email);



if(!user){

return res.status(401).json({

success:false,

message:"Email not found"

});

}




const match = bcrypt.compareSync(
password,
user.password
);



if(!match){

return res.status(401).json({

success:false,

message:"Wrong password"

});

}



res.json({

success:true,

message:"Login successful"

});


});






// ======================
// SIGNUP
// ======================


app.post("/api/signup",(req,res)=>{


const {
name,
email,
password
}=req.body;



const exist = db
.prepare(
"SELECT * FROM users WHERE email=?"
)
.get(email);



if(exist){

return res.status(400).json({

success:false,

message:"Email already exists"

});

}



const hash = bcrypt.hashSync(
password,
10
);



db.prepare(`

INSERT INTO users
(name,email,password)

VALUES(?,?,?)

`).run(
name,
email,
hash
);



res.json({

success:true,

message:"Account created"

});


});







// ======================
// PRODUCTS
// ======================


// GET PRODUCTS

app.get("/api/products",(req,res)=>{


const products = db
.prepare(
"SELECT * FROM products"
)
.all();


res.json(products);


});





// GET SINGLE PRODUCT

app.get(
"/api/products/:id",
(req,res)=>{


const product = db
.prepare(
"SELECT * FROM products WHERE id=?"
)
.get(req.params.id);



res.json(product);


});

// ======================
// ADD PRODUCT WITH IMAGE
// ======================


app.post(
"/api/products",
upload.single("image"),
(req,res)=>{


const {

name,
supplier,
price,
quantity,
category,
description

}=req.body;



const image = req.file
? req.file.filename
: "default.jpg";



const result = db.prepare(`

INSERT INTO products

(
name,
supplier,
price,
quantity,
category,
description,
image
)

VALUES(?,?,?,?,?,?,?)

`).run(

name,
supplier,
price,
quantity,
category,
description,
image

);



res.json({

success:true,

productId: result.lastInsertRowid

});


});

// ======================
// UPDATE PRODUCT (NO IMAGE)
// ======================

app.put(
"/api/products/:id",
(req,res)=>{


const {

name,
supplier,
price,
quantity,
category,
description

}=req.body;



const oldProduct = db.prepare(
"SELECT image FROM products WHERE id=?"
)
.get(req.params.id);



db.prepare(`

UPDATE products

SET

name=?,
supplier=?,
price=?,
quantity=?,
category=?,
description=?,
image=?

WHERE id=?

`).run(

name,
supplier,
price,
quantity,
category,
description,
oldProduct.image,
req.params.id

);



res.json({

success:true,

message:"Product updated"

});


});








// DELETE PRODUCT


app.delete(
"/api/products/:id",
(req,res)=>{


db.prepare(

"DELETE FROM products WHERE id=?"

)
.run(req.params.id);



res.json({

success:true,

message:"Deleted"

});


});







// ======================
// SUPPLIERS
// ======================


app.get(
"/api/suppliers",
(req,res)=>{


const suppliers=db
.prepare(
"SELECT * FROM suppliers"
)
.all();


res.json(suppliers);


});





app.post(
"/api/suppliers",
(req,res)=>{


const {

name,
email,
phone,
address,
image

}=req.body;



const result=db.prepare(`

INSERT INTO suppliers

(
name,
email,
phone,
address,
image
)

VALUES(?,?,?,?,?)

`).run(

name,
email,
phone,
address,
image

);



res.json({

success:true,

supplierId:
result.lastInsertRowid

});


});








// ======================
// START SERVER
// ======================


app.listen(
PORT,
()=>{

console.log(
`🚀 Server running at http://localhost:${PORT}`
);

}
);