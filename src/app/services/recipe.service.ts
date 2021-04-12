import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from 'src/models/Recipe';
import { environment } from '../../environments/environment';
const CORS_URL = environment.corsUrl;

interface RecipeResponse {
  Recipes: Recipe[];
}

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRandomRecipes(): Observable<Recipe[]> {
    return this.http
      .get<RecipeResponse>(
        CORS_URL +
          'https://handla.api.ica.se/api/recipes/random?numberofrecipes=5'
      )
      .pipe(map((data) => data.Recipes));
  }
}
