import { Component, TemplateRef, computed, inject, signal, viewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { People, PeopleResponse } from '../../models/people';
import { PeopleService } from '../../services/people.service';
import { PeopletemComponent } from '../people-item/people-item.component';

@Component({
  imports: [PeopletemComponent],
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrl: './people-list.component.css',
})
export class PeopleListComponent {
  private readonly peopleService = inject(PeopleService);
  private readonly modalService = inject(NgbModal);

  // Referencia a la plantilla del modal definida en el HTML
  modalContent = viewChild.required<TemplateRef<unknown>>('modalContent');

  people = signal<People[]>([]);
  selectedPeople = signal<People | null>(null);
  page = signal(1);
  hasNext = signal(false);
  loading = signal(true);
  error = signal<string | null>(null);

  hasPrevious = computed(() => this.page() > 1);

  constructor() {
    this.loadPage(1);
  }

  loadPage(page: number) {
    this.loading.set(true);
    this.error.set(null);
    this.peopleService.getPeople(page).subscribe({
      next: (response: PeopleResponse) => {
        this.people.set(response.results);
        this.page.set(page);
        this.hasNext.set(response.next !== null);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la lista de personajes.');
        this.loading.set(false);
      },
    });
  }

  // Se ejecuta cuando el hijo emite el evento (peopleSelected)
  onPeopleSelected(people: People) {
    this.selectedPeople.set(people);
    this.modalService.open(this.modalContent(), { centered: true, size: 'lg' });
  }
}
