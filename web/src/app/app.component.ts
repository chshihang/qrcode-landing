import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'web';

  constructor(private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    if (this.router && this.router.url && !this.router.url.startsWith(`/login`)) {
      this.userService.initCurrentLoginUser(() => {
      }).subscribe({
          error: () =>
            this.router.navigateByUrl('/login').then()
        });
    }
  }
}
