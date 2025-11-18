import { Injectable } from '@angular/core';

import { Candidate } from '../../domain/models';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setCandidates(candidates: Candidate[]) {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }

  public get candidates(): Candidate[] {
    const data = localStorage.getItem('candidates');

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  }
}
