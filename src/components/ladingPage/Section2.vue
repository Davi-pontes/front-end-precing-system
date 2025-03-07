<script setup lang="ts">
import Highlight from './Highlight.vue'
import Button from './Button.vue'
import { Sparkle, ChevronsUp, Check} from 'lucide-vue-next';
import Demonstration3 from '@/assets/img/demonstration3.png'
const highLights = [
    {
        icon: Sparkle,
        title: "Precificação Inteligente e Automática",
        description: `Diga adeus aos cálculos manuais e erros na precificação!
    O Helqui automatiza o processo, garantindo que seus produtos sempre tenham
    preços atualizados com base nos custos e margens desejadas. Com poucos cliques,
    você ajusta valores e mantém a lucratividade do seu negócio.`
    },
    {
        icon: ChevronsUp,
        title: "Controle de Estoque Integrado",
        description: `Evite desperdícios e falta de insumos ou produtos!
    O Helqui gerencia seu estoque em tempo real, atualizando automaticamente a
    quantidade de insumos e produtos sempre que uma venda ou produção é registrada.
    Tenha total controle e previsibilidade para tomar decisões estratégicas.`
    },
    {
        icon: Check ,
        title: "Agilidade e Simplicidade para o Seu Negócio",
        description: `Nosso sistema foi desenvolvido para facilitar a gestão do seu negócio sem complicação.
    Com uma interface intuitiva e eficiente, o Helqui economiza seu tempo e reduz a burocracia, permitindo
     que você foque no que realmente importa: crescer e vender mais!`
    },
]
</script>

<template>
    <section class="relative flex flex-col justify-between w-[95dvw] h-[200dvh] md:h-[50em] p-4">
        <section class="flex flex-col items-left gap-10 md:flex-row h-[60%] ">
            <section class="md:h-full md:w-[50%] flex flex-col">
                <p class="font-[Lato-Regular] text-white/50 text-[1.5em]">Uma boa pergunta!</p>
                <h1 class="font-[Montserrat-ExtraBold] text-white text-[30px] md:text-[64px]">
                    Por que a Helqui?
                </h1>
                <h2 class="font-medium text-white text-[15px] md:text-[20px]">
                    A Helqui é uma plataforma que facilita o controle de estoque, o cálculo de ingredientes, a
                    precificação e o
                    gerenciamento de custo dos seus produtos. Ela ajuda você a definir o preço ideal para cada item,
                    garantindo
                    mais lucro e competitividade para o seu negócio.
                </h2>
                <div class="md:flex md:justify-center md:items-center flex-grow">
                    <Button class="hidden font-[Lato-Bold] text-[24px] md:block">Cadastre-se</Button>
                </div>
            </section>
            <section class="flex justify-center items-center md:w-[50%]">
                <div class="flex justify-center items-center bg-white md:h-[85%]
        rounded-[14px] shadow-[2px_2px_4px_rgba(0,0,0,0.25)] p-2">
                    <img :src="Demonstration3"
                        class="rounded-[10px] border-[2px] border-[#E5E7EB] md:h-[95%]">
                </div>
            </section>
        </section>
        <section class="flex flex-col gap-5 md:flex-row ">
            <Highlight v-for="highLight in highLights" :key="highLight.title">
                <template #icon>
                    <component class="text-muted" :is="highLight.icon" :size="58"/>
                </template>
                <template #header>
                    <h2>{{ highLight.title }}</h2>
                </template>
                <p>{{ highLight.description }}</p>
            </Highlight>
        </section>
    </section>
</template>
