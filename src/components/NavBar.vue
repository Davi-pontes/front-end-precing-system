<script lang="ts">
export default {
  name: 'NavBar',
  props: {
    showButtonAddCategory: Boolean
  },
  data() {
    return {
      nameUser: '' as string | null,
      idUser: '' as string | null
    }
  },
  created() {
    this.getLocalStorage()
  },
  methods: {
    getLocalStorage() {
      const localStorageObject = localStorage.getItem('User')
      if (localStorageObject) {
        const parsedObject = JSON.parse(localStorageObject)
        this.nameUser = parsedObject.name || ''
        this.idUser = parsedObject.id || ''
      }
    },
    goAllIngredients() {
      this.$router.push({ name: 'allIngredients', query: { id: this.idUser } })
    },
    backHome() {
      this.$router.push({ name: 'homePrecification' })
    },
    goStock() {
      this.$router.push({ name: 'stock', query: { id: this.idUser } })
    },
    goStockProduct() {
      this.$router.push({ name: 'stockProduct', query: { id: this.idUser } })
    },
    goOrder() {
      this.$router.push({ name: 'order', query: { id: this.idUser } })
    },
    exit() {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<template>
  <main>
    <div class="head">
      <p @click="backHome">{{ nameUser }}</p>
      <ul class="nav-list">
        <li><button @click="backHome">Início</button></li>
        <li><button @click="goAllIngredients">Todos ingredientes</button></li>
        <li><button @click="goOrder">Pedidos</button></li>
        <li><button @click="goStock">Estoque de ingredientes</button></li>
        <li><button @click="goStockProduct">Estoque de produtos</button></li>
        <li><button @click="exit">Sair</button></li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.head {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 4em;
  background: rgb(128, 149, 199);
  color: white;
  margin-bottom: 0.3em;
}

.head button {
  border: none;
  font-size: 15px;
  transition: 0.5s;
  background-color: transparent;
  color: white;
  cursor: pointer;
}

.head p {
  font-family: sans-serif;
  font-size: 2em;
  cursor: pointer;
}

.head button:hover {
  color: black;
}

.nav-list {
  list-style: none;
  display: flex;
}

.nav-list li {
  letter-spacing: 3px;
  margin-left: 3em;
}
</style>
