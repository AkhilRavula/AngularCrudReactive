import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'AngularCrudReactive';
  loading: boolean;

  constructor(private _router : Router)
  {

  }
  getUsername() : string
  {
     return localStorage.getItem('Username');
  }
  Loggedin()
  {
    return localStorage.getItem('Token');
  }

  LoggedOut()
  {
     localStorage.removeItem('Token');
     localStorage.removeItem('Username');
  }

}
