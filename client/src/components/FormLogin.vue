<template>
  <div id="form">
    <b-modal hide-footer :id="formId" centered title="Member?" :ref="formId">
      <b-form @submit.prevent="onSubmit" v-if="show">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            v-model="form.password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="success">Login</b-button>
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
        email: '',
        password: '',
      },
      show: true,
    };
  },
  methods: {
    onSubmit() {
      this.$emit('onSubmit', {
        email: this.form.email,
        password: this.form.password,
      });
      this.onReset();
      this.$refs[this.formId].hide();
    },
    onReset() {
      // Reset our form values
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
