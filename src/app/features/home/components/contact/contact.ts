import { Component } from '@angular/core';
import { Info } from './info.interface';

@Component({
    selector: 'app-contact',
    imports: [],
    templateUrl: './contact.html',
    styles: ``,
})
export class Contact {
    infos: Info[] = [
        {
            id: 0,
            title: 'Ubicación',
            icon: 'icon-[tabler--map-pin]',
            subtitle: 'Av Bolivariana y marchena',
            subsubtitle: 'A media cuadra de la casa del freno',
        },
        { id: 1, title: 'Contacto', icon: 'icon-[ic--outline-whatsapp]', subtitle: '0993239185' },
        {
            id: 2,
            title: 'Redes Sociales',
            icon: 'icon-[ic--baseline-share]',
            subtitle: 'ArseAccesorios',
            subsubtitle: 'En facebook e Instagram',
        },
        {
            id: 3,
            title: 'Horarios',
            icon: 'icon-[mdi--clock-outline]',
            subtitle: 'Lun-Vie: 7am - 5pm',
            subsubtitle: 'Hacemos entregas en punto medio',
        },
    ];
}
