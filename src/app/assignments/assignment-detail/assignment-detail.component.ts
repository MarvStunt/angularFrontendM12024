import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatCheckboxModule,
    MatButton,
    RouterLink,
  ],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css',
})
export class AssignmentDetailComponent implements OnInit {
  @Input() assignementTransmis!: Assignment;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAssigment();
  }

  onAssignmentRendu() {
    this.assignementTransmis.rendu = true;

    this.assignmentsService
      .updateAssignment(this.assignementTransmis)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }

  onDelete() {
    this.assignmentsService.deleteAssignment(this.assignementTransmis)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
    // this.assignementTransmis = null;
    // this.router.navigate(['/home']);
  }

  onClickEdit() {
    console.log('Edit');
    this.router.navigate(
      ['/assignment/' + this.assignementTransmis.id + '/edit'],
      {
        queryParams: { nom: this.assignementTransmis.nom },
        fragment: 'edition',
      }
    );
  }

  isAdmin() {
    return this.authService.admin;;
  }

  getAssigment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignementTransmis = assignment;
    });
  }
}
