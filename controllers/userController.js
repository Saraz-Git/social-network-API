const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
    //get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get a user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).select('-__v').populate('thoughts');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // create a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.status(200).json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.status(200).json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            //remove a user's associated thoughts when the user is deleted
            await Thought.deleteMany({ _id: { $in: user.thoughts } });

            // remove this user from this user's friends' friends field
            await User.findOneAndUpdate(
                { friends: req.params.userId },
                { $pull: { friends: req.params.userId } },
                { runValidators: true, new: true }
            );

            res.json({ message: 'User successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    //add a friend
    async addFriend(req, res) {
        try {
            const friend = await User.findById(req.params.friendId);
            if (!friend) {
                res.status(404).json({ message: 'No user with this id!' });
                return;
            };
            const user = await User.findByIdAndUpdate(req.params.userId, {
                $addToSet: {
                    friends: req.params.friendId,
                },
            },
                {
                    runValidators: true,
                    new: true,
                });
            if (!user) {
                res.status(404).json({ message: 'No user with this id!' });
                return;
            };
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        };
    },

    //remove a friend
    async deleteFriend(req, res) {
        try {
            const friend = await User.findById(req.params.friendId);
            if (!friend) {
                res.status(404).json({ message: 'No user with this id!' });
                return;
            };
            const user = await User.findByIdAndUpdate(req.params.userId, {
                $pull: {
                    friends: req.params.friendId,
                },
            },
                {
                    runValidators: true,
                    new: true,
                });
            if (!user) {
                res.status(404).json({ message: 'No user with this id!' });
                return;
            };
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        };
    }
};
