<template>
    <van-form @submit="onSubmit">
        <van-field
            v-model="editUser.currentValue"
            :name="editUser.editKey"
            :label="editUser.editName"
            :placeholder="`请输入${editUser.editName}`"
        ></van-field>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { Toast } from "vant";
import myAxios from "../plugins/myAxios";
import { getCurrentUser } from "../services/user";

const route = useRoute();
const router = useRouter();

// const avatarUrl = route.query.avatarUrl as string; // 确保将其声明为 string 类型

const editUser = ref({
    editKey: route.query.editKey,
    currentValue: route.query.currentValue,
    editName: route.query.editName,
});

const onSubmit = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        Toast.fail('用户未登录');
        return;
    }

    const genderValue = editUser.value.editKey === 'gender'
        ? (editUser.value.currentValue === '男' ? 0 : editUser.value.currentValue === '女' ? 1 : null)
        : editUser.value.currentValue;

    const requestData = {
        id: currentUser.id,
        [editUser.value.editKey as string]: genderValue,
    };

    // 如果是头像更新，添加头像 URL
    if (editUser.value.editKey === 'avatarUrl') {
        requestData.avatarUrl = avatarUrl; // 使用传递的头像 URL
    }

    console.log('请求数据:', requestData); // 打印请求数据

    try {
        const res = await myAxios.post('/user/update', requestData);

        console.log(res.data); // 打印返回的响应数据

        if (res.code === 0 && res.data === true) {
            Toast.success('修改成功');
            router.back();
        } else {
            Toast.fail(`修改错误: ${res.message || '未知错误'}`);
        }
    } catch (error) {
        console.error('请求错误:', error);
        if (error.response) {
            console.error('后端返回的错误:', error.response.data);
            Toast.fail(`修改请求失败: ${error.response.data.message || '未知错误'}`);
        } else {
            Toast.fail('修改请求失败，请稍后重试');
        }
    }
};
</script>

<style scoped>
/* 可以在此处添加自定义样式 */
</style>
