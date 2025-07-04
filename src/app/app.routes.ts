import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'equipment',
    pathMatch: 'full'
  },
  {
    path: 'equipment',
    children: [
      {
        path: '',
        title: 'Equipment List',
        loadComponent: () =>
          import('./equipment/equipment-list.component').then(m => m.EquipmentListComponent)
      },
      {
        path: 'create',
        title: 'Add Equipment',
        loadComponent: () =>
          import('./equipment/equipment-form.component').then(m => m.EquipmentFormComponent)
      },
      {
        path: 'detail/:id',
        title: 'Equipment Detail',
        loadComponent: () =>
          import('./equipment/equipment-detail.component').then(m => m.EquipmentDetailComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'equipment'
  }
];
