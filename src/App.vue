<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import useDialog,{useMyDialog} from './useDialog'
import Test from './test'
import Ffmpeg from './components/Ffmpeg.vue'
// import * as  { createFFmpeg, fetchFile } from "../node_modules/@ffmpeg/ffmpeg/dist/umd/ffmpeg.js";
const myDialog = useDialog(Test);
console.log('ssssssss',myDialog)
const handleDialog = () => {
  // useMyDialog(Test,{
  //   title: "Hello World",
  //   onConfirm(){
  //    console.log('sssssssss');
  //   },
  //   onCancel(){
  //    console.log('sssss111ssss');
  //   }
  // })
  myDialog({ 
    title: '父组件弹窗11', 
    dialogVisible: true, 
    onConfirm: () => {
      console.log('a111sddsa')
    },
    onCancel: () => {
      console.log('asddsa')
    },
  });
};


</script>

<template>
  <Ffmpeg></Ffmpeg>
  <header>
    <ElButton @click="handleDialog"> 打开弹窗 </ElButton>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
