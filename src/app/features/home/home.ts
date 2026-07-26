import { Component } from '@angular/core';
import { Hero } from '@src/app/features/home/components/hero/hero';
import { Contact } from '@src/app/features/home/components/contact/contact';

@Component({
    selector: 'app-home',
    imports: [Hero, Contact],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {}
