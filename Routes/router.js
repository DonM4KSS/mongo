const { Router } = require('express')
const Product = require('../models/product')
const router = Router()

router.get('/', async (req, res) => {
  const products = await Product.find({}).lean()

  res.render('index', {
    title: 'Витрина',
    isIndex: true,
    products
  })
})

router.get('/createPage', (req, res) => {
  res.render('createPage', {
    title: 'Создать товар',
    isCreate: true
  })
})

router.get('/product', async (req, res) => {
    let id = req.query.id
    const product = await Product.find({_id: id}).lean()

    res.render('product', {
      title: 'Страница товара',
      product
    })
})

router.post('/create', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  })

  await product.save()
  res.redirect('/')
})

router.post('/edit', async (req, res) => {
    let edit = {
        name          : req.body.name,
        price : req.body.price
    };
    
    let id = req.body.id
    
    Product.findByIdAndUpdate(id, {$set: edit}, function(err,article){
        res.redirect('/')
    });
  })

module.exports = router