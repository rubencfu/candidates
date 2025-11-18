import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { Candidate } from '../../../domain/models';

@Component({
  selector: 'home-candidates-table',
  template: ` <table
    mat-table
    [dataSource]="candidates()"
    class="candidates-table"
  >
    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef>Name</th>
      <td mat-cell *matCellDef="let element">{{ element.name }}</td>
    </ng-container>

    <ng-container matColumnDef="surname">
      <th mat-header-cell *matHeaderCellDef>Surname</th>
      <td mat-cell *matCellDef="let element">{{ element.surname }}</td>
    </ng-container>

    <ng-container matColumnDef="seniority">
      <th mat-header-cell *matHeaderCellDef>Seniority</th>
      <td mat-cell *matCellDef="let element">{{ element.seniority }}</td>
    </ng-container>

    <ng-container matColumnDef="years">
      <th mat-header-cell *matHeaderCellDef>Years</th>
      <td mat-cell *matCellDef="let element">{{ element.years }}</td>
    </ng-container>

    <ng-container matColumnDef="availability">
      <th mat-header-cell *matHeaderCellDef>Availability</th>
      <td mat-cell *matCellDef="let element">{{ element.availability }}</td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  </table>`,
  imports: [MatTableModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `

    `,
})
export class CandidatesTableComponent {
  candidates = input.required<Candidate[]>();

  displayedColumns = ['name', 'surname', 'seniority', 'years', 'availability'];
}
