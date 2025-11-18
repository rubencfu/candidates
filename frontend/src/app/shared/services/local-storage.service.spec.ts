import { Candidate } from '../../domain/models';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    localStorage.clear();
    service = new LocalStorageService();
  });

  test('setCandidates save data in localStorage', () => {
    const data: Candidate[] = [
      {
        name: 'Gustave',
        surname: 'Sánchez',
        seniority: 'junior',
        years: 2,
        availability: true,
      },
    ];

    service.setCandidates(data);

    expect(JSON.parse(localStorage.getItem('candidates')!)).toEqual(data);
  });

  test('candidates returns empty array if no data', () => {
    expect(service.candidates).toEqual([]);
  });

  test('candidates returns correct list', () => {
    const candidate = {
      name: 'Gustave',
      surname: 'Sánchez',
      seniority: 'junior',
      years: 2,
      availability: true,
    };

    localStorage.setItem('candidates', JSON.stringify([candidate]));

    expect(service.candidates).toEqual([candidate]);
  });
});
