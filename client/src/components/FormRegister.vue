<template>
  <div id="form">
    <b-modal hide-footer :id="formId" centered title="New Member?" :ref="formId">
      <b-form @submit.prevent="onSubmit" v-if="show">
        <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            required
            placeholder="Put name"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Email address:"
          label-for="input-2"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-2"
            v-model="form.email"
            type="email"
            required
            placeholder="Set email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Password:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.password"
            type="password"
            required
            placeholder="Set password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="success">Register</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    formId: String,
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      },
      show: true,
    };
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit', {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
      });
      this.onReset();
      this.$refs[this.formId].hide();
    },
    onReset() {
      // Reset our form values
      this.form.name = '';
      this.form.email = '';
      this.form.password = '';
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
