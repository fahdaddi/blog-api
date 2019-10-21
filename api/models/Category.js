module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true,
            unique: true
        },
        createdBy: {
            type: 'string',
            required: true
        },
        icon: {
            type: 'string',
            required: true
        }
        // articles: {
        //     collection: 'Article',
        //     via: 'category'
        // }

    }
}