export interface IBasesCalculation {
    tax: number;
    fixedCost: number;
    freigth: number;
    priceProduct: number;
    qtyInBox: number;
    sellingPrice: number;
    profitPercentage: number;
  }
  export interface ICalculationResult {
    costProduct: number;
    pricePerUnit: number;
    priceWithProfit: number;
    profit: number;
    profitPercentage: number;
  }