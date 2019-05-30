import gql from 'graphql-tag'

export const OPTION_VOTED = gql`
  subscription OptionVoted {
    optionVoted {
      id
      votes
    }
  }
`

export const POLL_CREATED = gql`
  subscription PollCreated {
    pollCreated {
      id
      title
      description
      options {
        id
        name
        votes
      }
    }
  }
`