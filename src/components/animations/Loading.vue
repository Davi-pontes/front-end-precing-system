<script lang="ts">
export default {
  name: 'Loading',
  data() {
    return {}
  }
}
</script>

<template>
  <main>
    <div class="loader"></div>
    <!-- <body>
       <div class="container">
         <div class="loader">
           <div>.</div>
           <div>.</div>
           <div>.</div>
           <div>.</div>
           <div>.</div>
         </div>
       </div>
     </body> -->
  </main>
</template>
<!-- <style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  position: absolute;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.loader {
  font-size: 40px;
  font-weight: bold;
  display: inline-block;
  font-family: bebas neue;
}

.loader div {
  display: inline-block;
  color: #415175;
  width: 1.5vw;
  font-size: 2em;
  animation: bounce 1.5s infinite alternate;
}

.loader div:nth-child(2) {
  animation-delay: 0.1s;
}

.loader div:nth-child(3) {
  animation-delay: 0.2s;
}

.loader div:nth-child(4) {
  animation-delay: 0.3s;
}

.loader div:nth-child(5) {
  animation-delay: 0.4s;
}

.loader div:nth-child(6) {
  animation-delay: 0.5s;
}

.loader div:nth-child(7) {
  animation-delay: 0.6s;
}

.loader div:nth-child(8) {
  animation-delay: 0.7s;
}

.loader div:nth-child(9) {
  animation-delay: 0.8s;
}

.loader div:nth-child(10) {
  animation-delay: 0.9s;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  10% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  60% {
    transform: translateY(-10px);
  }
}
</style> -->


/* HTML: */
<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: absolute;
  width: 100vw;
  height: 100dvh;
}

.loader {
  --c: no-repeat linear-gradient(#435276 0 0);
  background:
    var(--c), var(--c), var(--c),
    var(--c), var(--c), var(--c),
    var(--c), var(--c), var(--c);
  background-size: 16px 16px;
  animation:
    l32-1 1s infinite,
    l32-2 1s infinite;
}

@keyframes l32-1 {

  0%,
  100% {
    width: 45px;
    height: 45px
  }

  35%,
  65% {
    width: 65px;
    height: 65px
  }
}

@keyframes l32-2 {

  0%,
  40% {
    background-position: 0 0, 0 50%, 0 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0, 50% 0, 50% 50%
  }

  60%,
  100% {
    background-position: 0 50%, 0 100%, 50% 100%, 100% 100%, 100% 50%, 100% 0, 50% 0, 0 0, 50% 50%
  }
}
</style>