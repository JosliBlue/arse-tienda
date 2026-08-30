import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
    selector: 'app-header',
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './header.html',
    styles: ``,
})
export class Header implements OnInit {
    title = signal('ARSE');
    isHomeRoute = signal(true);

    private readonly router = inject(Router);

    ngOnInit(): void {
        this.updateRouteState(this.router.url);

        this.router.events
            .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
            .subscribe((event) => {
                this.updateRouteState(event.urlAfterRedirects);
            });
    }

    private updateRouteState(url: string): void {
        this.isHomeRoute.set(url === '/' || url === '');
    }
}
