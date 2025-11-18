import { Injectable } from '@angular/core';

import { NonEmptyString } from '@building-blocks/index';
import { invariant } from '@building-blocks/invariant';
import { UseCase } from '@building-blocks/use-case';

import { Candidate } from '../models';
import { CandidatesService } from '../services';

interface SendCandidateProps {
  name: string;
  surname: string;
  excel: File;
}

interface SendCandidateOutput {
  candidate: Candidate;
}

@Injectable()
export class SendCandidateUseCase extends UseCase<
  SendCandidateProps,
  SendCandidateOutput
> {
  constructor(private readonly candidatesService: CandidatesService) {
    super();
  }

  async execute({ excel, name, surname }: SendCandidateProps) {
    invariant('excel must be a file', excel instanceof File);

    const response = await this.candidatesService.sendCandidate({
      excel,
      name: new NonEmptyString({ value: name }),
      surname: new NonEmptyString({ value: surname }),
    });

    return response;
  }
}
