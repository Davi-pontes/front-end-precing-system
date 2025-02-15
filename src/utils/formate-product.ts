export class UtilsFormateProduct {
  static formateSpecificProduct(productData: any): any {
    const dataProduct = {
      nameProduct: productData.name,
      isJoker: productData.is_joker.toString()
    }
    const basesCalculation = {
      income: productData.income,
      recipe_time: productData.recipe_time,
      profit_percentage: productData.profit_percentage,
      labor: productData.labor,
      operacional_cost: productData.operacional_cost
    }
    const resultCalculation = {
      fixed_cost: productData.fixed_cost,
      profit: productData.profit,
      final_recipe_price: productData.final_recipe_price,
      price_per_unit: productData.price_per_unit,
      revenue_cost: productData.revenue_cost
    }
    return { dataProduct, basesCalculation, resultCalculation, costOfAllIngredients: productData.cost_of_all_ingredient, }
  }
  static formatedProductDataToSend(productData: any, basesCalculation: any, resultCalculation:any, costOfAllIngredients:any) {
    const structureProduct = {
      name: productData.nameProduct,
      income: basesCalculation.income,
      recipe_time: basesCalculation.recipe_time,
      profit_percentage: basesCalculation.profit_percentage,
      revenue_cost: resultCalculation.revenue_cost,
      fixed_cost: resultCalculation.fixed_cost,
      labor: basesCalculation.labor,
      profit: resultCalculation.profit,
      final_recipe_price: resultCalculation.final_recipe_price,
      price_per_unit: resultCalculation.price_per_unit,
      operacional_cost: basesCalculation.operacional_cost,
      id_category: productData.id_category,
      is_joker: parseInt(productData.isJoker),
      cost_of_all_ingredients: costOfAllIngredients
    }
    return structureProduct
  }
}
