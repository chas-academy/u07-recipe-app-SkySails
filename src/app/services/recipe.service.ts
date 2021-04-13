import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  Recipe,
  RecipeSearchResult,
  Ingredient,
  IngredientGroup,
} from 'src/models/Recipe';
import { environment } from '../../environments/environment';
const CORS_URL = environment.corsUrl;

interface RecipeResponse<T> {
  Recipes: T[];
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  public query: string | null = null;
  public recipes: RecipeSearchResult[] = [];
  public searching: boolean = false;

  public getRecipesByQuery() {
    if (this.query) {
      this.searching = true;
      this.http
        .get<RecipeResponse<RecipeSearchResult>>(
          CORS_URL + 'handla.api.ica.se/api/recipes/searchwithfilters',
          {
            params: {
              recordsPerPage: '5',
              pageNumber: '1',
              phrase: this.query,
              sorting: '0',
            },
          }
        )
        .pipe(map((data) => data.Recipes))
        .subscribe((recipes) => {
          this.recipes = recipes;
          this.searching = false;
        });
    }
  }

  getRandomRecipes(): void {
    this.searching = true;
    this.http
      .get<RecipeResponse<Recipe>>(
        CORS_URL +
          'https://handla.api.ica.se/api/recipes/random?numberofrecipes=5'
      )
      .pipe(map((data) => data.Recipes))
      .subscribe((recipes) => {
        this.recipes = recipes.map((recipe) =>
          transformRecipeToSearchFormat(recipe)
        );
        this.searching = false;
      });
  }
}

const transformRecipeToSearchFormat = (recipe: Recipe): RecipeSearchResult => ({
  Id: recipe.Id,
  ImageId: recipe.ImageId,
  ImageUrl: recipe.ImageUrl,
  Title: recipe.Title,
  PreambleHTML: recipe.PreambleHTML,
  Difficulty: recipe.Difficulty,
  CookingTime: recipe.CookingTime,
  CookingTimeAbbreviated: recipe.CookingTimeAbbreviated,
  CookingTimeMinutes: +recipe.CookingTime.split('')[1],
  CommentCount: recipe.CommentCount,
  AverageRating: recipe.AverageRating,
  IngredientCount: getIngredients(recipe).length,
  OfferCount: recipe.OfferCount,
  IsGoodClimateChoice: recipe.IsGoodClimateChoice,
  NumberOfUserRatings: recipe.CurrentUsersRating,
});

const getIngredients = (recipe: Recipe) => {
  return recipe.IngredientGroups.reduce(
    (ingredients: Ingredient[], ingredientGroup: IngredientGroup) => [
      ...ingredients,
      ...ingredientGroup.Ingredients,
    ],
    []
  );
};
