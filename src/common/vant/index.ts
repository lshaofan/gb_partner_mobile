import type { App } from 'vue';

//diy适用vant组件库的引入
import {
  Button,
  Collapse,
  CollapseItem,
  NavBar,
  Skeleton,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
} from 'vant';
const vantList = [
  Button,
  Collapse,
  CollapseItem,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  NavBar,
  Skeleton,
];

export function setupVant(app: App<Element>) {
  for (const value of vantList) {
    app.use(value);
  }
}
