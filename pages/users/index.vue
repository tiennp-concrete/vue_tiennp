<template>
  <div>
    <a-button type="primary" @click="showModal">
      New Collection
    </a-button>
    <form-user-component
      ref="formUserData"
      :isFormEdit="isFormEdit"
      :userInfo="userInfo"
      :visible="visible"
      @cancel="handleCancel"
      @create="handleCreate"
    />
    <a-list
      class="demo-loadmore-list"
      :loading="loading"
      item-layout="horizontal"
      :data-source="data"
    >
      <div
        v-if="showLoadingMore"
        slot="loadMore"
        :style="{
          textAlign: 'center',
          marginTop: '12px',
          height: '32px',
          lineHeight: '32px',
        }"
      >
        <a-spin v-if="loadingMore" />
        <a-button v-else @click="onLoadMore"> loading more </a-button>
      </div>
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a slot="actions" @click="formEditModal(item)">edit</a>
        <a slot="actions" @click="deleteItem(item.id)">remove</a>
        <a-list-item-meta
          :description="item.email"
        >
          <a slot="title" href="https://www.antdv.com/">{{ item.name.first }} {{ item.name.last }}</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-analytics.js"></script>

<script>
import Vue from "vue";
import FormUserComponent from "@/components/users/FormUserComponent";
import { userRef } from '@/config/firebase'

export default {
  layout: "l-user",
    data() {
      return {
        count: 0,
        isFormEdit: false,
        userInfo: {
          email: '',
          gender: '',
          name : {
            first: '',
            last: '',
            title: ''
          }
        },
        visible: false,
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
        // data: [
        //   {
        //     gender: "female",
        //     name: {
        //       title: "Mrs",
        //       first: "Maja",
        //       last: "Mortensen",
        //     },
        //     email: "maja.mortensen@example.com",
        //     nat: "DK",
        //   },
        //   {
        //     gender: "male",
        //     name: {
        //       title: "Mr",
        //       first: "Rafael",
        //       last: "Collins",
        //     },
        //     email: "rafael.collins@example.com",
        //     nat: "GB",
        //   },
        //   {
        //     gender: "male",
        //     name: {
        //       title: "Mr",
        //       first: "آرتين",
        //       last: "صدر",
        //     },
        //     email: "artyn.sdr@example.com",
        //     nat: "IR",
        //   },
        //   {
        //     gender: "male",
        //     name: {
        //       title: "Mr",
        //       first: "Tilmann",
        //       last: "Dinter",
        //     },
        //     email: "tilmann.dinter@example.com",
        //     nat: "DE",
        //   },
        //   {
        //     gender: "female",
        //     name: {
        //       title: "Miss",
        //       first: "Celin",
        //       last: "Grønseth",
        //     },
        //     email: "celin.gronseth@example.com",
        //     nat: "NO",
        //   },
        // ]
      };
    },
    // firebase: {
    //   data: userRef
    // },
    components: { FormUserComponent },
    mounted() {
      // this.getData(res => {
      //   this.loading = false;
      //   this.data = res.results;
      // });
    },
    created() {
      let self = this;
      userRef.on('value', function(snapshot) {
        console.log('snap', snapshot.toJSON());
        self.data = Object.assign(snapshot.toJSON());
          // commit('SET_LIST_USERS', snapshot.toJSON())
        self.convertListUser();
      });
      this.showLoadingMore = false;
      this.loading = false;
    },
    methods: {
      convertListUser() {
        let todo = [];
        let listTasks = this.data;
        for(let key in listTasks) {
          let data = listTasks[key];
          data.id = key;
          todo.push(data);
        }
        this.data = todo;
      },
      getData() {},
      onLoadMore() {
        // this.loadingMore = true;
      },
      showModal(item) {
        this.visible = true;
        this.isFormEdit = false;
        this.userInfo = {
          email: '',
          gender: '',
          name : {
            first: '',
            last: '',
            title: ''
          }
        }
      },
      formEditModal(item) {
        this.isFormEdit = true;
        this.visible = true;
        // console.log('item', item);
        this.userInfo = item;
        console.log('showModal userInfo', this.userInfo);
      },
      async deleteItem(id) {
        await userRef.child(id).remove();
      },
      handleCancel() {
        this.visible = false;
      },
      async handleCreate() {
        const form  = this.$refs.formUserData.form;
        // console.log("ref", this.$refs);
        if(this.isFormEdit) {
          this.userInfo.edit = true;
          await userRef.child(this.userInfo.id).update(this.userInfo);
        }else {
          userRef.push(this.userInfo);
        }
        this.visible = false;
        // userRef.push(
        //   {
        //     gender: "female",
        //     name: {
        //       title: "Mrs",
        //       first: "Maja",
        //       last: "Mortensen",
        //     },
        //     email: "maja.mortensen@example.com",
        //     nat: "DK",
        //   }
        // )
        // await userRef.child('-MQAyknxkAx-2hFAuAIb').remove();
        // await userRef.child('-MQAyknxkAx-2hFAuAIb').set(
        //   {
        //     gender: "female",
        //     name: {
        //       title: "Mrs",
        //       first: "Maja",
        //       last: "Mortenseee",
        //     },
        //     email: "maja.mortensen@example.com",
        //     nat: "DK",
        //     edit: true
        //   }
        // );
        // await userRef.child('-MQAyknxkAx-2hFAuAIb').update(
        //     {
        //     gender: "female",
        //     name: {
        //       title: "Mrs",
        //       first: "Maja",
        //       last: "Mortensen",
        //     },
        //     email: "maja.mortensen@example.com",
        //     nat: "DK",
        //   }
        //   // {
        //   //   gender: "male",
        //   //   name: {
        //   //     title: "Mr",
        //   //     first: "Rafael",
        //   //     last: "Collins",
        //   //   },
        //   //   email: "rafael.collins@example.com",
        //   //   nat: "GB",
        //   // }
        // )

      //   // form.validateFields((err, values) => {
      //   //   if (err) {
      //   //     return;
      //   //   }
      //   //   console.log('Received values of form: ', values);
      //   //   form.resetFields();
      //   //   this.visible = false;
      //   // });
      },
    },
}
</script>
