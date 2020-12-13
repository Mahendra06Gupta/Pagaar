import {
  Component, OnInit, OnDestroy, Inject, ViewChild, ComponentFactoryResolver, ViewContainerRef,
  ComponentRef, ViewEncapsulation
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit, OnDestroy {
  @ViewChild('target', { read: ViewContainerRef, static: true }) public vcRef: ViewContainerRef;
  public componentRef: ComponentRef<any>;
  public contentClass: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogComponent>,
    private resolver: ComponentFactoryResolver,
  ) { }

  public ngOnInit(): void {
    const componentFactory = this.resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.vcRef.createComponent(componentFactory);
    this.componentRef.instance.inputArgs = this.data.inputArgs;
    this.contentClass = (this.data.inputArgs && this.data.inputArgs.contentClass)
      ? this.data.inputArgs.contentClass
      : '';
    this.componentRef.instance.contentClass = this.contentClass;
    this.componentRef.instance.closeModal = (result: any) => {
      return this.dialogRef.close(result);
    };
  }

  public ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

}
