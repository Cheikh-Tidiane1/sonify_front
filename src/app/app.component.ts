import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {fontAwesomeIcons} from "./shared/font-awesome-icons";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NavigationComponent} from "./components/navigation/navigation.component";
import { LibraryComponent } from "./components/library/library.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, NavigationComponent, LibraryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'sonify';
  private faIconLibrary : FaIconLibrary = inject(FaIconLibrary);

  ngOnInit(): void {
    this.initFontAwesome();
  }

  private initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }
}
