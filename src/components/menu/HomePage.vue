<script lang="ts">
export default {
    name: 'HomePageMenu',
    data() {
        return {
            business: 'Jhenider Doces',
            opening: '13:00',
            closing: '18:30',
            state: 'Aberto',
            information: 'Entrega gratis acima de R$100,00'
        }
    },
}
</script>

<template>
    <main>
        <div class="flex flex-col items-center h-full w-full bg-[#8095c7]">
            <div class="flex w-full bg-[#8095c7] items-center justify-around space-x-4 p-4">
                <h1 class="text-2xl text-white w-1/2 break-words ">{{ business }}</h1>
                <img src="" alt="Logo da empresa" class="w-16 h-16 rounded-full">
            </div>
            <div class="flex w-full items-center justify-around text-white pb-4">
                <div class="flex items-center space-x-2">
                    <i class="fa-regular fa-clock"></i>
                    <p>{{ opening }} - {{ closing }}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <i class="fa-regular fa-building"></i>
                    <p>{{ state }}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2 w-full justify-center text-white pb-4">
                <i class="fa-solid fa-info"></i>
                <p>{{ information }}</p>
            </div>
            <div
                class="flex bg-white w-[97%] h-8 rounded-3xl px-4 items-center space-x-2 ">
                <input type="text" placeholder="Pesquise aqui!"
                    class="flex-grow bg-transparent outline-none text-black placeholder-gray-400 text-base">
                <a href=""
                    class="flex justify-center items-center text-white bg-[#8095c7] w-7 h-7 rounded-full hover:bg-blue-700 transition duration-300">
                    <i class="fas fa-search"></i>
                </a>
            </div>

        </div>
    </main>
</template>