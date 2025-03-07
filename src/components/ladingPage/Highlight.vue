<template>
    <section class="relative bg-white rounded-[18px] flex flex-col p-4">
        <div v-if="$slots.icon">
            <slot name="icon"></slot>
        </div>
        <section class="flex flex-col justify-between flex-grow pt-3">
            <div class="text-black text-xl md:text-2xl">
                <slot name="header"></slot>
            </div>
            <div class="text-black/60 text-[16px] md:text-lg">
                <slot></slot>
            </div>
        </section>
    </section>
</template>