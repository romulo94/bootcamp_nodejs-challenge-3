const Ad = require('../models/Ad')
const User = require('../models/User')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async index (req, res) {
    const purchaseAll = await Purchase.find().populate('ad')
    const purchase = purchaseAll.filter(el => {
      return el.ad.author == req.userId
    })

    return res.json(purchase)
  }

  async store (req, res) {
    const { ad, content } = req.body

    const purchaseAd = await Ad.findById(ad).populate('author')
    const user = await User.findById(req.userId)

    const purchase = await Purchase.create({
      ...req.body,
      interested: user._id
    })

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content
    }).save()

    return res.json(purchase)
  }

  async update (req, res) {
    const purchase = await Purchase.findById(req.params.id).populate('ad')

    const ad = await Ad.findByIdAndUpdate(
      purchase.ad.id,
      { purchasedBy: req.params.id },
      { new: true }
    )

    return res.json(ad)
  }
}

module.exports = new PurchaseController()
