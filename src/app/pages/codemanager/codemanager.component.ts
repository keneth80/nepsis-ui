import { NgModule, Component, ViewChild, enableProdMode, AfterViewInit } from '@angular/core';
import { Employee, Service } from '../../shared/services/app.codemanager';
import 'devextreme/data/odata/store';
import { DxFormComponent } from 'devextreme-angular';


if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}


@Component({
  providers: [Service],
  templateUrl: 'codemanager.component.html',
  styleUrls: [ './codemanager.component.scss' ]
})

export class CodeManagerComponent implements AfterViewInit {
  // @ViewChild(DxFormComponent, { static: false }) myform: DxFormComponent;
  employee: Employee;
  positions: string[];
  rules: Object;
  colCountByScreen: object;
  showColon: boolean;
  minColWidth: number;
  colCount: number;
  valueChangeEvents: any[] = [];
  value: string = '';
  priorities: string[];
  priority: string;
  data: any;
  currentData: string[] = [];

  constructor(
    service: Service
  ) {
    this.employee = service.getEmployee();
    this.positions = service.getPositions();
    this.rules = { 'X': /[02-9]/ };
    this.showColon = false;
    this.minColWidth = 300;
    this.colCount = 2;
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
    this.priorities = [
      'Y',
      'N'
    ];
    this.priority = this.priorities[2];
  }

  ngAfterViewInit() {
    // this.myform.instance.validate()
  }
}
