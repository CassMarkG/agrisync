export type SyncLevel = "high" | "medium" | "low";

export interface CropData {
  name: string;
  syncScore: number;
  level: SyncLevel;
  recommendation: "Plant" | "Caution" | "Avoid";
  currentSupply: number;
  projectedDemand: number;
  projectedSupply: number;
  pricePerKg: number;
  trend: "up" | "down" | "stable";
  category: string;
  growingSeason: string;
  waterRequirement: "low" | "medium" | "high";
  daysToHarvest: number;
  yieldPerHectare: number; // tonnes
  demandHistory: number[]; // last 6 months
  supplyHistory: number[]; // last 6 months
  priceHistory: number[]; // last 6 months
  regions: { name: string; hectares: number; percentage: number }[];
  demandCapacityRemaining: number; // percentage of demand still unmet by recommendations
}

export const crops: CropData[] = [
  {
    name: "Sorghum",
    syncScore: 91,
    level: "high",
    recommendation: "Plant",
    currentSupply: 42,
    projectedDemand: 18500,
    projectedSupply: 7800,
    pricePerKg: 4.2,
    trend: "up",
    category: "Grain",
    growingSeason: "Oct – Mar",
    waterRequirement: "low",
    daysToHarvest: 120,
    yieldPerHectare: 2.8,
    demandHistory: [15200, 15800, 16400, 17100, 17800, 18500],
    supplyHistory: [9200, 8800, 8400, 8100, 7900, 7800],
    priceHistory: [3.1, 3.4, 3.6, 3.8, 4.0, 4.2],
    regions: [
      { name: "Central", hectares: 4200, percentage: 35 },
      { name: "North-East", hectares: 3600, percentage: 30 },
      { name: "Kgatleng", hectares: 2400, percentage: 20 },
      { name: "South-East", hectares: 1800, percentage: 15 },
    ],
    demandCapacityRemaining: 72,
  },
  {
    name: "Cowpeas",
    syncScore: 84,
    level: "high",
    recommendation: "Plant",
    currentSupply: 38,
    projectedDemand: 9200,
    projectedSupply: 3500,
    pricePerKg: 12.8,
    trend: "up",
    category: "Legume",
    growingSeason: "Nov – Feb",
    waterRequirement: "low",
    daysToHarvest: 90,
    yieldPerHectare: 1.2,
    demandHistory: [7400, 7800, 8200, 8600, 9000, 9200],
    supplyHistory: [4100, 3900, 3700, 3600, 3500, 3500],
    priceHistory: [9.2, 10.1, 10.8, 11.5, 12.2, 12.8],
    regions: [
      { name: "North-West", hectares: 1800, percentage: 40 },
      { name: "Central", hectares: 1350, percentage: 30 },
      { name: "Kgatleng", hectares: 900, percentage: 20 },
      { name: "Ghanzi", hectares: 450, percentage: 10 },
    ],
    demandCapacityRemaining: 65,
  },
  {
    name: "Millet",
    syncScore: 79,
    level: "high",
    recommendation: "Plant",
    currentSupply: 48,
    projectedDemand: 7600,
    projectedSupply: 3650,
    pricePerKg: 5.4,
    trend: "up",
    category: "Grain",
    growingSeason: "Oct – Feb",
    waterRequirement: "low",
    daysToHarvest: 95,
    yieldPerHectare: 1.8,
    demandHistory: [6200, 6500, 6800, 7100, 7400, 7600],
    supplyHistory: [4200, 4000, 3800, 3700, 3650, 3650],
    priceHistory: [4.0, 4.3, 4.6, 4.9, 5.1, 5.4],
    regions: [
      { name: "Central", hectares: 2100, percentage: 38 },
      { name: "North-East", hectares: 1650, percentage: 30 },
      { name: "Kweneng", hectares: 1100, percentage: 20 },
      { name: "South-East", hectares: 660, percentage: 12 },
    ],
    demandCapacityRemaining: 58,
  },
  {
    name: "Watermelon",
    syncScore: 76,
    level: "high",
    recommendation: "Plant",
    currentSupply: 55,
    projectedDemand: 14000,
    projectedSupply: 7700,
    pricePerKg: 3.1,
    trend: "stable",
    category: "Fruit",
    growingSeason: "Sep – Jan",
    waterRequirement: "medium",
    daysToHarvest: 80,
    yieldPerHectare: 25.0,
    demandHistory: [13200, 13400, 13600, 13800, 13900, 14000],
    supplyHistory: [7500, 7600, 7650, 7680, 7700, 7700],
    priceHistory: [3.0, 3.0, 3.1, 3.1, 3.1, 3.1],
    regions: [
      { name: "Central", hectares: 3200, percentage: 32 },
      { name: "North-West", hectares: 2800, percentage: 28 },
      { name: "Kgatleng", hectares: 2200, percentage: 22 },
      { name: "Kweneng", hectares: 1800, percentage: 18 },
    ],
    demandCapacityRemaining: 48,
  },
  {
    name: "Sunflower",
    syncScore: 62,
    level: "medium",
    recommendation: "Caution",
    currentSupply: 71,
    projectedDemand: 11000,
    projectedSupply: 7800,
    pricePerKg: 6.5,
    trend: "stable",
    category: "Oilseed",
    growingSeason: "Nov – Mar",
    waterRequirement: "medium",
    daysToHarvest: 110,
    yieldPerHectare: 1.5,
    demandHistory: [10400, 10500, 10700, 10800, 10900, 11000],
    supplyHistory: [7200, 7400, 7500, 7600, 7700, 7800],
    priceHistory: [6.8, 6.7, 6.6, 6.5, 6.5, 6.5],
    regions: [
      { name: "Central", hectares: 3800, percentage: 42 },
      { name: "North-East", hectares: 2700, percentage: 30 },
      { name: "Kweneng", hectares: 1620, percentage: 18 },
      { name: "South-East", hectares: 900, percentage: 10 },
    ],
    demandCapacityRemaining: 31,
  },
  {
    name: "Maize",
    syncScore: 34,
    level: "low",
    recommendation: "Avoid",
    currentSupply: 112,
    projectedDemand: 22000,
    projectedSupply: 24600,
    pricePerKg: 2.1,
    trend: "down",
    category: "Grain",
    growingSeason: "Oct – Mar",
    waterRequirement: "high",
    daysToHarvest: 135,
    yieldPerHectare: 3.5,
    demandHistory: [22800, 22600, 22400, 22200, 22100, 22000],
    supplyHistory: [21000, 22000, 23000, 23800, 24200, 24600],
    priceHistory: [3.2, 2.9, 2.6, 2.4, 2.2, 2.1],
    regions: [
      { name: "Central", hectares: 8200, percentage: 34 },
      { name: "North-East", hectares: 6000, percentage: 25 },
      { name: "Kweneng", hectares: 5300, percentage: 22 },
      { name: "South-East", hectares: 4600, percentage: 19 },
    ],
    demandCapacityRemaining: 0,
  },
  {
    name: "Tomatoes",
    syncScore: 28,
    level: "low",
    recommendation: "Avoid",
    currentSupply: 138,
    projectedDemand: 8400,
    projectedSupply: 11600,
    pricePerKg: 5.8,
    trend: "down",
    category: "Vegetable",
    growingSeason: "Aug – Dec",
    waterRequirement: "high",
    daysToHarvest: 75,
    yieldPerHectare: 35.0,
    demandHistory: [8800, 8700, 8600, 8500, 8400, 8400],
    supplyHistory: [9800, 10200, 10600, 11000, 11300, 11600],
    priceHistory: [8.4, 7.6, 7.0, 6.5, 6.1, 5.8],
    regions: [
      { name: "South-East", hectares: 2400, percentage: 36 },
      { name: "Central", hectares: 2000, percentage: 30 },
      { name: "Kweneng", hectares: 1340, percentage: 20 },
      { name: "Kgatleng", hectares: 930, percentage: 14 },
    ],
    demandCapacityRemaining: 0,
  },
  {
    name: "Onions",
    syncScore: 22,
    level: "low",
    recommendation: "Avoid",
    currentSupply: 145,
    projectedDemand: 6800,
    projectedSupply: 9860,
    pricePerKg: 7.2,
    trend: "down",
    category: "Vegetable",
    growingSeason: "Mar – Jul",
    waterRequirement: "medium",
    daysToHarvest: 100,
    yieldPerHectare: 20.0,
    demandHistory: [7200, 7100, 7000, 6900, 6800, 6800],
    supplyHistory: [8400, 8800, 9200, 9500, 9700, 9860],
    priceHistory: [9.8, 9.1, 8.5, 8.0, 7.5, 7.2],
    regions: [
      { name: "South-East", hectares: 2800, percentage: 38 },
      { name: "Central", hectares: 2200, percentage: 30 },
      { name: "Kweneng", hectares: 1480, percentage: 20 },
      { name: "Kgatleng", hectares: 880, percentage: 12 },
    ],
    demandCapacityRemaining: 0,
  },
];

export const demandSupplyChartData = crops.map((c) => ({
  name: c.name,
  demand: c.projectedDemand,
  supply: c.projectedSupply,
}));

// Forecast data for charts
export const monthLabels = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// National summary metrics
export const nationalMetrics = {
  totalCropsTracked: crops.length,
  avgSyncScore: Math.round(crops.reduce((s, c) => s + c.syncScore, 0) / crops.length),
  oversuppliedCrops: crops.filter((c) => c.level === "low").length,
  undersuppliedCrops: crops.filter((c) => c.level === "high").length,
  totalProjectedDemand: crops.reduce((s, c) => s + c.projectedDemand, 0),
  totalProjectedSupply: crops.reduce((s, c) => s + c.projectedSupply, 0),
  farmersConnected: 3247,
  forecastAccuracy: 87.3,
};
