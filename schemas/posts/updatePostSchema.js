const Joi = require('joi');

const updatePostBodySchema = Joi.object({
    title: Joi.string().min(3).max(200),
    content: Joi.string().min(10),
    author: Joi.string().min(2).max(100),
    tags: Joi.array().items(Joi.string()),
    published: Joi.boolean(),
}).min(1); // لازم field واحد على الأقل

const updatePostParamsSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
});

const schema = {
    body: updatePostBodySchema,
    params: updatePostParamsSchema,
};

module.exports = schema;
