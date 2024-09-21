// 定义一些路由

import Index from "../pages/Index.vue";
import SearchPage from "../pages/SearchPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserPage from "../pages/UserPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLogin from "../layouts/UserLogin.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import Register from "../layouts/UserRegister.vue";
import ChooseTags from "../pages/ChooseTags.vue";

const routes = [
    { path: '/index', component: Index },
    { path: '/team', title: '房间大厅', component: TeamPage },
    { path: '/team/add', title: '创建房间', component: TeamAddPage },
    { path: '/team/update', title: '更新房间信息', component: TeamUpdatePage },
    { path: '/user', title: '个人信息', component: UserPage },
    { path: '/search', title: '交友', component: SearchPage },
    { path: '/user/list', title: '用户列表', component: SearchResultPage },
    { path: '/user/edit', title: '编辑信息', component: UserEditPage },
    { path: '/register',title: '用户注册', component: Register },
    { path: '/', title: '登录', component: UserLogin },
    { path: '/user/update', title: '更新个人信息', component: UserUpdatePage },
    { path: '/user/team/join', title: '我加入的房间', component: UserTeamJoinPage },
    { path: '/user/team/create', title: '我创建的房间', component: UserTeamCreatePage },
    { path: '/choosetags', title: '选择标签', component: ChooseTags },
]



export default routes;
