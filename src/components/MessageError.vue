<script lang="ts">
import { TriangleAlert } from 'lucide-vue-next';
export default {
  name: 'MessageAlert',
  components: {
    TriangleAlert
  },
  props: {
    message: { type: String }
  },
  created() {
    this.removeAlert()
  },
  methods: {
    removeAlert(){
      setTimeout(() => {
        this.$emit('removeAlert')
      },4000)
    }
  },
}
</script>

<template>
  <main>
    <div class="banner">
      <div class="message">
        <TriangleAlert />
        <span>{{ message }}</span>
      </div>
      <span class="progress"></span>
    </div>
  </main>
</template>

<style scoped>
.banner {
  position: absolute;
  min-width: 30%;
  max-width: 50%;
  padding: 1.25rem 1rem;
  border-radius: 0.25rem;
  background-color: white;
  margin-left: 40vw;
  color: red;
  border: 2px solid rgba(247, 98, 98, 0.411);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.06);
  transform: translateY(2rem);
  opacity: 1;
  pointer-events: none;
  animation: fade-in 4s;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  display: inline-block;
  text-align: center;
  z-index: 999;
}
.message{
  display: flex;
  gap: 1em;
}
.progress {
  position: absolute;
  inset: auto 0.625rem 0.375rem;
  height: 0.2rem;
  background-color: red;
  transform: scaleX(0);
  transform-origin: left;
  border-radius: 0.5rem;
  animation: load 3s 0.25s linear forwards;
}

@keyframes fade-in {
  5%,
  90% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes load {
  100% {
    transform: scaleX(1);
  }
}
</style>
