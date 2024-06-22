const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    //get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get a thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create a new thought
    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            console.log(dbThoughtData._id);
            console.log(req.body.username);
            const user = await User.findOne({ username: req.body.username });
            // const result = await Department.findOne({ name: req.params.name });
            // res.status(200).json(result);



            if (!user) {
                return res.status(404).json({ message: 'No user with that username' });
            }
            // user.thoughts.push();
            console.log(user);






            res.json(dbThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            //remove a thought's associated reactions when the thought is deleted
            // await Reaction.deleteMany({ _id: { $in: thought.reactions } });
            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
                $addToSet: {
                    reactions: {
                        reactionBody: req.body.reactionBody,
                        username: req.body.username,
                    }
                },
            },
                {
                    runValidators: true,
                    new: true,
                });
            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            };
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        };
    },

    // delete a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, {
                $pull: {
                    reactions: {
                        _id: req.params.reactionId,
                    }
                },
            },
                {
                    runValidators: true,
                    new: true,
                });
            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            };
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        };
    },

};
