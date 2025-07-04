import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipmentService } from './equipment.service';
import { Equipment } from './equipment.model';

@Component({
  selector: 'app-equipment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 max-w-xl mx-auto bg-white drop-shadow-2xl rounded-2xl">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Add Equipment</h2>
      <form
        #form="ngForm"
        (ngSubmit)="save()"
        class="space-y-5 animate-fade-in"
        novalidate
      >
        <div>
          <label
            for="equipment"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Equipment Number</label
          >
          <input
            id="equipment"
            type="number"
            name="equipment"
            [(ngModel)]="model.equipment"
            placeholder="e.g. 100"
            required
            class="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
        </div>

        <div>
          <label
            for="modelName"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Model Name</label
          >
          <input
            id="modelName"
            type="text"
            name="modelName"
            [(ngModel)]="model.modelName"
            placeholder="e.g. Kipas angin"
            required
            class="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
        </div>

        <div>
          <label
            for="description"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Description</label
          >
          <input
            id="description"
            type="text"
            name="description"
            [(ngModel)]="model.description"
            placeholder="e.g. Maspion, memang tangguh"
            class="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
        </div>

        <div>
          <label
            for="location"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Location</label
          >
          <input
            id="location"
            type="text"
            name="location"
            [(ngModel)]="model.location"
            placeholder="e.g. Gudang Timur"
            class="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
        </div>

        <div class="pt-4">
          <button
            type="button"
            (click)="save()"
            class="flex justify-center items-center gap-2 w-full mx-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition duration-200 shadow hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Save Equipment
          </button>
        </div>
      </form>
    </div>
  `,
})
export class EquipmentFormComponent {
  private readonly service = inject(EquipmentService);
  model: Equipment = {
    equipment: 0,
    modelName: '',
    description: '',
    location: '',
  };

  save() {
    this.service.create(this.model).subscribe({
      next: (response) => {
        console.log('Response dari API:', response);
        alert('Equipment added!');
        this.model = {
          equipment: 0,
          modelName: '',
          description: '',
          location: '',
        };
      },
      error: (err) => {
        alert('Gagal menambahkan equipment!');
        console.error('Error saat menambahkan equipment:', err);
      },
    });
  }
}
