import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Equipment } from './equipment.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EquipmentService {
  private readonly baseUrl = 'http://192.168.5.200:60776/api/Equipment';

  constructor(private readonly http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') ?? '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAll(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.baseUrl, {
      headers: this.getHeaders(),
    });
  }

  getById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  create(data: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(this.baseUrl, data, {
      headers: this.getHeaders(),
      responseType: 'json',
    });
  }

  update(data: Equipment): Observable<void> {
    return this.http.put<void>(this.baseUrl, data, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json',
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json',
    });
  }
}

// Jika masih tidak berhasil, lihat endpoint Equipment di Swagger
