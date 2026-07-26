import { Component } from '@angular/core';
import { Hero } from './components/hero/hero';
import { Contact } from './components/contact/contact';

@Component({
    selector: 'app-home',
    imports: [Hero, Contact],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {}
