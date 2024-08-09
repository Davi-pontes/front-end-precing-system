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
    <main>
        <div class="content">
            <div class="text">
                <h1>Precifique certo!</h1>
                <p> {{ textForParagraph }}</p>
            </div>
            <div class="benefits">
                <h1>
                    benefícios
                </h1>
            </div>
            <div class="description-benefits">
                <div class="card">
                    <i class="fa-solid fa-chart-line"></i>
                    <h1>Maximização do Lucro.</h1>
                    <span>Garanta que todos os custos sejam cobertos e aumente sua margem de lucro sem perder
                        competitividade.</span>
                </div>
                <div class="card">
                    <i class="fa-solid fa-arrow-up-right-dots"></i>
                    <h1>Competitividade no Mercado.</h1>
                    <span>
                        Posicione-se de forma estratégica com preços que atraem clientes e destacam a qualidade do seu
                        produto.
                    </span>
                </div>
                <div class="card">
                    <i class="fa-solid fa-notes-medical"></i>
                    <h1>Sustentabilidade do Negócio.</h1>
                    <span>
                        Assegure a saúde financeira a longo prazo, possibilitando reinvestimentos e crescimento
                        contínuo.
                    </span>
                </div>
            </div>
            <div class="text">
                <h1>Controle de Estoque Simplificado!</h1>
                <p> {{ controllStock }}</p>
            </div>
        </div>
        <footer class="powered-by">
            <p>&copy;copyright 2024 Powered by <strong>GroupDI</strong></p>
        </footer>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100;
    background: rgb(128, 149, 199);
}

.content {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
}

.text {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 50vh;
    color: white;
}

.text h1 {
    font-size: 4em;
}

.text p {
    width: 100%;
    margin-top: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    font-family: Poppins, sans-serif;
}

.benefits {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: x-large;
    width: 100%;
    height: 12vh;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.3em;
}

.description-benefits {
    display: flex;
    align-self: center;
    justify-content: space-around;
    width: 100%;
    height: 25em;
    flex-wrap: wrap;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 15em;
    height: 20em;
    color: white;
    box-shadow: 20px 20px 50px #748abe;
    border-radius: 8px;
}

.card i {
    margin-top: 1em;
    font-size: 3em;
}

.card h1 {
    margin-top: 0.5em;
    font-size: 1.5em;
}

.card span {
    margin-top: 1.5em;
}

.powered-by {
    color: white;
}

footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 2em;
}
</style>