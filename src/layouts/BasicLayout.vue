<template>
  <van-cell v-if="$route.path === '/'">
    <UserLogin></UserLogin>
  </van-cell>
  <van-cell v-if="$route.path === '/register'">
    <UserRegister></UserRegister>
  </van-cell>
  <van-cell v-if="$route.path !== '/' && $route.path !== '/register'">
    <van-nav-bar
        :title="title"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18"/>
      </template>
    </van-nav-bar>
    <div id="content">
      <router-view/>
    </div>
    <van-tabbar route @change="onChange">
      <van-tabbar-item to="/index" icon="home-o" name="index">主页</van-tabbar-item>
      <van-tabbar-item to="/team" icon="search" name="team">房间</van-tabbar-item>
      <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
    </van-tabbar>
  </van-cell>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {Toast} from "vant";
import {ref} from "vue";
import routes from "../config/route";
import UserLogin from "./UserLogin.vue";
import UserRegister from "./UserRegister.vue";
const router = useRouter();


const DEFAULT_TITLE = '交友匹配屋';
const title = ref(DEFAULT_TITLE);

/**
 * 根据路由切换标题
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})

const onClickLeft = () => {
  router.back()
};
const onClickRight = () => {
  router.push('/search')
};

const onChange = (index) => {
  // Toast(`标签 ${index}`)
}

</script>


<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
