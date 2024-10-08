import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {fontAwesomeIcons} from "./shared/font-awesome-icons";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NavigationComponent} from "./components/navigation/navigation.component";
import { LibraryComponent } from "./components/library/library.component";
import { HeaderComponent } from "./components/header/header.component";
import { ToastService } from './service/toast.service';
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
  RouterOutlet, 
  FontAwesomeModule, 
  NavigationComponent, 
  LibraryComponent, 
  HeaderComponent,
  NgbToast
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'sonify';
  private faIconLibrary : FaIconLibrary = inject(FaIconLibrary);

  toastService: ToastService = inject(ToastService) ;
  
  ngOnInit(): void {
    this.initFontAwesome();
    // this.toastService.show('hello toast','SUCCESS');
  }

  private initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }
}
