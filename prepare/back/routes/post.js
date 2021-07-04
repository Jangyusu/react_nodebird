const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router()

try {
  fs.accessSync('uploads')
} catch (err) {
  console.log('uploads 폴더가 없으므로 생성합니다')
  fs.mkdirSync('uploads')
}


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

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads')
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname) // 확장자 추출(~.png)
      const basename = path.basename(file.originalname, ext) // (example)
      done(null, basename + new Date().getTime() + ext)
    },
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  })
})
router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
  console.log('@@@@@', req.files)
  res.json(req.files.map(v => v.filename))
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