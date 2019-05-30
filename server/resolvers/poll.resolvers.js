import { PubSub } from 'apollo-server'
import { POLL_CREATED, OPTION_VOTED } from '../events';
import * as pollService from '../services/poll.service'

const pubsub = new PubSub()

export default {
  queries: {
    polls() {
      return pollService.findAll().catch()
    }
  },

  mutations: {
    async createPoll(parent, args) {
      const poll = await pollService.create(args.poll).catch();

      pubsub.publish(POLL_CREATED, {
        [POLL_CREATED]: poll
      })

      return poll
    },

    async voteOnPoll(parent, args) {
      const poll = await pollService.voteOnPoll(args.optionId).catch();

      pubsub.publish(OPTION_VOTED, {
        [OPTION_VOTED]: poll.options.find((option) => {
          return option._id.toString() === args.optionId
        })
      })

      return poll
    }
  },

  subscriptions: {
    [POLL_CREATED]: {
      subscribe: () => pubsub.asyncIterator(POLL_CREATED),
    },

    [OPTION_VOTED]: {
      subscribe: () => pubsub.asyncIterator(OPTION_VOTED),
    }
  },
}