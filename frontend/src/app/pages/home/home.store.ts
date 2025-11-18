import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';

import { LocalStorageService } from '../../shared/services';

import { Candidate } from '../../domain/models';
import { SendCandidateUseCase } from '../../domain/use-cases';

export interface HomeState {
  state: 'loading' | 'idle';
  candidates: Candidate[];
}

const initialState: HomeState = {
  state: 'idle',
  candidates: [],
};

export const HomeStore = signalStore(
  withState(initialState),
  withHooks((store, storage = inject(LocalStorageService)) => ({
    onInit() {
      patchState(store, { candidates: storage.candidates });
    },
  })),
  withMethods(
    (
      store,
      sendCandidateUseCase = inject(SendCandidateUseCase),
      storage = inject(LocalStorageService)
    ) => ({
      sendCandidate(params: {
        name: string;
        surname: string;
        excel: File;
        hooks: {
          onSuccess?: () => void;
          onError: (error: Error) => void;
        };
      }) {
        patchState(store, { state: 'loading' });

        sendCandidateUseCase
          .execute({
            excel: params.excel,
            name: params.name,
            surname: params.surname,
          })
          .then(({ candidate }) => {
            const candidates = [candidate, ...store.candidates()];
            patchState(store, { candidates });
            storage.setCandidates(candidates);
          })
          .catch((error: Error) => params.hooks.onError(error))
          .finally(() => patchState(store, { state: 'idle' }));
      },
    })
  )
);
