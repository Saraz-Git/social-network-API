const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            get: (date) => {
                if (date) return date.toISOString().split("T")[0];
            },
            default: Date.now
        },
    },
    {
        toJSON: {
            getters: true,
        },
        _id: false,
    }
);

module.exports = reactionSchema;
