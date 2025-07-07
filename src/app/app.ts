import { Component } from '@angular/core';
import { EquipmentFormComponent } from './equipment/equipment-form.component';
import { EquipmentListComponent } from './equipment/equipment-list.component';
// Optional jika ingin menambahkan detail:
import { EquipmentDetailComponent } from './equipment/equipment-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    EquipmentFormComponent,
    EquipmentListComponent,
    EquipmentDetailComponent
  ],
  template: `
    <main class="max-w-3xl mx-auto mt-10 space-y-8">
      <h1 class="text-3xl font-bold text-center">Equipment Management</h1>
      <app-equipment-form></app-equipment-form>
      <app-equipment-list></app-equipment-list>
      <app-equipment-detail [id]="selectedId"></app-equipment-detail>
    </main>
  `
})
export class App {}