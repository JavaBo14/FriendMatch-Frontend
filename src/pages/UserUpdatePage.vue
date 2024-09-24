<template>
    <template v-if="user">
        <van-cell title="昵称" is-link to="/user/edit" :value="user.username"
                  @click="toEdit('username', '昵称', user.username)"/>
        <van-cell title="账号" :value="user.userAccount"/>
        <van-cell title="头像">
            <img style="height: 48px" :src="user.avatarUrl"/>
        </van-cell>
<!--        <van-cell title="头像" is-link to="/user/edit">-->
<!--            <img style="height: 48px" :src="user.avatarUrl"/>-->
<!--        </van-cell>-->
        <van-cell
            title="性别"
            is-link
            to="/user/edit"
            :value="user.gender === 0 ? '男' : '女'"
            @click="toEdit('gender', '性别', user.gender === 0 ? '男' : '女')"
        />
        <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone', '电话', user.phone)"/>
        <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email', '邮箱', user.email)"/>
        <van-cell title="星球编号" arrow-direction="down" :value="user.planetCode"/>
        <van-cell title="注册时间" arrow-direction="down" :value="user.createTime"/>
    </template>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import myAxios from "../plugins/myAxios";
import { getCurrentUser } from "../services/user";
import { Toast } from "vant";

const user = ref();
const router = useRouter();

onMounted(async () => {
    user.value = await getCurrentUser();
    console.log('用户信息:', user.value); // 确认用户信息
    if (!user.value) {
        router.push('/user/login');
    }
});

// 跳转到编辑页面
const toEdit = (editKey: string, editName: string, currentValue: string) => {
    console.log('头像 URL:', user.value.avatarUrl); // 确认头像 URL
    router.push({
        path: '/user/edit',
        query: {
            editKey,
            editName,
            currentValue,
            avatarUrl: user.value.avatarUrl // 确保传递头像 URL
        }
    });
};
</script>

<style scoped>
/* 可以在此处添加自定义样式 */
</style>
