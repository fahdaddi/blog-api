
module.exports = {
    createCategory: (req, res) => {
        if (!req.body.name) {
            res.status(422);
            res.json({
                status: 'failled',
                message: 'category name is required!'
            })
        }
        let formData = {
            name: req.body.name,
            icon: req.body.icon,
            createdBy: req.user ? req.user.id : 'null'
        };
        Category.create(formData).exec((err, sample) => {
            if (err) {
                res.status(500);
                return res.send({
                    status: 'success',
                    message: `A server error has been occured while creatting category`,
                    errors: err
                })
            }
            else {
                res.status(201);
                res.json({
                    status: 'success',
                    message: "category created succefully",
                })
            }
        })
    },
    getCategoryById: (req, res) => {
        if (!req.param('category_id')) {
            res.status(404);
            return res.json({
                status: 'failed',
                message: 'ressource not found!'
            })
        }
        Category.findOne({ name: req.param('category_id') }).exec((err, category) => {
            if (err) {
                res.status(404);
                return res.json({
                    status: 'failed',
                    message: 'ressource not found!',
                    errors: err
                })
            } else {
                res.status(200);
                res.json({
                    status: 'success',
                    message: "category retrieved succefully",
                    ressouces: {
                        category: category
                    }
                })
            }
        })

    },
    getCategories: (req, res) => {
        Category.find({}).exec((err, categories) => {
            if (err) {
                res.status(500);
                return res.json({
                    status: 'failed',
                    message: 'Server error!',
                    errors: err
                })
            }
            res.status(200);
            res.json({
                status: 'success',
                message: "category retrieved succefully",
                ressouces: {
                    categories: categories
                }
            })
        })
    }
}