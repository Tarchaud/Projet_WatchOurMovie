// film-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-film-modal',
    templateUrl: './film-modal.component.html',
    styleUrls: ['./film-modal.component.scss']
})
export class FilmModalComponent {
    @Input() film: any; // reçoit le film à afficher
    @Output() close = new EventEmitter<void>(); // émetteur pour fermer le modal
    @Output() like = new EventEmitter<void>(); // émetteur pour aimer le film

    constructor() { }
}
