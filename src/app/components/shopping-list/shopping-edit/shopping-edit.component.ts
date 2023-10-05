import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  // @Output() emitShoppingEdit = new EventEmitter<Ingredient>();
  @ViewChild('nameInput', {static: true}) nameViewInput: ElementRef;
  @ViewChild('amountInput', {static: true}) amountViewInput: ElementRef;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddShoppingList() {
    const newIngredient = new Ingredient(this.nameViewInput.nativeElement.value, this.amountViewInput.nativeElement.value);
    this.shoppingListService.addIngredient(newIngredient);
    // this.emitShoppingEdit.emit(newIngredient);
  }
}
