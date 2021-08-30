import {Component, NgModule} from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <footer>
            <div class="footer-info">Loading Completed <span class="i-question"></span></div>
        </footer>
    `,
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent {

}

@NgModule({
    declarations: [FooterComponent],
    exports: [FooterComponent]
})
export class FooterModule {
}
