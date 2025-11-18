import { NonEmptyString } from '@building-blocks/value-objects';
import { Service } from '@building-blocks/service';

import { Candidate } from '../models';

export abstract class CandidatesService extends Service {
  abstract sendCandidate(props: {
    name: NonEmptyString;
    surname: NonEmptyString;
    excel: File;
  }): Promise<{ candidate: Candidate }>;
}
