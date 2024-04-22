<script setup>

import Fheader from "@/pages/Fheader.vue";
import Fmenu from "@/pages/Fmenu.vue";
</script>

<template>
<div class="boxContainer">
  <div class="topNative">
    <Fheader></Fheader>
  </div>
  <div class="bottomContainer">
    <div class="leftMenu">
      <Fmenu></Fmenu>
    </div>
    <div class="rightViews">
      <router-view></router-view>
    </div>
  </div>
</div>
</template>

<style scoped>
.boxContainer{
  width: 100vw;
  height: 100vh;
}
.topNative{
  width: 100%;
  height: 64px;
}
.bottomContainer{
  width: 100%;
  height: calc(100% - 64px);
  display: flex;
}
.rightViews{
  padding: 30px;
  width: 100%;
  height: 100%;
}
</style>