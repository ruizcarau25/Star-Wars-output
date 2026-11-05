import { Routes } from '@angular/router';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { NotFoundPage } from './pages/not-found-page/not-found-page';

export const routes: Routes = [
    {path: 'people', component: PeopleListComponent},
    {path: '', pathMatch: 'full', redirectTo: '/people'},
    {path: '**', component: NotFoundPage}
];
