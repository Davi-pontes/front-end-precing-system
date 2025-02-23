<script setup lang="ts">

</script>
<template>
  <main>
    <div class="head flex items-center justify-around w-full h-24 bg-[#8095c7] text-white">
      <img
        class="w-[35vw] h-[20vh] md:w-40 md:h-40"
        src="../assets/Logo-helqui-com-corde-fundo.png"
        alt="logo-up"
      />
      <router-link :to="'/login'">
        <button
        class="border-0 rounded-md text-lg w-20 h-9 md:w-20 md:h-10 transition duration-500 bg-[rgb(30,50,97)] text-white *:cursor-pointer"
        >
          Login
        </button>
      </router-link>
    </div>
  </main>
</template>
