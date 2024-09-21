<script setup lang="ts">
import {ref, watch} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {useRoute, useRouter} from "vue-router";
const router = useRouter()
const route = useRoute();
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const planetCode = ref('')
const ToShowAccount = ref(false);
const ToShowPassword = ref(false);
const ToShowconfirmPassword = ref(false);
const ToshowPlantCode = ref(false);
const TocheckAccount = ref(false);
let ToShow = ref(false);
watch(userAccount,(newValue,oldValue)=>{
  const regex = /[~!@#$%^&*()+=|{}':;',\\[\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]/;
  if(oldValue.length < 4){
    ToShowAccount.value = true;
    TocheckAccount.value = false;
  }else{
    ToShowAccount.value = false;
  }
  if(regex.test(newValue)){
    ToShowAccount.value = false;
    TocheckAccount.value = true;
  }else {
    TocheckAccount.value = false;
  }
})
watch(userPassword,(newValue,oldValue)=>{
  if(newValue.length < 6){
    ToShowPassword.value = true;
  }else{
    ToShowPassword.value = false;
  }
})
watch(checkPassword,(newValue,oldValue)=>{
  if(newValue.length < 6){
    ToShowconfirmPassword.value = true;
  }else{
    ToShowconfirmPassword.value = false;
  }
})
watch(planetCode,(newValue,oldValue)=>{
  if(newValue.length > 5){
    ToshowPlantCode.value = true;
  }else {
    ToshowPlantCode.value = false;
  }
})
const onSubmit = async () => {

  if (userPassword.value !== checkPassword.value) {
    ToShow.value = true;
    return; // 如果密码不匹配，提前返回
  }
  ToShow.value = false; // 密码匹配时隐藏提示
  if( !ToShowAccount.value &&  !TocheckAccount.value && !ToShowPassword.value && !ToShowconfirmPassword.value && !ToshowPlantCode.value){
    try {
      // 发送注册请求
      const response = await myAxios.post('/user/register', { userAccount: userAccount.value,planetCode:planetCode.value,userPassword: userPassword.value,checkPassword:checkPassword.value });
      // 处理请求成功的情况
      console.log(userAccount.value,planetCode.value,userPassword.value,checkPassword.value)
      console.log('Response:', response);
      // 显示成功的 Toast 提示
      Toast({
        message: '注册成功',
        position: 'top',
      });
      // 可以在这里进行页面跳转或清除表单等操作
      router.replace('/choosetags');
    } catch (error) {
      // 处理请求失败的情况
      console.error('注册失败:', error);
      // 显示失败的 Toast 提示
      Toast({
        message: '注册失败',
        position: 'top',
      });
    }
  }

};

</script>

<template>
  <van-form @submit="onSubmit" method="post">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <span v-if="ToShowAccount" style="color: red">用户账户过短</span>
      <span v-if="TocheckAccount" style="color: red">账号不能包含特殊符号</span>
      <van-field
          v-model="planetCode"
          name="planetCode"
          label="星球编号"
          placeholder="请输入星球编号"
          :rules="[{ required: true, message: '请填写星球编号' }]"
      />
      <span v-if="ToshowPlantCode" style="color: red">星球编号过长</span>
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <span v-if="ToShowPassword" style="color: red">用户密码过短</span>
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="再次输入密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请这次填写密码' }]"
      />
      <span v-if="ToShowconfirmPassword" style="color: red">用户密码过短</span>
      <span v-if="ToShow" style="color: red">密码不一致</span>
    </van-cell-group>
    <!--    <span v-if="errors.confirmPassword" style="color: red;">{{ errors.confirmPassword }}</span>-->
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>