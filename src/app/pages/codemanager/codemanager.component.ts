import { NgModule, Component, ViewChild, AfterViewInit } from '@angular/core';
import 'devextreme/data/odata/store';
import { DxFormComponent } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';

type GroupSearchForm = {
  cmnGrpCd: string;
}

type CodeForm = {
  cmnGrpCd: string;
  cmnCd: string;
  cmnCdNm: string;
  srtOdr: number;
  useYn: string;
  rmk: string;
  type: string;
}

type GroupCodeForm = {
  cmnGrpCd: string;
  cmnGrpCdNm: string;
  cdDesc: string;
  useYn: string;
  type: string;
  codeList: CodeForm[];
}

@Component({
  templateUrl: 'codemanager.component.html',
  styleUrls: [ './codemanager.component.scss' ]
})

export class CodeManagerComponent implements AfterViewInit {
  groupSearchForm: GroupSearchForm;
  groupCodeForm: GroupCodeForm;
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

  gridPriority: any[];

  groupCodeList: any[] = [];

  selectedItemKeys: any[] = [];

  dataSource: ArrayStore;

  constructor(
    
  ) {
    this.groupSearchForm = {
      cmnGrpCd: ''
    };

    this.groupCodeForm = {
      cmnGrpCd: 'CUST_TYPE_CD',
      cmnGrpCdNm: '',
      cdDesc: '',
      useYn: 'Y',
      type: 'insert',
      codeList: []
    };

    this.dataSource = new ArrayStore({
      key: 'cmnCd',
      data: []
  });

    this.gridPriority = [
      { name: 'High', value: 4 },
      { name: 'Urgent', value: 3 },
      { name: 'Normal', value: 2 },
      { name: 'Low', value: 1 }
    ];

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

  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }

  deleteRecords() {
    // this.selectedItemKeys.forEach((key) => {
    //     this.dataSource.remove(key);
    // });
    // this.dataGrid.instance.refresh();
  }

  onToolbarPreparing(e: any) {
    e.toolbarOptions.items[0].showText = 'always';

    e.toolbarOptions.items.push({
        location: "after",
        template: "deleteButton"
    });
  }

  onSubmitHandler(event: Event) {
    console.log('onSubmitHandler : ', this.groupSearchForm);
  }

  onInputResetHandler(event: Event) {
    this.groupSearchForm.cmnGrpCd = '';
    console.log('onInputResetHandler : ');
  }

  onSubmitBuGroupCodeHandler(event: Event) {
    console.log('onSubmitHandler : ', this.groupCodeForm);
  }
}
