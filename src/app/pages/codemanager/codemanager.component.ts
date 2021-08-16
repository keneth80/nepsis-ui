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
  cmnCdDesc: string;
  srtOdr: number;
  useYn: string;
  rmk: string;
  type: string;
}

type GroupCodeForm = {
  cmnGrpCd: string;
  cmnGrpCdNm: string;
  cmnCdStep: number;
  cmnCdDesc: string;
  cmnCdJobCode: string;
  cmnHrkCode: string;
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
  showColon: boolean;
  minColWidth: number;
  colCount: number;
  colCountByScreen: any;

  groupCodeList: any[] = [
    {
      cmnGrpCd: 'test01',
      cmnGrpCdNm: 'test01',
      cmnCdStep: 1,
      cmnCdDesc: 'test',
      cmnCdJobCode: '01',
      cmnHrkCode: '0001',
      useYn: 'Y',
      type: 'update',
    },
    {
      cmnGrpCd: 'test02',
      cmnGrpCdNm: 'test02',
      cmnCdStep: 1,
      cmnCdDesc: 'test2',
      cmnCdJobCode: '02',
      cmnHrkCode: '0002',
      useYn: 'Y',
      type: 'update',
    }
  ];

  groupCodeForm: GroupCodeForm;

  selectedItemKeys: any[] = [];

  codeList: ArrayStore;
  editorOptions: any;

  ynList = [
    'Y',
    'N'
  ];

  jobCodeList: any = [];

  statuses: any[] = [];

  constructor(
    
  ) {
    this.showColon = false;
    this.minColWidth = 300;
    this.colCount = 2;
    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
    this.groupSearchForm = {
      cmnGrpCd: ''
    };

    this.groupCodeForm = {
      cmnGrpCd: '',
      cmnGrpCdNm: '',
      cmnCdStep: 1,
      cmnCdDesc: '',
      cmnCdJobCode: '',
      cmnHrkCode: '',
      useYn: 'Y',
      type: 'insert',
      codeList: []
    };

    this.codeList = new ArrayStore({
      key: 'cmnCd',
      data: [
        {
          cmnGrpCd: 'test01',
          cmnCd: 'test02',
          cmnCdNm: 'test',
          cmnCdDesc: 'test',
          srtOdr: 1,
          useYn: 'Y',
          rmk: 'insert',
          type: '',
        }
      ]
    });

    this.editorOptions = {
      itemTemplate: 'ynTemplete'
    };

    this.statuses = [
      {
        id: 'Y', name: 'Y'
      },
      {
        id: 'N', name: 'N'
      }
    ];
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

  onFocusedRowChangedHandler(event: any) {
    this.groupCodeForm = event.row.data;
    console.log('onFocusedRowChangedHandler : ', this.groupCodeForm);
  }

  onRegisterHandler(event: Event) {
    this.groupCodeForm = {
      cmnGrpCd: '',
      cmnGrpCdNm: '',
      cmnCdStep: 1,
      cmnCdDesc: '',
      cmnCdJobCode: '',
      cmnHrkCode: '',
      useYn: 'Y',
      type: 'insert',
      codeList: []
    };

    this.codeList = new ArrayStore({
      key: 'cmnCd',
      data: []
    });
    console.log('onRegisterHandler : ');
  }

  onSubmitBuGroupCodeHandler(event: Event) {
    console.log('onSubmitHandler : ', this.groupCodeForm);
  }
}
