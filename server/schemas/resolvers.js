const { signToken } = require('../utils/auth');
const {  User } = require('../models');

const resolvers = {
    Qurty: {
        user: async (parent, args, context) => {
            return await User.findOne({ _id: context.user._id });
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            if (!user) {
                return res.status(400).json({ message: 'User not created!' });
            }

            const token = signToken(user);
            return { token, user };
        },

        login: async (parent, {email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }

            const token = signToken(user);
            return { token, user};

        },
    },
};

module.exports = resolvers;