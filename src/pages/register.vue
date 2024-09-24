<script setup lang="ts">
import { ref, watch } from "vue";
import myAxios from "../plugins/myAxios";
import axios from 'axios';
import { Toast } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const planetCode = ref('');

// 校验状态
const accountValid = ref(true);
const passwordValid = ref(true);
const confirmPasswordValid = ref(true);
const planetCodeValid = ref(true);
const passwordMismatch = ref(false);
const errorMessage = ref('');  // 用于显示来自后端的错误信息

// 校验函数
const validateAccount = () => {
    const regex = /[~!@#$%^&*()+=|{}':;',\\[\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]/;
    accountValid.value = userAccount.value.length >= 4 && !regex.test(userAccount.value);
};

const validatePassword = () => {
    passwordValid.value = userPassword.value.length >= 6;
};

const validateConfirmPassword = () => {
    confirmPasswordValid.value = checkPassword.value.length >= 6;
    passwordMismatch.value = userPassword.value !== checkPassword.value;
};

const validatePlanetCode = () => {
    planetCodeValid.value = planetCode.value.length <= 5;
};

// 监听输入变化自动校验
watch(userAccount, validateAccount);
watch(userPassword, validatePassword);
watch(checkPassword, validateConfirmPassword);
watch(planetCode, validatePlanetCode);

// 提交表单时进行全面校验
const validateAll = () => {
    validateAccount();
    validatePassword();
    validateConfirmPassword();
    validatePlanetCode();
};

const onSubmit = async () => {
    errorMessage.value = ''; // 清空之前的错误信息
    validateAll();

    // 如果有任意一个校验不通过，阻止提交
    if (!accountValid.value || !passwordValid.value || !confirmPasswordValid.value || passwordMismatch.value || !planetCodeValid.value) {
        return;
    }

    try {
        const response = await myAxios.post('/user/register', {
            userAccount: userAccount.value,
            planetCode: planetCode.value,
            userPassword: userPassword.value,
            checkPassword: checkPassword.value,
        });

        // 根据响应的 code 处理成功或失败
        if (response.code === 0) {
            Toast({
                message: '注册成功',
                position: 'top',
            });
            router.replace('/'); // 注册成功后重定向到主页
        } else {
            errorMessage.value = response.message || '注册失败';
            Toast({
                message: errorMessage.value,
                position: 'top',
            });
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.data) {
                errorMessage.value = (error.response.data.message || '注册失败，请稍后重试');
            } else {
                errorMessage.value = '注册失败，请稍后重试';
            }
        } else {
            errorMessage.value = '注册失败，请稍后重试';
        }
        Toast({
            message: errorMessage.value,
            position: 'top',
        });
    }
};
</script>
<template>
    <van-form @submit="onSubmit" method="post">
        <van-cell-group inset>
            <!-- 用户账号输入框 -->
            <van-field
                v-model="userAccount"
                name="userAccount"
                label="账号"
                placeholder="请输入账号"
                :error-message="!accountValid ? '用户账户无效' : ''"
                :rules="[{ required: true, message: '请填写用户名' }]"/>

            <!-- 星球编号输入框 -->
            <van-field
                v-model="planetCode"
                name="planetCode"
                label="星球编号"
                placeholder="请输入星球编号"
                :error-message="!planetCodeValid ? '星球编号过长' : ''"
                :rules="[{ required: true, message: '请填写星球编号' }]"/>

            <!-- 用户密码输入框 -->
            <van-field
                v-model="userPassword"
                type="password"
                name="userPassword"
                label="密码"
                placeholder="请输入密码"
                :error-message="!passwordValid ? '用户密码过短' : ''"
                :rules="[{ required: true, message: '请填写密码' }]"/>

            <!-- 确认密码输入框 -->
            <van-field
                v-model="checkPassword"
                type="password"
                name="checkPassword"
                label="再次输入密码"
                placeholder="请再次输入密码"
                :error-message="!confirmPasswordValid ? '用户密码过短' : ''"
                :rules="[{ required: true, message: '请再次填写密码' }]"/>

            <!-- 密码不一致提示 -->
            <span v-if="passwordMismatch" style="color: red">密码不一致</span>

            <!-- 后端返回的错误信息 -->
            <div v-if="errorMessage" style="color: red; margin-top: 10px;">{{ errorMessage }}</div>
        </van-cell-group>

        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>
