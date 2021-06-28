const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const auth = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (_root, args, context) => {
            if (context.user) {
                const userData = await User.findOne({})
                    .select('-__v -password')
                    .populate('books');
                
                return userData;
            }

            throw new AuthenticationError('Not logged in!');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('books');
        }
    },
    Mutation: {
        login: async (_root, { email, password }) => {
            const user = await User.findOne({ email });
            
            if (!user) {
                throw new AuthenticationError('Incorrect credentials)');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials)');
            }

            const token = signToken(user);
            return { token, user };
        },
        addUser: async (_root, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (_root, arg) => {
            console.log(_root);
            try {
                const updatedUser = await User.findOneAndUpdate(
                  { _id: user._id },
                  { $addToSet: { savedBooks: body } },
                  { new: true, runValidators: true }
                );
                
                console.log("from saveBook function");
                console.log(updatedUser);

                return { updatedUser };
            } catch (err) {
                console.log(err);
                return { err };
            }

        },
        removeBook: async (_root, { bookId }) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
            );

            console.log("from removeBook function");
            console.log(updatedUser);

            return { updatedUser };
        },
        
    }
};

// exports resolvers
module.exports = resolvers;