import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from './shared/auth.service';
import { MatList } from '@angular/material/list';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list';
import { MatListItem } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatButtonModule,
    MatDivider,
    MatIcon,
    AssignmentsComponent,
    MatSlideToggleModule,
    MatList,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatListItem,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments)';
  opened = false;

  constructor(private authService: AuthService, private router: Router, private http:HttpClientModule) {}
}
