const { signToken } = require('../utils/auth');
const { User } = require('../models');

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

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }

            const token = signToken(user);
            return { token, user };

        },

        deleteBook: async (parent, args, context) => {
            const deleteBook = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );
            if (!deleteBook) {
                return res.status(404).json({ message: 'Could not find book with this ID' });
            }
            return deleteBook;
        },

        saveBook: async (parent, {user, body}) => {
            try {
                const updateBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: body } },
                    { new: true, runValidators: true }
                );
                return updateBook;
            } catch (err) {
                return err;
            }
        }
    },
};

module.exports = resolvers;