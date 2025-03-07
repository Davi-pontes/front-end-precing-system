<script setup lang="ts">
import { ChartLine, Handshake, Leaf } from 'lucide-vue-next';
const cards = [
    {
        icon: ChartLine,
        title: "Maximização do Lucro.",
        description: "Garanta que todos os custos sejam cobertos e aumente sua margem de lucro sem perder competitividade.",
    },
    {
        icon: Handshake,
        title: "Competitividade no Mercado.",
        description: "Posicione-se de forma estratégica com preços que atraem clientes e destacam a qualidade do seu produto.",
    },
    {
        icon: Leaf,
        title: "Sustentabilidade do Negócio.",
        description: "Assegure a saúde financeira a longo prazo, possibilitando reinvestimentos e crescimento contínuo.",
    },
];
</script>

<template>
    <section
        class="relative flex flex-col w-[95dvw] h-[115dvh] md:h-[70dvh] justify-center bg-white border-[3px] border-muted p-10 rounded-[14px] md:rounded-[35px] shadow-[5px_5px_10px_rgba(0,0,0,0.10)]">
        <header class="md:flex md:flex-col md:h-[40%]">
            <p class="font-[Montserrat-Bold] text-muted text-md md:text-xl">
                A Helqui te ajuda!
            </p>
            <section class="flex flex-col pt-2 md:flex-row md:gap-[10em]">
                <div class="md:w-100">
                    <h1 class="font-[Montserrat-ExtraBold] text-black text-xl md:text-4xl">
                        Cresça seu negócio com números.
                    </h1>
                </div>
                <div class="md:w-150">
                    <h2 class="font-[Lato-Bold] text-black/60 text-[16px] md:text-lg">
                        Tenha todas as ferramentas necessárias para precificar os seus produtos e obter o melhor
                        resultado possível.
                    </h2>
                </div>
            </section>
        </header>
        <main class="flex flex-col md:h-[50%] md:flex-row gap-[2em]">
            <section class="flex flex-col h-full pt-4" v-for="(card, index) in cards" :key="index">
                <component class="text-muted" :is="card.icon" :size="58"/>
                <section class="pt-4">
                    <p class="font-Lato-Bold text-black text-xl md:text-[1.5em]">
                        {{ card.title }}
                    </p>
                    <h2 class="font-[Lato-Bold] text-black/50 text-md">
                        {{ card.description }}
                    </h2>
                </section>
            </section>
        </main>
    </section>
</template>