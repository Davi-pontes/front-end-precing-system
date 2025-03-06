<template>
  <button class="relative aspect-[32/10] text-[14px] font-extrabold rounded-[40px] tracking-wider
                 text-muted hover:shadow-[0px_4px_10px_rgba(0,0,0,0.3)] cursor-pointer">
    <section class="bg-white w-full h-full rounded-[40px] border-[#FFFFFF66] border-2
                    md:border-4 shadow-[5px_6px_7.1px_rgba(166,171,189,0.8),-3px_-2px_10px_1px_rgba(255,255,255,1),2px_3px_7px_rgba(0,0,0,0.2),-6px_-4px_10px_rgba(128,149,199,0.4)]
                    flex justify-center items-center">
      <section
        class="w-full h-full bg-muted rounded-[40px] border-[1.5px] border-[#FFFFFF66]
                      shadow-[inset_-1px_-1px_4px_0px_rgba(0,0,0,0.25)] text-white flex items-center justify-center">
        <router-link to="/cadastro">
          <slot></slot>
        </router-link>
      </section>
    </section>
  </button>
</template>
