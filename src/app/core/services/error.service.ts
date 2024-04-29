import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private errorSubject = new BehaviorSubject<string | null>(null);
    public error$ = this.errorSubject.asObservable();

    reportError(message: string) {
        this.errorSubject.next(message);
    }

    clearError() {
        this.errorSubject.next(null);
    }
}
