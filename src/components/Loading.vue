<script lang="ts">
export default {
  name: 'Loading',
  data() {
    return {}
  }
}
</script>

<template>
  <body>
    <div class="container">
      <div class="loader">
        <div>.</div>
        <div>.</div>
        <div>.</div>
        <div>.</div>
        <div>.</div>
      </div>
    </div>
  </body>
</template>
<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #ffffffb2;
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
</style>
