<template>
  <a-modal
    :title="isFormEdit ? 'Update a user':'Create a new user'"
    :okText="isFormEdit ? 'Update' : 'Create'"
    @cancel="() => { $emit('cancel') }"
    :visible="visible"
    @ok="() => { $emit('create') }"
  >
  <!-- <a-input
          v-model="userInfo.name.first"></a-input> -->
          <!-- :form="form" -->
    <a-form layout='vertical' >
      <a-form-item label='Họ và tên Lót'>
        <a-input
          v-model="userInfo.name.first"
          v-decorator="[
            'first',
            {
              rules: [{ required: true, message: 'Vui lòng nhập họ và tên lót!' }],
            }
          ]"
        />
      </a-form-item>
      <a-form-item label='Tên'>
        <a-input
          v-model="userInfo.name.last"
          v-decorator="[
            'last',
            {
              rules: [{ required: true, message: 'Vui lòng nhập tên!' }],
            }
          ]"
        />
      </a-form-item>
          <!-- v-model="userInfo.email" -->

      <a-form-item label='Email'>
        <a-input
          v-model="userInfo.email"
          v-decorator="[
            'email',
            {
              rules: [{ required: true, message: 'Vui lòng nhập email!' }],
            }
          ]"
        />
      </a-form-item>
      <!-- <a-form-item label='Description'>
        <a-input
          type='textarea'
          v-decorator="['description']"
        />
      </a-form-item> -->
      <a-form-item class='collection-create-form_last-form-item'>
        <a-radio-group
          v-model="userInfo.gender"
          v-decorator="[
            'modifier',
            {
              initialValue: 'private',
            }
          ]"
        >
            <a-radio value='male'>Nam</a-radio>
            <a-radio value='female'>Nữ</a-radio>
          </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import Vue from 'vue'

export default {
    //props: ['visible', 'userInfo', 'v'],
    name: 'FormUserComponent',
    props: {
        userInfo: {
          name: {
            first: String,
            default: 'aaa'
          }
        },
        visible: Boolean,
        isFormEdit: Boolean
    },
    data: {
      form: ''
    },
    created() {
    },
    watch: {
      "visible": function() {
        // this.setDataForm();
      }
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { first: 'form_user_modal' });
    },
    mounted() {
        this.setDataForm();
    },
    methods: {
      async setDataForm() {
        await this.form.setFieldsValue({
          first : "f"
        });
      }
    },
}
</script>
