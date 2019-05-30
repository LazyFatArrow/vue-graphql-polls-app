<template>
  <b-card :title="poll.title" :sub-title="poll.description">
    <b-form-group>
      <b-form-radio-group
        @change="$emit('optionVote', $event)"
        :id="`poll-options-${poll.id}`"
        stacked
      >
        <b-form-radio
          v-for="option in poll.options"
          :key="`option-${option.id}`"
          :value="option.id"
        >
          {{option.name}} - {{option.votes}}
        </b-form-radio>
      </b-form-radio-group>
    </b-form-group>
  </b-card>
</template>

<script>
export default {
  props: {
    poll: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style scoped>

</style>
