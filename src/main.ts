import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { EquipmentListComponent } from './app/equipment/equipment-list.component';

bootstrapApplication(EquipmentListComponent, {
  providers: [provideHttpClient()],
});
