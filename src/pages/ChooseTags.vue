<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import myAxios from "../plugins/myAxios";

const active = ref(0);
const currentItems = ref([]);
const selectedItems = ref([]); // 已选择的标签

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
  }
};

// 取消选中标签
const removeSelectedItem = function (name) {
  selectedItems.value = selectedItems.value.filter(item => item !== name);
};

const tabs = ref([
    { id: '0', name: '前端' },
    { id: '1', name: '后端' },
    { id: '2', name: '全栈' },
    { id: '3', name: '数据库' },
    { id: '4', name: '移动开发' },
    { id: '5', name: '人工智能' },
    { id: '6', name: '云计算' },
    { id: '7', name: '年级' },
    { id: '8', name: '性别' }, // 新增性别选项卡
]);

const items = ref([
    [
        { id: '0', name: 'HTML' },
        { id: '1', name: 'CSS' },
        { id: '2', name: 'JavaScript' },
        { id: '3', name: 'Vue' },
        { id: '4', name: 'React' },
    ],
    [
        { id: '5', name: 'Node.js' },
        { id: '6', name: 'Express' },
        { id: '7', name: 'Django' },
        { id: '8', name: 'Flask' },
        { id: '9', name: 'Ruby on Rails' },
    ],
    [
        { id: '10', name: '全栈开发' },
        { id: '11', name: '移动端开发' },
        { id: '12', name: '微服务' },
        { id: '13', name: '单页应用' },
        { id: '14', name: '网站优化' },
    ],
    [
        { id: '15', name: 'MySQL' },
        { id: '16', name: 'MongoDB' },
        { id: '17', name: 'PostgreSQL' },
        { id: '18', name: 'SQLite' },
        { id: '19', name: 'Redis' },
    ],
    [
        { id: '20', name: 'Flutter' },
        { id: '21', name: 'React Native' },
        { id: '22', name: 'Swift' },
        { id: '23', name: 'Kotlin' },
        { id: '24', name: 'Cordova' },
    ],
    [
        { id: '25', name: '机器学习' },
        { id: '26', name: '深度学习' },
        { id: '27', name: '数据分析' },
        { id: '28', name: '自然语言处理' },
        { id: '29', name: '计算机视觉' },
    ],
    [
        { id: '30', name: 'AWS' },
        { id: '31', name: 'Azure' },
        { id: '32', name: '谷歌云' },
        { id: '33', name: 'Docker' },
        { id: '34', name: 'Kubernetes' },
    ],
    [
        { id: '35', name: '大一' },
        { id: '36', name: '大二' },
        { id: '37', name: '大三' },
        { id: '38', name: '大四' },
    ],
    [
        { id: '39', name: '男' }, // 新增性别选项
        { id: '40', name: '女' }, // 新增性别选项
    ],
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
    if (response.code == 0){
      Toast.success('设置成功');
      router.replace('/index');
    }else{
      Toast.fail('设置失败');
    }
    console.log(tagList);
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <van-nav-bar
      title=""
      left-text="跳过"
      right-text="完成"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      class="navbar"
  />

  <div class="selected-tags">
        <span v-for="(tag, index) in selectedItems" :key="index" class="selected-tag">
            {{ tag }}
            <span class="remove-tag" @click="removeSelectedItem(tag)">×</span>
        </span>
  </div>

  <van-tabs class="tabs" v-model:active="active" @click-tab="onClickTab">
    <van-tab :title="tab.name" v-for="tab in tabs" :key="tab.id">
      <van-grid class="grid" :gutter="20">
        <div
            class="item capsule"
            @click="uploadTab(item.id)"
            v-for="item in currentItems"
            :key="item.id"
        >
          <span class="capsule-text">{{ item.name }}</span>
        </div>
      </van-grid>
    </van-tab>
  </van-tabs>
</template>

<style scoped>
/* 炫酷背景 */
body {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 炫酷的标题栏 */
.navbar {
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  backdrop-filter: blur(10px);
}

/* 选中的标签区域 */
.selected-tags {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 选中的标签样式 */
.selected-tag {
  background-color: #87CEEB;
  color: #87CEEB;
  color: #333;
  border-radius: 999px;
  padding: 5px 15px;
  margin: 5px;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
}

/* 删除按钮样式 */
.remove-tag {
  margin-left: 10px;
  cursor: pointer;
  color: #ff6347;
  font-size: 16px;
}

/* 标签卡片 */
.grid {
  margin-top: 20px;
  padding: 10px;
  display: flex;
  /*justify-content: center;*/
  align-items: center;
  flex-wrap: wrap;
}

/* 胶囊状样式 */
.capsule {
  background-color: #D9D9D9;
  /*color: #333;*/
  border-radius: 999px;  /* 胶囊状样式 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  padding: 10px;
  margin: 10px;
  height: 20px;
min-width: 60px;
  font-size: 16px;
  font-weight: 500;
}

/* 鼠标悬停时的动画效果 */
.capsule:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/* 未选中的胶囊文字样式 */
.capsule-text {
  color: #333;
}

/* 炫酷的 Tab 样式 */
.tabs {
  margin-top: 20px;
}

.van-tab {
  color: #fff;
  font-size: 18px;
}

.van-tab--active {
  color: #ffdb58;
}

/* 添加一个整体渐变背景色和卡片阴影效果 */
body, .tabs, .grid, .item, .navbar, .selected-tags {
  font-family: 'Poppins', sans-serif;
}
</style>
