import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @Output() emitShoppingEdit = new EventEmitter<Ingredient>();
  @ViewChild('nameInput', {static: true}) nameViewInput: ElementRef;
  @ViewChild('amountInput', {static: true}) amountViewInput: ElementRef;

  onAddShoppingList() {
    const newIngredient = new Ingredient(this.nameViewInput.nativeElement.value, this.amountViewInput.nativeElement.value);
    this.emitShoppingEdit.emit(newIngredient);
  }
}
