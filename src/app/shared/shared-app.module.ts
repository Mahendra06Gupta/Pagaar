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

import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ListLoaderComponent } from './components/list-loader/list-loader.component';
import { ActionModalComponent } from './components/action-modal/action-modal.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { BookingListTabComponent } from './components/booking-list-tab/booking-list-tab.component';
import { BookingListExpandableTabComponent } from './components/booking-list-expandable-tab/booking-list-expandable-tab.component';
import { BookingListExpandableTabEntryComponent } from './components/booking-list-expandable-tab/booking-list-expandable-tab-entry.component';
import { ConferenceFormComponent } from '@app/dashboard/components/conference/components/conference-form/conference-form.component';
import { DashboardSearchFormComponent } from '@app/dashboard/components/dashboard-search-form/dashboard-search-form.component';
import { HasPermissionDirective } from './directives/has-permission.directive';


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
    MatDialogModule
];

@NgModule({
    declarations: [
        FooterComponent,
        LoaderComponent,
        ListLoaderComponent,
        ActionModalComponent,
        DialogComponent,
        PageTitleComponent,
        BookingListTabComponent,
        BookingListExpandableTabComponent,
        BookingListExpandableTabEntryComponent,
        DashboardSearchFormComponent,
        ConferenceFormComponent,
        HasPermissionDirective
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
        BookingListTabComponent,
        BookingListExpandableTabComponent,
        BookingListExpandableTabEntryComponent,
        DashboardSearchFormComponent,
        ConferenceFormComponent,
        HasPermissionDirective
    ],
    entryComponents: [
        DialogComponent,
        ActionModalComponent,
        DashboardSearchFormComponent,
        ConferenceFormComponent
    ]
})
export class SharedAppModule {
}
