import {Component, inject} from '@angular/core';
import {Step1Component} from './step1/step1.component';
import {Step2Component} from "./step2/step2.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ConfiguratorService} from "./configurator.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Step1Component, Step2Component, RouterLink, RouterOutlet],
  templateUrl: "app.component.html",
})
export class AppComponent {
  name = 'Angular';

  service = inject(ConfiguratorService);

}
