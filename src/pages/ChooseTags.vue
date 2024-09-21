<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import myAxios from "../plugins/myAxios";

const active = ref(0);
const currentItems = ref([]);
const selectedItems = ref([]); // 已选择的标签
let tagNameList = ref([]);  // 用于提交的标签列表

// 切换 Tab 时更新当前的项目
const onClickTab = () => {
    currentItems.value = items.value[active.value];
};

// 初始时载入第一个 Tab 的内容
onMounted(() => {
    currentItems.value = items.value[active.value];
});

// 处理点击每个项目的逻辑
const uploadTab = function (id) {
    const item = currentItems.value.find((item) => item.id === id);
    if (item && !selectedItems.value.includes(item.name)) {
        selectedItems.value.push(item.name); // 添加到已选择的标签
        console.log(selectedItems.value);
    }
};

// Tab 和内容的定义
const tabs = ref([
    { id: '0', name: '前端' },
    { id: '1', name: '后端' },
    { id: '2', name: '全栈' },
    { id: '3', name: '数据库' }
]);

const items = ref([
    [{ id: '0', name: 'html' }, { id: '1', name: 'css' }],
    [{ id: '2', name: 'node' }, { id: '3', name: 'express' }],
    [{ id: '4', name: 'vue' }, { id: '5', name: 'react' }],
    [{ id: '6', name: 'mysql' }, { id: '7', name: 'mongodb' }]
]);

// 跳转页面
const router = useRouter();
const onClickLeft = () => {
    router.replace('/index');
};

// 点击完成按钮时提交选中的标签
const onClickRight = async () => {
    try {
        const tagList = selectedItems.value; // 直接使用选中的标签数组
        const response = await myAxios.post('/user/add/tags', tagList);
        console.log(tagList);
    } catch (error) {
        console.log(error);
    }
};


</script>

<template>
    <van-nav-bar
            title="标题"
            left-text="跳过"
            right-text="完成"
            @click-left="onClickLeft"
            @click-right="onClickRight"
    />

    <van-cell>{{ selectedItems.join(', ') }}</van-cell>

    <van-tabs class="tabs" v-model:active="active" @click-tab="onClickTab">
        <van-tab :title="tab.name" v-for="tab in tabs" :key="tab.id">
            <van-grid class="grid" :gutter="20">
                <van-grid-item class="item" @click="uploadTab(item.id)" v-for="item in currentItems" :key="item.id" :text="item.name" />
            </van-grid>
        </van-tab>
    </van-tabs>
</template>

<style scoped>
.tabs {
    margin-top: 250px;
}
.grid {
    margin-top: 20px;
}
</style>
