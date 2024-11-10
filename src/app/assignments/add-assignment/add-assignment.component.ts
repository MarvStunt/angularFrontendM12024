import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatDatepickerModule, MatButtonModule, RouterLink, RouterOutlet],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
  providers: [provideNativeDateAdapter()]
})
export class AddAssignmentComponent {
  nomDevoir:string = "";
  dateDeRendu = new Date()

  constructor(private assignmentsService:AssignmentsService) { }

  ngOnInit(): void {
  }

  onSubmit(event:any){
    const newAssignment = new Assignment();
    newAssignment.id = Math.floor(Math.random() * 1000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    this.assignmentsService.addAssignment(newAssignment).subscribe(message => {
      console.log(message);
    });
  }
}
