<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :title="`${team.name}`"
        :thumb="momo"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>

      <template #bottom>
        <div>
          {{ `房间人数: ${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
<!--            {{  '过期时间: ' + team.expireTime.split('T')[0] + ' ' + team.expireTime.split('T')[1].split('.')[0] }}-->
            {{ '过期时间: ' + new Date(new Date(team.expireTime).getTime() + 8 * 60 * 60 * 1000).toISOString().split('T')[0] + ' ' + new Date(new Date(team.expireTime).getTime() + 8 * 60 * 60 * 1000).toISOString().split('T')[1].split('.')[0] }}
        </div>
        <div>
<!--            {{ '创建时间: ' + team.createTime.split('T')[0] + ' ' + team.createTime.split('T')[1].split('.')[0] }}-->
            {{ '创建时间: ' + new Date(new Date(team.createTime).getTime() + 8 * 60 * 60 * 1000).toISOString().split('T')[0] + ' ' + new Date(new Date(team.createTime).getTime() + 8 * 60 * 60 * 1000).toISOString().split('T')[1].split('.')[0] }}
        </div>
      </template>

      <template #footer>
        <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin" plain
                    @click="preJoinTeam(team)">
          加入房间
        </van-button>
        <van-button v-if="team.userId === currentUser?.id || currentUser?.userRole == 1" size="small" plain
                    @click="doUpdateTeam(team.id)">更新房间
        </van-button>
        <!-- 仅加入房间可见 -->
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="small" plain
                    @click="doQuitTeam(team.id)">退出房间
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small" type="danger" plain
                    @click="doDeleteTeam(team.id)">解散房间
        </van-button>
      </template>
    </van-card>

    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam"
                @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>

  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import momo from '../assets/momo.png'
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[];
}

const showPasswordDialog = ref(false);
const password = ref('');


const router = useRouter();


const joinTeamId = ref(0);
const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});


const preJoinTeam = (team: TeamType) => {
    console.log(11111111)
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()

  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

/**
 * 加入房间
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res?.code === 0) {
    Toast.success('加入成功');
    doJoinCancel();
      window.location.reload();

  } else {
    Toast.fail('加入失败' + (res.message ? `，${res.message}` : ''));
  }
}

const currentUser = ref();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

/**
 * 跳转至更新房间页
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

/**
 * 退出房间
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res?.code === 0) {
    Toast.success('操作成功');
      window.location.reload();
  } else {
    Toast.fail('操作失败' + (res.message ? `，${res.message}` : ''));
  }
}

/**
 * 解散房间
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id,
  });
  if (res?.code === 0) {
    Toast.success('操作成功');
      window.location.reload();
  } else {
    Toast.fail('操作失败' + (res.message ? `，${res.message}` : ''));
  }
}
</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 128px;
  object-fit: unset;
}
</style>
