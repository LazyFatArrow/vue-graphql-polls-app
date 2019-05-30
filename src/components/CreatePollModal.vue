<template>
  <div>
    <b-button @click="isModalVisible = true">Create Poll</b-button>

    <b-modal
      v-model="isModalVisible"
      @ok="$emit('createPoll', pollForm)"
      title="Create a new poll"
      centered
    >
      <b-form-group label="Title">
        <b-form-input
          v-model="pollForm.title"
        />
      </b-form-group>
      <b-form-group label="Description">
        <b-form-textarea
          v-model="pollForm.description"
        />
      </b-form-group>
      <b-form-group label="Options">
        <b-form-input
          v-model="pollForm.options[index].name"
          v-for="(option, index) in pollForm.options"
          :key="`poll-form-option-${index}`"
        />
      </b-form-group>
      <b-form-group>
        <b-btn @click="addOption">Add Option</b-btn>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>

export default {
  methods: {
    addOption() {
      this.pollForm.options.push({
        name: '',
      })
    },
  },

  data: () => ({
    isModalVisible: false,
    pollForm: {
      title: '',
      description: '',
      options: [
        {
          name: '',
        }
      ],
    },
  })
}
</script>