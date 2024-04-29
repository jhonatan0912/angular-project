import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { IWarehouse } from '../models/warehouse.interface';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  private readonly CreateArticleUrl = `${environment.API_URL}/almacen/create-article`;
  private readonly GetArticlesUrl = `${environment.API_URL}/almacen/get-article`;

  constructor(private readonly httpRequestClient: HttpClient) { }

  createArticle(formData: FormData): Observable<any> {
    return this.httpRequestClient.post(this.CreateArticleUrl, formData);
  }

  getArticles(page: number, limit: number): Observable<IWarehouse> {
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.httpRequestClient.get<IWarehouse>(`${this.GetArticlesUrl}`, { params });
  }
}
