import gql from 'graphql-tag'

export const VOTE_ON_POLL = gql`
  mutation VoteOnPoll($optionId: ID!) {
    voteOnPoll(optionId: $optionId) {
      id
    }
  }
`;

export const CREATE_POLL = gql`
  mutation createPoll($poll: CreatePollInput!) {
    createPoll(poll: $poll) {
      id
    }
  }
`;