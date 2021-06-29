const express = require('express')
const router = express.Router()

const { Post, User, Image, Comment } = require('../models')

router.get('/', async (req, res, next) => { // GET /posts
  try {
    const posts = await Post.findAll({
      limit: 10, // 10개씩 가져오기
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'ASC']
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname']
        },
        { model: Image },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname']
            }
          ]
        }
      ]
    })

    res.status(200).json(posts)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

module.exports = router