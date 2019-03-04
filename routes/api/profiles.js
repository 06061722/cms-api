const express = require("express")
const router = express.Router()
const passport = require('passport')

const Profile = require('../../model/Profile')

// $route   GET api/profiles/test
// @desc    返回请求的json数据
// @a ccess  public  
router.get('/test', (req, res) => {
  res.json({ msg: 'profile works' })
})


// $route   POST api/profiles/add
// @desc    创建信息接口
// @a ccess  private
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const profileField = {}

  if (req.body.type) profileField.type = req.body.type
  if (req.body.describe) profileField.describe = req.body.describe
  if (req.body.income) profileField.income = req.body.income
  if (req.body.expend) profileField.expend = req.body.expend
  if (req.body.cash) profileField.cash = req.body.cash
  if (req.body.remark) profileField.remark = req.body.remark

  new Profile(profileField).save().then(profile => {
    res.json(profile)
  })
})

// $route   GET api/profiles/profiles
// @desc    获取所以信息
// @a ccess  private

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.find()
    .then(profile => {
      if (!profile) return res.status(400).json('没有任何内容')
      return res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})


// $route   GET api/profiles/profiles/:id
// @desc    获取单个信息
// @a ccess  private

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ _id: req.params.id })
    .then(profile => {
      if (!profile) return res.status(400).json('没有任何内容')
      return res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})


// $route   POST api/profiles/edit
// @desc    编辑信息接口
// @a ccess  private
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const profileField = {}

  if (req.body.type) profileField.type = req.body.type
  if (req.body.describe) profileField.describe = req.body.describe
  if (req.body.income) profileField.income = req.body.income
  if (req.body.expend) profileField.expend = req.body.expend
  if (req.body.cash) profileField.cash = req.body.cash
  if (req.body.remark) profileField.remark = req.body.remark

  Profile.findOneAndUpdate({ _id: req.params.id }, { $set: profileField }, { new: true })
    .then(profile => res.json(profile))
})

// $route   POST api/profiles/delete/:id
// @desc    删除
// @a ccess  private
router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

  Profile.findByIdAndRemove({ _id: req.params.id })
    .then(profile => profile.save().then(profile => res.json(profile))
    .catch(err => res.status(404).json('删除失败')))
})



module.exports = router