<template>
  <b-container class="my-5">
    <b-row>
      <b-col>
        <CreatePollModal
          @createPoll="handleCreatePoll"
        />
      </b-col>
    </b-row>
    <b-row class="mt-3" v-if="polls && polls.length">
      <b-col>
        <b-card-group columns>
          <SinglePoll
            v-for="poll in polls"
            @optionVote="handleOptionVote"
            :key="`poll-${poll.id}`"
            :poll="poll"
          />
        </b-card-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { POLLS } from '@/gql/queries/poll.queries'
import { VOTE_ON_POLL, CREATE_POLL } from '@/gql/mutations/poll.mutations'
import { OPTION_VOTED, POLL_CREATED } from '@/gql/subscriptions/poll.subscriptions'

import SinglePoll from '@/components/SinglePoll.vue'
import CreatePollModal from '@/components/CreatePollModal.vue'

export default {
  components: {
    SinglePoll,
    CreatePollModal,
  },

  apollo: {
    polls: {
      query: POLLS,
      subscribeToMore: [
        {
          document: OPTION_VOTED,
        },
        {
          document: POLL_CREATED,
          updateQuery(previousResult, { subscriptionData }) {
            return {
              polls: [
                subscriptionData.data.pollCreated,
                ...previousResult.polls,
              ]
            }
          }
        }
      ]
    }
  },

  methods: {
    handleOptionVote(optionId) {
      this.$apollo.mutate({
        mutation: VOTE_ON_POLL,
        variables: {
          optionId
        }
      })
    },

    handleCreatePoll(pollForm) {
      this.$apollo.mutate({
        mutation: CREATE_POLL,
        variables: {
          poll: pollForm,
        },
      })
    }
  }
}
</script>