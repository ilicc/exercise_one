/**
 * copyright by Marszałkiewicz Konrad http://pixelhe.art/ 2018
 */
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routesConfig: Routes = [
    {
        path: 'user', component: UserComponent,
    }
  ];

  export const UserRouterModule = RouterModule.forChild(routesConfig);