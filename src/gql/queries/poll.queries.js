import gql from 'graphql-tag'

export const POLLS = gql`
  query Polls {
    polls {
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