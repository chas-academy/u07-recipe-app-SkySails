import { Component, OnInit } from '@angular/core';
import { Recipe, IngredientGroup, Ingredient } from 'src/models/Recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  constructor(public recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRandomRecipes();
  }
}
