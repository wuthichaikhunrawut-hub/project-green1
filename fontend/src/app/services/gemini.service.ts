import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private apiUrl = 'http://localhost:3001/gemini'; // adjust to your backend URL

  constructor(private http: HttpClient) {}

  analyzeImage(base64Image: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyze`, { image: base64Image });
  }
}
