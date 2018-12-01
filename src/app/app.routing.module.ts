/**
 * copyright by Marszałkiewicz Konrad http://pixelhe.art/ 2018
 */
import { RouterModule, Routes } from "@angular/router";

const routesConfig: Routes = [
  { path: "", redirectTo: "user", pathMatch: "full" },
  { path: "**", redirectTo: "user", pathMatch: "full" }
];

export const AppRoutingModule = RouterModule.forRoot(routesConfig, {});
