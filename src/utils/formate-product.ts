import type { IProductRender } from "@/interface/Product"

export class UtilsFormateProduct {
  static formateSpecificProduct(productData: any): IProductRender {
    const structuProduct = {
      nameProduct: productData.name,
      income: productData.income,
      recipeTime: productData.recipe_time,
      operationalCost: productData.operacional_cost,
      profitPecentage: productData.profit_percentage,
      costOfRevenue: productData.revenue_cost,
      fixedCost: productData.fixed_cost,
      labor: productData.labor,
      profit: productData.profit,
      costOfAllIngredients: productData.cost_of_all_ingredient,
      priceFinalRevenue: productData.final_recipe_price,
      pricePerUnit: productData.price_per_unit,
      isJoker: productData.is_joker.toString()
    }
    return structuProduct
  }
  static formatedProductDataToSend(productData: any) {
    const structureProduct = {
      name: productData.nameProduct,
      income: productData.income,
      recipe_time: productData.recipeTime,
      profit_percentage: productData.profitPecentage,
      revenue_cost: productData.costOfRevenue,
      fixed_cost: productData.fixedCost,
      labor: productData.labor,
      profit: productData.profit,
      final_recipe_price: productData.priceFinalRevenue,
      price_per_unit: productData.pricePerUnit,
      operacional_cost: productData.operationalCost,
      id_category: productData.id_category,
      is_joker: parseInt(productData.isJoker),
      cost_of_all_ingredients: productData.costOfAllIngredients
    }
    return structureProduct
  }
}
