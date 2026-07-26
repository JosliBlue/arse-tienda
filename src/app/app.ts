import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@src/app/shared/components/header/header';
import { Footer } from '@src/app/shared/components/footer/footer';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header, Footer],
    templateUrl: './app.html',
})
export class App {}
