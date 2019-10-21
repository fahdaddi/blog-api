const _ = require('underscore');

module.exports = {
    createArticle: (req, res) => {
        if (!req.body.title || !req.body.content || req.body.imageUrl || req.body.category_id) {
            res.status(422).json({
                status: 'failled',
                message: 'category name is required!'
            })
        }
        let formData = {
            title: req.body.title,
            body: req.body.content,
            image: req.body.imageUrl,
            author: req.user ? req.user.id : 'null',
            category: req.body.category_id
        }
        Article.create(formData).exec((err, result) => {
            if (err) {
                res.status(500);
                return res.send({
                    status: 'failled',
                    message: `A server error has been occured while creatting category`,
                    errors: err
                })
            }
            res.status(201).json({
                status: 'success',
                message: "category created succefully",
            })
        })
    },
    getArticles: (req, res) => {
        // if (req.param('limit') && req.param('skip')) {

        // } else if (req.param('limit')) {

        // } else {
        Article.find({
            limit: 10,
            sort: 'createdAt DESC'
        }).exec((err, result) => {
            if (err) {
                return res.status(500).json({
                    status: 'failled',
                    message: `A server error has been occured`,
                })
            }
            res.status(200).json({
                status: 'success',
                message: "articles retrieved succefully",
                ressouces: {
                    articles: result
                }
            })
        })
        // }
    },
    getArticlesByAuthor: (req, res) => {
        if (!req.param('username')) {
            return res.status(404).json({
                status: 'failed',
                message: 'ressource not found!'
            })
        }
        User.findOne({ name: req.param('username') }).exec((err, uesr) => {
            if (err) {
                return res.status(500).json({
                    status: 'failled',
                    message: `A server error has been occured`,
                })
            }
            if (!user) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'user not found!'
                })
            }
            Article.find({
                where: {
                    author: user.id
                },
                limit: 10,
                sort: 'createdAt DESC'
            }).exec((err, result) => {
                if (err) {
                    return res.status(500).json({
                        status: 'failled',
                        message: `A server error has been occured`,
                    })
                }
                res.status(200).json({
                    status: 'success',
                    message: "articles retrieved succefully",
                    ressouces: {
                        articles: result
                    }
                })
            })
        });
    }
}