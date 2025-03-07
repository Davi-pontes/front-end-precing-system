<template>
    <button class="aspect-[32/10] rounded-[40px] relative text-[var(--secondcolor)] hover:shadow[3px]">
        <router-link to="/create/account">
            <section class=" bg-white w-[90%] h-[100%] rounded-[40px] border-[rgba(186, 201, 235, 0.4)] border-[2px]
                    shadow-[-3px_-2px_7.5px_1px_rgba(255,255,255,0.25),_2px_3px_7px_0px_rgba(0,0,0,0.2),_-2px_-1px_7.5px_0px_var(--maincolor),_1px_2px_7.5px_0px_rgba(149,167,208,1)]
                    flex justify-center items-center">
                <section class="  w-[100%] h-[100%] bg-white rounded-[40px] border-[1.5px] border-[#b4b4b4]
                shadow-[inset_-1px_-1px_4px_0px_rgba(0,0,0,0.25)]
                text-black flex items-center justify-center">
                    <slot></slot>
                </section>
            </section>
        </router-link>
    </button>
</template>
