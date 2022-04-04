import { reactive } from 'vue';

interface system {
  userIcon: string;
}

export const systemData: system = reactive({
  userIcon: '../../static/user_center.png',
});
