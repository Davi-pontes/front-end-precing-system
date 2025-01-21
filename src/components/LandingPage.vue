<script lang="ts">
export default {
  name: 'Home',
  data() {
    return {
      fullText: `A precificação é a alma do seu negócio. Determinar o preço correto para seus produtos é
                essencial para garantir a sustentabilidade e o crescimento da sua empresa. Com a Helqui, uma boa
                estratégia de precificação não só cobre os custos e gera lucro, mas também posiciona o seu negócio
                de maneira competitiva no mercado.`,
      textForParagraph: '',
      index: 0,
      controllStock: `Com o Helqui, você monitora seu estoque em tempo real, 
            evitando rupturas e excessos. Tenha sempre a quantidade certa de produtos para atender 
            seus clientes, maximizando suas vendas e minimizando custos.`
    }
  },
  mounted() {
    this.toWrite()
  },
  methods: {
    toWrite() {
      if (this.index < this.fullText.length) {
        this.textForParagraph = this.fullText.substring(0, this.index) + '|'
        this.index++
        setTimeout(this.toWrite, 20)
      } else {
        this.textForParagraph = this.fullText
      }
    }
  }
}
</script>
<template>
  <main class="w-full h-full bg-[#8095c7] text-white">
    <div className="w-full md:w-full">
      <div
        class="flex flex-col items-center w-[100vw] h-[63vh] md:items-center md:h-[40vh] md:w-[100vw]"
      >
        <h1 class="text-4xl md:text-6xl text-center my-4 font-bold md:my-10">Precifique certo!</h1>
        <p
          class="text-xl items-start w-[90vw] md:text-2xl md:w-[80vw] font-poppins uppercase text-left"
        >
          {{ textForParagraph }}
        </p>
      </div>

      <div class="text-4xl md:text-6xl text-center my-4 md:my-10 font-bold">
        <h1>Benefícios</h1>
      </div>
      <div class="flex self-center justify-around w-full h-[150vh] md:h-[45vh] flex-wrap">
        <div class="card">
          <i class="fa-solid fa-chart-line text-2xl"></i>
          <h1 class="text-xl font-bold">Maximização do Lucro.</h1>
          <span class="mt-2"
            >Garanta que todos os custos sejam cobertos e aumente sua margem de lucro sem perder
            competitividade.</span
          >
        </div>

        <div class="card">
          <i class="fa-solid fa-arrow-up-right-dots text-2xl"></i>
          <h1 class="text-xl font-bold">Competitividade no Mercado.</h1>
          <span class="mt-2"
            >Posicione-se de forma estratégica com preços que atraem clientes e destacam a qualidade
            do seu produto.</span
          >
        </div>

        <div class="card">
          <i class="fa-solid fa-notes-medical text-2xl"></i>
          <h1 class="text-xl font-bold">Sustentabilidade do Negócio.</h1>
          <span class="mt-2"
            >Assegure a saúde financeira a longo prazo, possibilitando reinvestimentos e crescimento
            contínuo.</span
          >
        </div>
      </div>
      <div class="flex flex-col w-[100vw] h-[60vh] md:h-[50vh] items-center">
        <h1 class="text-4xl md:text-6xl text-center my-4 font-bold md:my-10">
          Controle de Estoque Simplificado!
        </h1>
        <p class="text-xl font-poppins uppercase md:text-2xl w-[80vw]">{{ controllStock }}</p>
      </div>
    </div>
    <footer class="flex justify-center items-center">
      <p>&copy;copyright 2024 Powered by <strong>GroupDI</strong></p>
    </footer>
  </main>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 15em;
  height: 20em;
  color: #7386b3;
  box-shadow: 20px 20px 50px #96aee4;
  border-radius: 8px;
  background-color: white;
}
</style>
