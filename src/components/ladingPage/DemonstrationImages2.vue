<script setup lang="ts">
import DemonstrationImages1 from '@/assets/img/demonstration1.svg';
import DemonstrationImages2 from '@/assets/img/demonstration2.svg';
</script>

<template>
    <div class="relative w-[10em] h-[12em]">
        <section class="relative w-[180px] bg-white flex justify-center items-center aspect-[20/9] rounded-[10px] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] z-1 bottom-[200px] left-[5%] transform -translate-x-1/2
                  md:w-[17em] md:left-[8em] md:bottom-[-70px] md:z-0 md:shadow-[2px_2px_5px_rgba(0,0,0,0.25)]">
            <img :src="DemonstrationImages1" class="w-[95%] h-[90%] rounded-[8px] border-[2px] border-[#E5E7EB]" />
        </section>
        <section
            class="relative w-[180px] bg-white flex justify-center items-center aspect-[20/9] rounded-[10px] shadow-[2px_2px_5px_rgba(0,0,0,0.25)] z-0 top-[-220px] left-[calc(5%+100px)] transform -translate-x-1/2
                  md:w-[17em] md:relative md:left-[17em] md:top-[-7em] md:z-0 md:shadow-[4px_4px_4px_rgba(0,0,0,0.25)]">
            <img :src="DemonstrationImages2" class="w-[95%] h-[90%] rounded-[8px] border-[2px] border-[#E5E7EB]" />
        </section>

    </div>
</template>