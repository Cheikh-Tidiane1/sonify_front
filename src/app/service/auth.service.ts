import { Location } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import {
  computed,
  inject,
  Inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { State } from '../models/state.model';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = Inject(HttpClient);

  location: Location = inject(Location);

  notConnected: string = 'NOT_CONNECTED';

  private fetchUser$: WritableSignal<State<User, HttpErrorResponse>> = signal(
    State.Builder<User, HttpErrorResponse>().forSuccess({
      email: this.notConnected,
    })
  );
  fetchUser = computed(() => this.fetchUser$);

  fetch(): void {
    this.http.get<User>(`${environment.API_URL}/api/get-authenticated-user`)
      .subscribe({
        next: user => this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forSuccess(user).build()),
        error: (err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.Unauthorized && this.isAuthenticated()) {
            this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forSuccess({email: this.notConnected}).build());
          } else {
            this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forError(err).build());
          }
        }
      });
  }

  isAuthenticated(): boolean {
    if (this.fetchUser$().value) {
      return this.fetchUser$().value!.email !== this.notConnected;
    } else {
      return false;
    }
  }
  
  constructor() {}
}
