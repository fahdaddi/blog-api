module.export = {
    attributes: {
        title: {
            type: "string",
            required: true
        },
        body: {
            type: "object",
            required: true,
        },
        image: {
            type: "string",
        },
        author: {
            model: 'user',
        },
        category: {
            model: 'category',
        },
        // comments: {
        //     collection: "comment",
        // },


    }
};