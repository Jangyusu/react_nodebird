const express = require('express')

const { Post } = require('../models')

const router = express.Router()

router.get('/', async (req, res, next) => { // GET /posts
  try {
    const posts = await Post.findAll({
      // where: { id: lastId },
      limit: 10, // 10개씩 가져오기
      // offset: 0, // 0번째부터 가져오기 (중간에 데이터가 추가되거나 삭제되는 경우 이슈)
      order: [['createdAt', 'DESC']] // 최신 순 가져오기,
    })

    res.status(200).json(posts)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

module.exports = router