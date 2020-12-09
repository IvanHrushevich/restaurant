import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, MaterialService } from '../shared';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private destroyed$: Subject<void> = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onSubmit(): void {
    this.form.disable();

    this.authService
      .register(this.form.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => {
          this.router.navigate(['/login'], {
            queryParams: { registered: true },
          });
        },
        (error) => {
          MaterialService.toast(error.error.message);
          this.form.enable();
        }
      );
  }
}
