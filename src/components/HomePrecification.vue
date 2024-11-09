<script lang="ts">
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
import AddCategory from './AddCategory.vue'
import Loading from './Loading.vue'
import ConfirmationModal from './ConfirmationModal.vue'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
interface IProduct {
  category: {
    id: string | null
    name: string
    user_id: string
  }
  products: {
    id_product: string
    name: string
    weight: number
    unit1: string
    price: number
    unit2: number
    quantity: number
    ingredientCost: number
    income: number
    revenue_cost: number
    profit: number
    price_per_unit: number
  }[]
}
interface ICategory {
  id: string | null
  name: string
  user_id: string
}
export default {
  name: 'HomePrecification',
  components: {
    NavBar,
    AddCategory,
    Loading,
    ConfirmationModal
  },
  data() {
    return {
      allProduct: [] as IProduct[],
      showAddCategory: false,
      nameUser: '' as string | null,
      idUser: '' as string | null,
      showLoading: false,
      isBlur: false,
      textModel: '',
      showModal: false
    }
  },
  created() {
    this.getLocalStorage()
    this.getAllProduct()
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
    async getAllProduct() {
      const { data } = await axios.get(urlApiBackEnd + '/category', {
        params: { idUser: this.idUser },
        withCredentials: true
      })
      this.allProduct = data
    },
    goToEdit(idProduct: string, idCategory: string | null): void {
      this.$router.push({
        name: 'precification',
        query: { idC: idCategory, idP: idProduct, idU: this.idUser }
      })
    },
    goToAddProductCategory(idCategory: string | null): void {
      this.$router.push({ name: 'precification', query: { idC: idCategory } })
    },
    addNewCategory(): void {
      this.showAddCategory = true
    },
    updateCategory(newCategory: object): void {
      this.allProduct.unshift({
        category: newCategory,
        products: []
      } as IProduct)
      this.closeAddNewCategory()
    },
    closeAddNewCategory(): void {
      this.showAddCategory = false
    },
    async deleteProduct(id_product: string, index: number) {
      this.showLoading = true
      await axios
        .delete(urlApiBackEnd + '/product', {
          params: {
            id: id_product
          }
        })
        .then(() => {
          const indexTheDataDeleted = this.allProduct[index].products.findIndex(
            (it) => it.id_product === id_product
          )

          this.allProduct[index].products.splice(indexTheDataDeleted, 1)
          this.showLoading = false
        })
        .catch(() => (this.showLoading = false))
    },
    closeAddCategory() {
      this.showAddCategory = false
    },
    async sendUpdateCategory(specificCategory: ICategory) {
      try {
        await axios.patch(urlApiBackEnd + '/category', {
          idCategory: specificCategory.id,
          params: { name: specificCategory.name, user_id: specificCategory.user_id }
        })
      } catch (error) {
        alert('Não foi possível atualizar o nome da categoria.')
      }
    },
    async duplicateProdut(id_product: string, id_category: string | null) {
      this.showLoading = true
      const { data } = await axios.post(urlApiBackEnd + '/product/duplicate', {
        idProduct: id_product,
        idCategory: id_category
      })
      const category = this.allProduct.find((category) => category.category.id === data.id_category)

      if (category) {
        category.products.unshift(data)
      }
      this.showLoading = false
    },
    async deleteCategory(idCategory: string | null) {
      const { data } = await axios.delete(urlApiBackEnd + '/category', {
        params: { id: idCategory }
      })
      const productDeleted = data

      this.allProduct = this.allProduct.filter(
        (category) => category.category.id !== productDeleted
      )
    },
    toggleBlur() {
      this.isBlur = !this.isBlur;
    },
    showModalFunction(){
      this.showModal = true
    }
  }
}
</script>

<template>
  <main>
    <Loading v-if="showLoading" />
    <NavBar
      class="hidden md:block"
      :showButtonAddCategory="true"
      @newCategory="addNewCategory"
      v-if="!showAddCategory"
    />
    <ConfirmationModal v-if="showModal" :text="textModel"/>
    <button @click="toggleBlur" class="bg-[rgb(128,149,199)] text-white px-4 py-2 rounded">
      {{ isBlur ? 'Remover desfoque' : 'Desfocar números' }}
    </button>
    <AddCategory
      v-if="showAddCategory"
      :nameUser="nameUser"
      :idUser="idUser"
      @updateCategory="updateCategory"
      @cancelAddNewCategory="closeAddCategory"
    />
    <div class="flex justify-center w-full h-full" v-if="allProduct.length === 0">
      <button
        class="border border-[#8095c7] bg-transparent rounded-md p-1.5 text-xl text-[#d1cece] cursor-pointer transition duration-800 hover:bg-transparent hover:text-black"
        @click="addNewCategory"
      >
        Adicione uma categoria
      </button>
    </div>
    <div
      class="flex flex-col w-auto"
      v-for="(categoryAndProducts, indexCategory) of allProduct"
      :key="indexCategory"
    >
      <div
        class="name-category"
      >
        <input
          class="w-[13vw] h-[3vh] ml-4 pl-3 pb-[0.3em] border-none bg-transparent border-b border-white text-white text-base overflow-hidden outline-none"
          type="text"
          v-model="categoryAndProducts.category.name"
          @change="sendUpdateCategory(categoryAndProducts.category)"
        />
        <div class="flex w-[45em] items-center justify-between">
          <select
            class="btn-add-product hidden md:flex md:items-center md:justify-center"
          >
          <option disabled>Adicionar produto</option>
          <option class="text-black" @click="goToAddProductCategory(categoryAndProducts.category.id)">Adicionar com precificação</option>
          <option class="text-black">Adicionar sem precificação</option>
          </select>
          <button
            class="btn-delete hidden md:flex md:items-center md:justify-center h-7 w-10"
            @click="deleteCategory(categoryAndProducts.category.id)"
          >
            X
          </button>
        </div>
      </div>
      <table class="w-full text-xs md:text-base">
        <tr class="h-10">
          <th colspan="3"></th>
          <th>PRODUTO</th>
          <th>RENDIMENTO</th>
          <th>CUSTO TOTAL</th>
          <th>LUCRO</th>
          <th>PREÇO DE VENDA</th>
        </tr>
        <tr
          class="line-table"
          v-for="(product, indexProduct) of categoryAndProducts.products"
          :key="indexProduct"
        >
          <td>
            <button
              class="hidden md:block"
              @click="goToEdit(product.id_product, categoryAndProducts.category.id)"
            >
              Visualizar
            </button>
          </td>
          <td>
            <button
              class="hidden md:block"
              @click="deleteProduct(product.id_product, indexCategory)"
            >
              Excluir
            </button>
          </td>
          <td>
            <button
              class="hidden md:block"
              @click="duplicateProdut(product.id_product, categoryAndProducts.category.id)"
            >
              Duplicar
            </button>
          </td>
          <td>{{ product.name }}</td>
          <td :class="{ 'blur-sm': isBlur }">{{ product.income }}</td>
          <td :class="['text-red-500', { 'blur-sm': isBlur }]">R$ {{ product.revenue_cost }}</td>
          <td :class="['text-green-600', { 'blur-sm': isBlur }]">R$ {{ product.profit }}</td>
          <td :class="['text-green-600', { 'blur-sm': isBlur }]">R$ {{ product.price_per_unit }}</td>
        </tr>
      </table>
    </div>
  </main>
</template>

<style scoped>
.name-category{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 2.5rem;
  background:  linear-gradient(to right, #415175, #e7e7e7);
  color: white;
}
.name-category input {
  width: 30vw;
  height: 3vh;
  margin-left: 1em;
  padding-left: 0.8em;
  padding-bottom: 0.3em;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid white;
  color: white;
  font-size: 1em;
  overflow: hidden;
  outline: none;
}

.name-category input:focus {
  border-bottom: 1px solid white;
}

.btn-add-product {
  justify-content: center;
  width: 15vw;
  height: 2rem;
  transition: 0.5s;
  border-radius: 10px;
  background-color: transparent;
  border: 1px solid white;
  color: white;
  cursor: pointer;
}

.btn-add-product:hover {
  background-color: white;
  color: black;
}

.btn-delete {
  width: 5em;
  background-color: transparent;
  border: 1px solid red;
  border-radius: 5px;
  color: red;
  cursor: pointer;
  transition: 0.7s;
  margin-right: 3rem;
}

.btn-delete:hover {
  background-color: red;
  color: white;
}

.line-table button {
  width: 7em;
  font-size: 0.8em;
  border-radius: 5px;
  background-color: transparent;
  padding: 5px;
  cursor: pointer;
  border: 2px solid rgb(179, 175, 175);
  transition: 0.4s;
}

.line-table button:hover {
  background-color: rgb(128, 149, 199);
  color: white;
}

th {
  width: 18%;
}

tr td {
  align-items: center;
  text-align: center;
  height: 3em;
  border-bottom: 1px solid #c8cacc;
}

tr {
  border-bottom: 2px solid #c8cacc;
}

tr:hover {
  box-shadow: 1px 1px 5.5px #8b8b8b;
}
</style>
