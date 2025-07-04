import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentService } from './equipment.service';
import { Equipment } from './equipment.model';

@Component({
  selector: 'app-equipment-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="equipment" class="border rounded p-4 bg-gray-50">
      <h2 class="text-xl font-semibold mb-2">Equipment Detail</h2>
      <div class="space-y-1 text-sm">
        <p><strong>ID:</strong> {{ equipment.id }}</p>
        <p><strong>Equipment #:</strong> {{ equipment.equipment }}</p>
        <p><strong>Model Name:</strong> {{ equipment.modelName }}</p>
        <p><strong>Description:</strong> {{ equipment.description }}</p>
        <p><strong>Location:</strong> {{ equipment.location }}</p>
      </div>
    </div>

    <div *ngIf="loading" class="text-blue-500">Loading...</div>
    <div *ngIf="error" class="text-red-500">Error loading detail.</div>
  `
})
export class EquipmentDetailComponent {
  private readonly service = inject(EquipmentService);
  @Input() id!: number;

  equipment?: Equipment;
  loading = false;
  error = false;

  ngOnChanges() {
    if (this.id !== undefined && this.id !== null) {
      this.fetchEquipment(this.id);
    }
  }

  private fetchEquipment(id: number) {
    this.loading = true;
    this.error = false;
    this.service.getById(id).subscribe({
      next: (data) => {
        this.equipment = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}