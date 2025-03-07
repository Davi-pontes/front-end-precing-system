<script setup lang="ts">
import Button2 from './Button2.vue'
</script>
<template>
    <section class="w-full flex flex-col items-center justify-center bg-white py-[4em]">
        <p class="font-[Lato-Bold] text-muted text-md">Precifique do jeito certo!</p>
        <h1 class="font-[Montserrat-Extrabold] text-muted text-[25px] md:text-[3em] pb-[1em]">Saiba mais sobre a
            Helqui</h1>
        <Button2 :to="'/create/account'">Criar conta</Button2>
        <p class="font-[Lato-Regular] text-muted text-sm pt-[2em]">© 2025 Helqui</p>
    </section>
</template>