import { NgModule, Component, ViewChild, AfterViewInit } from '@angular/core';
import 'devextreme/data/odata/store';
import { DxFormComponent } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import { sha1 } from 'object-hash';
import { confirm } from 'devextreme/ui/dialog';
import { CodeManagerService } from './codemanager.service';
import { alert } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';

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
  styleUrls: [ './codemanager.component.scss' ],
  providers: [
    CodeManagerService
  ]
})

export class CodeManagerComponent implements AfterViewInit {
  // 검색 영역 form
  groupSearchForm: GroupSearchForm;
  // 검색 input 설정 정보
  showColon: boolean;
  minColWidth: number;
  colCount: number;
  colCountByScreen: any;

  // 그룹 코드 그리드에서 포커 변경 시 변경되는 key
  focusedGroupCodeRowKey: any;
  // 그룹 코드 리스트 데이터
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

  // 선택 된 그룹코드 데이터
  currentGroupCode: GroupCodeForm | null = null;

  // 그룹코드 에디팅 form
  groupCodeForm: GroupCodeForm;
  // 그룹코드 검증 여부를 알기 위함 (검증은 처음 등록 할때만 가능하다.)
  groupCodeFormIsInsert = false;
  // 그룹코드 등록 영역의 job combobox
  jobCodeList: any = [];
  // 그룹코드 등록 영역의 delete yn
  ynList = [
    'Y',
    'N'
  ];

  // 하위 코드 리스트 선택된 아이템 리스트들
  selectedItemKeys: any[] = [];
  // 하위 코드 리스트 데이터
  codeList: ArrayStore;
  // 에디터블 그리드에서 컬럼의 옵션 (delete yn)
  editorOptions: any;
  // delete yn
  statuses: any[] = [
    {
      id: 'Y', name: 'Y'
    },
    {
      id: 'N', name: 'N'
    }
  ];

  // popup 관련설정들
  popupVisible = false;
  emailButtonOptions: any;
  closeButtonOptions: any;
  positionOf: string;

  constructor(
    private codeManagerService: CodeManagerService
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

    this.positionOf = '#compareButton';

    // popup test
    this.emailButtonOptions = {
      icon: 'email',
      text: 'Send',
      onClick: (e: any) => {
        const message = `Test`;
        notify({
              message: message,
              position: {
                  my: 'center top',
                  at: 'center top'
              }
        }, 'success', 3000);
      }
    };
    this.closeButtonOptions = {
        text: 'Close',
        onClick: (e: any) => {
            this.popupVisible = false;
        }
    };
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
        location: 'after',
        template: 'deleteButton'
    });
  }

  onSubmitHandler(event: Event) {
    if (this.groupSearchForm.cmnGrpCd.trim() === '') {
      alert('Please enter the group code.', 'Warning');
      return;
    }
    console.log('onSubmitHandler : ', this.groupSearchForm);
  }

  onInputResetHandler(event: Event) {
    this.groupSearchForm.cmnGrpCd = '';
    console.log('onInputResetHandler : ');
  }

  onFocusedRowChangingHandler(e: any) {
    const rowsCount = e.component.getVisibleRows().length,
        pageCount = e.component.pageCount(),
        pageIndex = e.component.pageIndex(),
        key = e.event && e.event.key;

    if(key && e.prevRowIndex === e.newRowIndex) {
        if(e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
            e.component.pageIndex(pageIndex + 1).done(function() {
                e.component.option('focusedRowIndex', 0);
            });
        } else if(e.newRowIndex === 0 && pageIndex > 0) {
            e.component.pageIndex(pageIndex - 1).done(function() {
                e.component.option('focusedRowIndex', rowsCount - 1);
            });
        }
    }

    // if(e.prevRowIndex !== e.newRowIndex) {
    //   if (sha1(this.groupCodeForm) !== sha1(this.groupCodeList[e.prevRowIndex])) {
    //     const result: any = confirm('Are you sure?', 'Confirm changes');
    //     result.done((dialogResult: any) => {
    //       const currentCode = 'test01';
    //       console.log('currentCode : ', currentCode);
    //       setTimeout(() => {
    //         this.focusedGroupCodeRowKey = currentCode;
    //         e.component.pageIndex(pageIndex - 1).done(() => {
    //             e.component.option('focusedRowIndex', dialogResult ? e.newRowIndex : e.prevRowIndex);
    //         });
    //       }, 300);
    //     });
    //   }
    // }

    console.log('onFocusedRowChangingHandler : ', key, e.prevRowIndex, e.newRowIndex);
  }

  onFocusedRowChangedHandler(event: any) {
    if (this.currentGroupCode) {
      if (sha1(this.currentGroupCode) !== sha1(this.groupCodeForm)) {
        console.log('change : ', this.currentGroupCode, this.groupCodeForm);
        const result: any = confirm('Are you sure?', 'Confirm');
        result.done((dialogResult: any) => {
          const currentCode = 'test01';
          console.log('currentCode : ', currentCode);
          setTimeout(() => {
            this.focusedGroupCodeRowKey = currentCode;
          }, 300);
          // alert(dialogResult ? 'Confirmed' : 'Canceled');
        });
      }
    }
    this.currentGroupCode = event.row.data;
    this.groupCodeForm = {...event.row.data};
    console.log('onFocusedRowChangedHandler : ', event, this.focusedGroupCodeRowKey);
  }

  onNewRegisterHandler(event: Event) {
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

  onSubmitByGroupCodeHandler(event: Event) {
    const result: any = confirm('Would you like to register?', 'Confirm');
    result.done((dialogResult: any) => {
      if (dialogResult) {

      }
    });
    console.log('onSubmitHandler : ', this.groupCodeForm);
  }

  onDeleteByGroupCodeHandler(event: Event) {
    const result: any = confirm('Would you like to Delete?', 'Confirm');
    result.done((dialogResult: any) => {
      if (dialogResult) {

      }
    });
    console.log('onSubmitHandler : ', this.groupCodeForm);
  }

  detailsButtonMouseEnter() {
    this.positionOf = `#compareButton`;
  }

  onVerificationHandler(event: Event) {
    // this.popupVisible = true;
  }
}
