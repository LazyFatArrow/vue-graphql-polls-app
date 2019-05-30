import Poll from '../models/poll.model'

export function create(data) {
  return Poll.create(data)
}

export function findAll() {
  return Poll.find().sort({ createdAt: -1 })
}

export function voteOnPoll(optionId) {
  return Poll.findOneAndUpdate({
    'options._id': optionId,
  }, {
    $inc: {
      'options.$.votes': 1,
    },
  }, {
    new: true,
  })
}