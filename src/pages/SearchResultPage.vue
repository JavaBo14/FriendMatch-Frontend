<template>
  <user-card-list :user-list="userList"/>

  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"/>

</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const {tags} = route.query;

const userList = ref([]);

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        return response?.data;
      })
      .catch(function (error) {
        console.error('/user/search/tags error', error);
        Toast.fail('请求失败');
      })
  console.log(userListData)
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
      }
    })

    userList.value = userListData;
  }
})

const mockUser = {
  id: 1,
  username: 'dingding',
  userAccount: 'dingjiaxiong',
  profile: '一名精神小伙，目前还有头发，谢谢',
  avatarUrl: 'https://avatars.githubusercontent.com/u/61930795?v=4',
  gender: 0,
  phone: '13113113111',
  email: '592342@xzcxzczxcz.com',
  userRole: 0,
  planetCode: '19969',
  tags: ['java', 'emo', '打工中', 'emo', '打工中'],
  createTime: new Date(),
}

</script>

<style scoped>

</style>
