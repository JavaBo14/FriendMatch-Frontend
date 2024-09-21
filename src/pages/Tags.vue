<template>
    <div class="label-page">
        <van-button type="primary" class="btn-skip" @click="skip">跳过</van-button>
        <div class="my-tags">
            <van-tag v-for="tag in tags" type="primary" size="large" @click="tagSelected(tag)">{{ tag }}</van-tag>
        </div>
        <van-button type="primary" class="btn-enter" block @click="enterHome">进入</van-button>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Button } from 'vant';
import { Tag } from 'vant';

const tags:string[] = reactive(["标签1","标签2","标签3"])
const selectedTag:string[] =reactive([])

// 获取标签列表
const getTags = (tag:string) => {
    tags.push(tag)
}
// 存储选择的标签
const tagSelected = (tag:string) => {
    console.log(tag);
    selectedTag.push(tag)
}
const skip = ()=>{
    // 跳转事件
}
const enterHome = () => {
    // 进入首页
    console.log('click')
}

</script>

<style scoped>
.label-page{
    width: 100%;
    height: 85vh;
    display: flex;
    position: relative;
}
.my-tags{
    position: absolute;
    top: 5%;
    left: 0;
    background-color:#ccc;
    width: 100%;
    height: 90%;
}
.my-tags span{
    margin-right: 10px;
}
.btn-skip{
    position: absolute;
    top: 0;
    right: 0;
    width: 25%;
    height: 5%;
}
.btn-enter{
    position: absolute;
    bottom: 0;
    height: 10%;
}
</style>
