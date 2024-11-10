import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from './assignment.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDivider } from '@angular/material/divider';
import { MatList } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { AssignmentsService } from '../shared/assignments.service';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    CommonModule,
    RenduDirective,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatIcon,
    MatSidenavModule,
    MatDivider,
    MatList,
    MatListItem,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    RouterLink,
    RouterOutlet,
    MatPaginatorModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
})
export class AssignmentsComponent implements OnInit {
  titre = 'Mon appplication sur les Assignments !';
  opened = false;
  formVisible = false;
  assignments!: Assignment[];

  // Add pagination variables
  page: number = 1;
  limit: number = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;

  constructor(private assignmentsService: AssignmentsService) {}

  ngOnInit(): void {
    this.getAssignments();
    this.assignmentsService
      .getAssignmentsPagine(this.page, this.limit)
      .subscribe((data) => {
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
        console.log('Données reçus');
      });
  }

  assignmentSelectionne!: Assignment;

  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
  }

  onAddAssignmentBtnClick() {
    // this.formVisible = true;
  }

  getAssignments() {
    this.assignmentsService.getAssignments().subscribe((assignments) => {
      this.assignments = assignments;
    });
  }

  generateRandomAssignments() {
    const assignments = [];
    for (let i = 0; i < 10; i++) {
      const assignment = {
        id: Math.floor(Math.random() * 100000),
        nom: `Assignment ${i + 1}`,
        dateDeRendu: this.getRandomDate(),
        rendu: Math.random() < 0.5,
      };
      assignments.push(assignment);
    }

    this.assignmentsService.addMultipleAssignments(assignments).subscribe({
      next: () => this.getAssignments(),
      error: (err) => alert(`Erreur lors de la création : ${err.message}`),
    });
  }

  getRandomDate(): Date {
    const start = new Date(2020, 0, 1).getTime();
    const end = new Date().getTime();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime);
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;

    this.assignmentsService
      .getAssignmentsPagine(this.page, this.limit)
      .subscribe((data) => {
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasPrevPage = data.hasPrevPage;
        this.hasNextPage = data.hasNextPage;
      });
  }
}
