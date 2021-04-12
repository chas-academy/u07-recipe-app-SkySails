export interface Recipe {
  Id: number;
  Title: string;
  ImageId: number;
  ImageUrl: string;
  IngredientGroups: IngredientGroup[];
  ExtraPortions: IngredientGroup[];
  PreambleHTML: string;
  GroceryBags: GroceryBags;
  PreparationAdvice: string;
  DietaryInfo: string;
  NutritionPerPortion: NutritionPerPortion;
  CarbonPerPortion: number;
  NumberOfCarbonLeaves: number;
  IsGoodClimateChoice: boolean;
  CookingSteps: string[];
  CookingStepsWithTimers: CookingStepsWithTimer[];
  CurrentUsersRating: string;
  AverageRating: string;
  Difficulty: string;
  CookingTime: string;
  CookingTimeAbbreviated: string;
  Portions: number;
  PortionsDescription: string;
  Categories: any[];
  MdsaCategories: string[];
  MoreLikeThis: number[];
  OfferCount: number;
  CommentCount: number;
}

export interface CookingStepsWithTimer {
  Description: string;
  TimersInMinutes: number[];
}

export interface NutritionPerPortion {
  Carbohydrate: number;
  Fat: number;
  Protein: number;
  Salt: number;
  KCalories: number;
  KJoule: number;
}

export interface GroceryBags {
  Bags: Bag[];
  Url: string;
}

export interface Bag {
  Year: number;
  WeekNumber: number;
  ArticleNumber: number;
}

export interface IngredientGroup {
  Portions: number;
  Ingredients: Ingredient[];
}

export interface Ingredient {
  Text: string;
  IngredientId: number;
  Quantity: number;
  MinQuantity: number;
  QuantityFraction: string;
  Ingredient: string;
  Unit?: string;
}
