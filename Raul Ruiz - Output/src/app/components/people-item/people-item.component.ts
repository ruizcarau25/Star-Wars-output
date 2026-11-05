import { Component, input, output } from '@angular/core';
import { People } from '../../models/people';

@Component({
  selector: 'app-people-item',
  templateUrl: './people-item.component.html',
  styleUrl: './people-item.component.css',
})
export class PeopletemComponent {
  // INPUT: el padre le pasa el personaje a pintar
  people = input.required<People>();

  // OUTPUT: el hijo avisa al padre de que se ha hecho click
  peopleSelected = output<People>();

  onClick() {
    this.peopleSelected.emit(this.people());
  }
}
