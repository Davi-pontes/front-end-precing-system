import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useProductStore = defineStore('product', () => {
  // Estado
  const nameProduct = ref('');
  const descriptionProduct = ref<string | null>(null);
  const qtdInBox = ref(1);
  const tax = ref(0);
  const freigth = ref(0);
  const fixedCost = ref(0);
  const pricePerUnit = ref(0);
  const profitPecentage = ref(0);
  const costProduct = ref(0);
  const profit = ref(0);
  const idCategory = ref('');
  const qtdStock = ref(0);

  // Getters (valores computados)
  const costProductDisplay = computed(() => costProduct.value.toFixed(2));
  const profitDisplay = computed(() => profit.value.toFixed(2));
  const pricePerUnitDisplay = computed(() => pricePerUnit.value.toFixed(2));

  // Ações
  function updateQtdInBox(value: number) {
    qtdInBox.value = value;
    calculateTotalCost();
    calculatePricePerUnit();
  }

  function updateTax(value: number) {
    tax.value = value;
    calculateTotalCost();
    calculatePricePerUnit();
  }

  function updateFreigth(value: number) {
    freigth.value = value;
    calculateTotalCost();
    calculatePricePerUnit();
  }

  function updateFixedCost(value: number) {
    fixedCost.value = value;
    calculateTotalCost();
    calculatePricePerUnit();
  }

  function updatePriceProduct(value: number) {
    pricePerUnit.value = value;
    calculateProfitPercentage();
  }

  function updateProfitPercentage(value: number) {
    profitPecentage.value = value;
    calculateProfit();
  }

  function calculateTotalCost() {
    costProduct.value = tax.value + fixedCost.value + freigth.value + pricePerUnit.value;
  }

  function calculatePricePerUnit() {
    let calculatePricePerUnit =
      (pricePerUnit.value + tax.value + fixedCost.value + freigth.value) / qtdInBox.value;
    if (profit.value > 0) calculatePricePerUnit += profit.value;
    pricePerUnit.value = parseFloat(calculatePricePerUnit.toFixed(2));
  }

  function calculateProfit() {
    profit.value = (costProduct.value * (profitPecentage.value * 100)) / 100;
    calculatePricePerUnit();
  }

  function calculateProfitPercentage() {
    const absoluteProfit = costProduct.value - pricePerUnit.value;
    const profitPercentage = (absoluteProfit / costProduct.value);
    profitPecentage.value = parseFloat(profitPercentage.toFixed(2));
  }

  function clearDatas() {
    nameProduct.value = '';
    descriptionProduct.value = null;
    qtdInBox.value = 1;
    tax.value = 0;
    freigth.value = 0;
    fixedCost.value = 0;
    pricePerUnit.value = 0;
    profitPecentage.value = 0;
    costProduct.value = 0;
    profit.value = 0;
    idCategory.value = '';
    qtdStock.value = 0;
  }

  return {
    nameProduct,
    descriptionProduct,
    qtdInBox,
    tax,
    freigth,
    fixedCost,
    pricePerUnit,
    profitPecentage,
    costProduct,
    profit,
    idCategory,
    qtdStock,
    costProductDisplay,
    profitDisplay,
    pricePerUnitDisplay,
    updateQtdInBox,
    updateTax,
    updateFreigth,
    updateFixedCost,
    updatePriceProduct,
    updateProfitPercentage,
    clearDatas,
  };
});