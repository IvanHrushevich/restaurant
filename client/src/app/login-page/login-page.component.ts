import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService, MaterialService } from '../shared';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  private destroyed$: Subject<void> = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });

    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe((params: Params) => {
        if (params.registered) {
          MaterialService.toast('Now you may log in.');
        } else if (params.accessDenied) {
          MaterialService.toast('You need to log in first.');
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onSubmit(): void {
    this.form.disable();

    this.authService
      .login(this.form.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        () => {
          this.router.navigate(['/overview']);
        },
        (error) => {
          MaterialService.toast(error.error.message);
          this.form.enable();
        }
      );
  }
}
