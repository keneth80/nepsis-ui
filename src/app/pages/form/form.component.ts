import { NgModule, Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxRadioGroupComponent } from 'devextreme-angular';
import data from 'devextreme/data/array_store';
import { Service, Task } from '../../shared/services/radio.service';

@Component({
  providers: [Service],
  templateUrl: 'form.component.html',
  styleUrls: [ './form.component.scss' ]
})

export class FormComponent {
  // @ViewChild('eventRadioGroup') eventRadioGroup: DxRadioGroupComponent;

  priorities: string[];
  priority: string;
  tasks: Task[];
  data: any;
  currentData: string[] = [];

  employee: any;
  labelLocation: string;
  readOnly: boolean;
  colCountByScreen: object;
  showColon: boolean;
  minColWidth: number;
  colCount: number;
  width: any;

  constructor(
    service:Service
  ) {
    this.tasks = service.getTasks();
    this.priorities = [
      'Low',
      'Normal',
      'Urgent',
      'High'
    ];
    this.priority = this.priorities[2];
    this.currentData[0] = this.tasks[1].subject;
    this.labelLocation = 'top';
    this.readOnly = false;
    this.showColon = false;
    this.minColWidth = 300;
    this.colCount = 2;
    this.employee = {
      ID: 7,
      FirstName: 'Sandra',
      LastName: 'Johnson',
      Prefix: 'Mrs.',
      Position: 'Controller',
      Picture: 'images/employees/06.png',
      BirthDate: new Date('1974/11/15'),
      HireDate: new Date('2005/05/11'),
      /* tslint:disable-next-line:max-line-length */
      Notes: 'Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you`ve not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.',
      Address: '4600 N Virginia Rd.'
    };
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }
  ngOnInit() {
    this.data = new data({
      data: this.tasks,
      key: 'ID'
    });
  }
  ngAfterViewInit(){
    // this.eventRadioGroup.instance.option('value', this.priorities[0]);
  }

  onValueChanged($event: any){
    this.currentData = [];

    this.tasks.forEach((item, index) => {
      if(item.priority == $event.value) {
        this.currentData.push(this.tasks[index].subject);
      }
    });
  }
}
