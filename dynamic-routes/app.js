const path = require('path');


const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const sequelize=require('./util/database');
const Product=require('./models/product');
const User=require('./models/user');
const Cart=require('./models/cart');
const CartItem=require('./models/cartitem');
const Order=require('./models/order');
const OrderItem=require('./models/orderItem')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next)=>{
    User.findAll({where:{id:'1'}})
    .then(([user])=>{
        req.user=user;
        next();
    })
    .catch(err => console.log(err))
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Product.belongsToMany(Cart,{ through: CartItem});
Cart.belongsToMany(Product, { through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Product.belongsToMany(Order, { through: OrderItem});
Order.belongsToMany(Product, { through: OrderItem});

sequelize.sync()
.then(()=>{
    console.log('Entered the database');
    return User.findAll({where:{id:'1'}})
})
.then(([user]) => {
    if(!user)
    {
        return User.create({name:'abdul', email:'test@gmail.com'});
    }
    return user;
})
.then(user => {
    return user.createCart();
   
})
.then(cart => {
    app.listen(4000);
})
.catch(err => console.log(err));



