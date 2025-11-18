import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { NonEmptyString } from '@building-blocks/value-objects';

import { environment } from '../../../environments/environment';

import { CandidatesService } from '../../domain/services';
import { Candidate } from '../../domain/models';

@Injectable()
export class HttpCandidatesService extends CandidatesService {
  constructor(private readonly http: HttpClient) {
    super();
  }

  sendCandidate(props: {
    name: NonEmptyString;
    surname: NonEmptyString;
    excel: File;
  }): Promise<{ candidate: Candidate }> {
    try {
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      const formData = new FormData();

      formData.append('name', props.name.toPrimitives());
      formData.append('surname', props.surname.toPrimitives());
      formData.append('excel', props.excel);

      return firstValueFrom(
        this.http.post<{ candidate: Candidate }>(
          `${environment.SERVER}/api/candidates`,
          formData,
          { headers }
        )
      );
    } catch (error: unknown) {
      if (error instanceof HttpErrorResponse) {
        throw error;
      }

      throw error;
    }
  }
}
