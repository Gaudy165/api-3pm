import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EquipmentService } from './equipment.service';
import { Equipment } from './equipment.model';

@Component({
  selector: 'app-equipment-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="p-6 bg-white rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h2 class="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Equipment List
      </h2>

      <ul *ngIf="equipments.length > 0" class="space-y-4">
        <li
          *ngFor="let item of equipments"
          class="flex justify-between items-start bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl p-4 transition-colors duration-200"
        >
          <div class="space-y-1">
            <p class="text-xl font-semibold text-gray-800">
              {{ item.modelName }}
            </p>
            <p class="text-sm text-gray-600">
              <span class="font-medium text-gray-700">Equipment #:</span>
              {{ item.equipment }}
            </p>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
            <p class="text-sm text-gray-400 italic">
              Location: {{ item.location }}
            </p>
          </div>

          <div class="flex flex-col items-end gap-2">
            <button
              (click)="viewDetail(item.id!)"
              class="px-3 py-1 rounded-lg text-sm bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
            >
              View Detail
            </button>
            <button
              (click)="delete(item.id!)"
              class="px-3 py-1 rounded-lg text-sm bg-red-100 text-red-600 hover:bg-red-200 transition"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>

      <p
        *ngIf="equipments.length === 0"
        class="text-gray-500 italic text-center"
      >
        No equipment found.
      </p>
    </div>
  `,
})
export class EquipmentListComponent {
  private readonly service = inject(EquipmentService);
  private readonly router = inject(Router);

  equipments: Equipment[] = [];

  ngOnInit() {
    this.service.getAll().subscribe((data) => (this.equipments = data));
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.service.delete(id).subscribe(() => {
        this.equipments = this.equipments.filter((e) => e.id !== id);
      });
    }
  }

  viewDetail(id: number) {
    this.router.navigate(['/equipment/detail', id]);
  }
}
