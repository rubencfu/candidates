import {
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { HttpCandidatesService } from '../../infrastructure/http/http-candidates.service';

import { SendCandidateUseCase } from '../../domain/use-cases';
import { CandidatesService } from '../../domain/services';

import { CandidatesTableComponent } from './components/candidates-table.component';
import { HomeStore } from './home.store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CandidatesTableComponent,
  ],
  providers: [
    HomeStore,
    SendCandidateUseCase,
    { provide: CandidatesService, useClass: HttpCandidatesService },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .container {
        display: flex;
        justify-content: center;
        margin-top: 60px;
        flex-direction: column;
        align-items: center;
    }
    .form-card {
        width: 600px;
    }
    .card-header {
        padding-bottom: 1rem;
    }
    .form-input {
        width: 100%;
        margin-bottom: 12px;
    }
    .form-file {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-bottom: 12px;
        font-size: 16px;
    }
    .candidates-wrap {
      width: 600px;
      margin-top: 20px;
    }
  `,
})
export class HomeComponent {
  protected readonly store = inject(HomeStore);

  candidateForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    surname: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    excel: new FormControl<File | null>(null, [Validators.required]),
  });

  handleFileInputExcel(files: FileList | File | null) {
    const file = files ? (files instanceof File ? files : files.item(0)) : null;

    if (!file) {
      this.candidateForm.get('excel')?.setValue(null);
      return;
    }

    this.candidateForm.get('excel')?.setValue(file);
  }

  sendCandidate() {
    this.candidateForm.updateValueAndValidity();

    const { excel, name, surname } = this.candidateForm.getRawValue();

    if (!excel) {
      return;
    }

    this.store.sendCandidate({
      name,
      surname,
      excel,
      hooks: {
        onError: (error) => {
          console.error(error);
        },
      },
    });
  }
}
