const express = require('express')
const router = express.Router()

const { User, Post, Image, Comment } = require('../models')
const { isLoggedIn  } = require('./middlewares')

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id
    })

    const fullPost = await Post.findOne({
      where: { id: post.id },
      
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
      }]
    })

    res.status(201).json(fullPost)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    await Post.destroy({ // sequelize row 삭제
      where: {
        id: req.params.postId,
        UserId: req.user.id // 내가 쓴 게시글인지 확인
      }
    })
    res.status(200).json({ PostId: parseInt(req.params.postId, 10) })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    })

    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다')
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id
    })

    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname']
        }
      ]
    })

    res.status(201).json(fullComment)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.patch('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId, 10) }
    })

    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다')
    }

    await post.addLikers(req.user.id)
    res.json({
      PostId: post.id,
      UserId: req.user.id
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: parseInt(req.params.postId, 10) }
    })

    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다')
    }

    await post.removeLikers(req.user.id)
    res.json({
      PostId: post.id,
      UserId: req.user.id
    })
  } catch (err) {
    console.error(err)
    next(err)
  }
})

module.exports = router