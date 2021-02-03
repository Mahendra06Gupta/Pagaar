import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressButtonsModule } from 'mat-progress-buttons';

import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ListLoaderComponent } from './components/list-loader/list-loader.component';
import { ActionModalComponent } from './components/action-modal/action-modal.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { DashboardSearchFormComponent } from '@app/dashboard/components/dashboard-search-form/dashboard-search-form.component';
import { HasPermissionDirective } from './directives/has-permission.directive';
import { GlobalSpinnerComponent } from './components/spinner/global-spinner.component';
import { GlobalSpinnerButtonComponent } from './components/spinner-button/global-spinner-button.component';
import { NumberRoundPipe } from './pipe/number-round.pipe';
import * as fromPopUpscomponent from './popups';

const angularMaterialModules = [
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatExpansionModule,
    MatSortModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatRadioModule,
    MatSidenavModule,
    MatRippleModule,
    MatListModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressButtonsModule
];

@NgModule({
    declarations: [
        FooterComponent,
        LoaderComponent,
        ListLoaderComponent,
        ActionModalComponent,
        DialogComponent,
        PageTitleComponent,
        DashboardSearchFormComponent,
        GlobalSpinnerComponent,
        GlobalSpinnerButtonComponent,
        fromPopUpscomponent.popUps,
        HasPermissionDirective,
        NumberRoundPipe
    ],
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        angularMaterialModules,
        FlexLayoutModule
    ],
    providers: [
    ],
    exports: [
        RouterModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        angularMaterialModules,
        FooterComponent,
        LoaderComponent,
        ListLoaderComponent,
        ActionModalComponent,
        PageTitleComponent,
        DashboardSearchFormComponent,
        HasPermissionDirective,
        GlobalSpinnerComponent,
        GlobalSpinnerButtonComponent,
        fromPopUpscomponent.popUps,
        NumberRoundPipe
    ],
    entryComponents: [
        DialogComponent,
        ActionModalComponent,
        DashboardSearchFormComponent,
    ]
})
export class SharedAppModule {
}
