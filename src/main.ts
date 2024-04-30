import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

const combinedProviders = [
  ...appConfig.providers,
  ...[provideCharts(withDefaultRegisterables())],
];

bootstrapApplication(AppComponent, { providers: combinedProviders }).catch(
  (err) => console.error(err)
);
