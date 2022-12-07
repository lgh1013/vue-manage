<template>
  <div v-if="item.children" class="sidebaritem">
    <template v-if="item.chilrden && item.children.length === 1">
      <el-menu-item :index="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
    <el-submenu v-else :index="item.path">
      <template slot="title">
        <i :class="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <template v-for="child in item.children">
        <side-bar
          v-if="child.children && child.children.length > 1"
          :key="child.path"
          :item="child"
        />
        <el-menu-item v-else :key="child.path" :index="child.path">
          <i :class="child.meta.icon"></i>
          <span slot="title">{{ child.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped></style>
