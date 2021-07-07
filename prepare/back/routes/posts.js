const express = require('express')
const { Op } = require('sequelize')
const router = express.Router()

const { Post, User, Image, Comment } = require('../models')

router.get('/', async (req, res, next) => { // GET /posts
  try {
    const where = {}
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
    }

    const posts = await Post.findAll({
      where,
      limit: 10, // 10개씩 가져오기
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'ASC']
      ],
      include: [{
        model: User, // 게시글 작성자
        attributes: ['id', 'nickname']
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id']
      }, {
        model: Comment, // 댓글
        include: [{
          model: User, // 댓글 작성자
          attributes: ['id', 'nickname']
        }]
      }, {
        model: Image // 이미지
      }, {
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      }]
    })

    res.status(200).json(posts)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

module.exports = router