<template>
    <form action="/">
        <van-search
                v-model="searchText"
                show-action
                placeholder="请输入要搜索的标签"
                @search="onSearch"
                @cancel="onCancel"
        />
    </form>

    <van-divider content-position="left">已选标签</van-divider>

    <div v-if="activeIds.length === 0">请选择标签</div>

    <van-row gutter="16" style="padding: 0 16px">
        <van-col v-for="tag in activeIds" :key="tag">
            <van-tag closeable size="small" type="primary" @close="doClose(tag)">
                {{ tag }}
            </van-tag>
        </van-col>
    </van-row>

    <van-divider content-position="left">选择标签</van-divider>

    <van-tree-select
            v-model:active-id="activeIds"
            v-model:main-active-index="activeIndex"
            :items="tagList"
    />

    <div style="padding: 12px">
        <van-button block type="primary" @click="doSearchResult">搜索</van-button>
    </div>

</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const searchText = ref('');
const router = useRouter();

/**
 * 搜索过滤
 * @param val
 */
const onSearch = (val) => {
    const keyword = searchText.value.trim().toLowerCase(); // 去除空格并转为小写
    tagList.value = originTagList.map(parentTag => {
        const filteredChildren = parentTag.children.filter(item => item.text.toLowerCase().includes(keyword));
        return {
            ...parentTag,
            children: filteredChildren,
        };
    }).filter(parentTag => parentTag.children.length > 0); // 保留有匹配子项的分类
};

/**
 * 取消搜索
 */
const onCancel = () => {
    searchText.value = '';
    tagList.value = originTagList;
};

// 选中的标签和当前选择的索引
const activeIds = ref([]);
const activeIndex = ref(0);

// 初始标签列表
const originTagList = [
    {
        text: '性别',
        children: [
            { text: '男', id: '男' },
            { text: '女', id: '女' },
        ],
    },
    {
        text: '年级',
        children: [
            { text: '大一', id: '大一' },
            { text: '大二', id: '大二' },
            { text: '大三', id: '大三' },
            { text: '大四', id: '大四' },
        ],
    },
    {
        text: '前端',
        children: [
            { text: 'HTML', id: 'HTML' },
            { text: 'CSS', id: 'CSS' },
            { text: 'JavaScript', id: 'JavaScript' },
            { text: 'Vue', id: 'Vue' },
            { text: 'React', id: 'React' },
        ],
    },
    {
        text: '后端',
        children: [
            { text: 'Node.js', id: 'Node.js' },
            { text: 'Express', id: 'Express' },
            { text: 'Django', id: 'Django' },
            { text: 'Flask', id: 'Flask' },
            { text: 'Ruby on Rails', id: 'Ruby on Rails' },
        ],
    },
    {
        text: '全栈',
        children: [
            { text: '全栈开发', id: '全栈开发' },
            { text: '移动端开发', id: '移动端开发' },
            { text: '微服务', id: '微服务' },
            { text: '单页应用', id: '单页应用' },
            { text: '网站优化', id: '网站优化' },
        ],
    },
    {
        text: '数据库',
        children: [
            { text: 'MySQL', id: 'MySQL' },
            { text: 'MongoDB', id: 'MongoDB' },
            { text: 'PostgreSQL', id: 'PostgreSQL' },
            { text: 'SQLite', id: 'SQLite' },
            { text: 'Redis', id: 'Redis' },
        ],
    },
    {
        text: '移动开发',
        children: [
            { text: 'Flutter', id: 'Flutter' },
            { text: 'React Native', id: 'React Native' },
            { text: 'Swift', id: 'Swift' },
            { text: 'Kotlin', id: 'Kotlin' },
            { text: 'Cordova', id: 'Cordova' },
        ],
    },
    {
        text: '人工智能',
        children: [
            { text: '机器学习', id: '机器学习' },
            { text: '深度学习', id: '深度学习' },
            { text: '数据分析', id: '数据分析' },
            { text: '自然语言处理', id: '自然语言处理' },
            { text: '计算机视觉', id: '计算机视觉' },
        ],
    },
    {
        text: '云计算',
        children: [
            { text: 'AWS', id: 'AWS' },
            { text: 'Azure', id: 'Azure' },
            { text: '谷歌云', id: '谷歌云' },
            { text: 'Docker', id: 'Docker' },
            { text: 'Kubernetes', id: 'Kubernetes' },
        ],
    },
];

// 标签列表
let tagList = ref(originTagList);

/**
 * 移除标签
 * @param tag
 */
const doClose = (tag) => {
    activeIds.value = activeIds.value.filter(item => item !== tag);
};

/**
 * 执行搜索并跳转
 */
const doSearchResult = () => {
    router.push({
        path: '/user/list',
        query: {
            tags: activeIds.value
        }
    });
};
</script>

<style scoped>
/* 样式可以根据需求自行调整 */
</style>
