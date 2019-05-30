import pollResolvers from './poll.resolvers'

export default {
  Query: {
    ...pollResolvers.queries
  },

  Mutation: {
    ...pollResolvers.mutations
  },

  Subscription: {
    ...pollResolvers.subscriptions
  },
}