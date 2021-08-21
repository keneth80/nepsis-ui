import { NgModule, Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import 'devextreme/data/odata/store';
import { DxFormComponent } from 'devextreme-angular';
import ArrayStore from 'devextreme/data/array_store';
import { sha1 } from 'object-hash';
import { confirm } from 'devextreme/ui/dialog';
import { alert } from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';
import DataGrid from "devextreme/ui/data_grid";

import { CodeManagerService } from './codemanager.service';
import { BaseComponent } from '../../shared/components/base.component';
import { GroupCodeModel, CodeModel } from '../../shared/models/group-code-model';
import { ListCode } from '../../shared/models/common-code';
import { GlobalVariableService } from '../../shared/services/app/global-variable.service';
import { JOB_ST_CD } from '../../shared/const';
import { GroupCodeParam, CodeParam } from '../../shared/backend/params/group-code-param';
import { delayExcute } from '../../shared/utils';

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
  cmnCdStep: string;
  cdDesc: string;
  jobStCd: string;
  useYn: string;
  type: string;
}

@Component({
  templateUrl: 'codemanager.component.html',
  styleUrls: [ './codemanager.component.scss' ],
  providers: [
    CodeManagerService
  ]
})

export class CodeManagerComponent extends BaseComponent implements OnInit, AfterViewInit {
  // 검색 영역 form
  groupSearchForm: GroupSearchForm;
  // 검색 input 설정 정보
  showColon: boolean;
  minColWidth: number;
  colCount: number;
  colCountByScreen: any;
  // 검색 영역의 엔터키 이벤트를 위한 옵션
  groupCodeSearchInputOptions: any;

  // 그룹 코드 그리드에서 포커 변경 시 변경되는 key
  focusedGroupCodeRowKey: any;
  // 그룹 코드 리스트 데이터
  groupCodeList: GroupCodeModel[] = [];

  // 선택 된 그룹코드 데이터
  currentGroupCode: GroupCodeModel;

  // 그룹코드 에디팅 form
  groupCodeForm: GroupCodeParam;
  // 그룹코드 disabled 처리위한 변수
  isGroupCodeDisabled = true;
  // 그룹코드 검증 여부를 알기 위함 (검증은 처음 등록 할때만 가능하다.)
  groupCodeFormIsInsert = false;
  // 그룹코드 등록 영역의 job combobox
  jobCodeList: ListCode[] = [];
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
      id: 'Y', label: 'Y'
    },
    {
      id: 'N', label: 'N'
    }
  ];

  // popup 관련설정들
  popupVisible = false;
  emailButtonOptions: any;
  closeButtonOptions: any;
  positionOf: string;

  // test job code
  jobCd = 'J0001';

  private isValid = false;

  private codeListGridInstance: DataGrid;

  private originCodeList: CodeModel[] = [];

  private deleteCodeList: CodeModel[] = [];

  private isBack = false;

  constructor(
    private globalVariableService: GlobalVariableService,
    private codeManagerService: CodeManagerService
  ) {
    super();
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
      cmnGrpCd: 'TEST03_GRP_CD'
    };
    this.groupCodeSearchInputOptions = {
      onEnterKey: (e: any) => {
        this.onSearchSubmitHandler(e);
      }
    }

    this.groupCodeForm = {
      cmnGrpCd: '',
      cmnGrpCdNm: '',
      cdDesc: '',
      jobStCd: '',
      useYn: 'Y',
      type: 'insert',
      codeList: []
    };

    this.codeList = new ArrayStore({
      key: 'cmnCd',
      data: []
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

  ngOnInit() {
    this.subscription = this.codeManagerService.$jobCodeList.subscribe((jobCodeList: ListCode[]) => {
      this.globalVariableService.commonCode[JOB_ST_CD] = jobCodeList;
      this.jobCodeList = this.globalVariableService.commonCode[JOB_ST_CD];

      this.codeManagerService.retrieveGroupCodeList(this.groupSearchForm.cmnGrpCd.trim());
    });

    this.subscription = this.codeManagerService.$groupCodeList.subscribe((groupCodeList: GroupCodeModel[]) => {
      this.groupCodeList = groupCodeList;
      if (groupCodeList.length) {
        this.codeManagerService.retrieveCodeListByGroupCode(groupCodeList[0].code);
      }
    });

    this.subscription = this.codeManagerService.$codeListByGroupCode.subscribe((codeList: CodeModel[]) => {
      this.codeList = new ArrayStore({
        key: 'cmnCd',
        data: codeList
      });
      this.originCodeList = [...codeList];
    });

    this.subscription = this.codeManagerService.$validateGroupCode.subscribe((validate: boolean) => {
      this.isValid = validate;
      alert(this.isValid ? '검증이 완료되었습니다.' : '다른 코드를 입력해주세요.', '확인');
    });

    this.subscription = this.codeManagerService.$success.subscribe((type: string) => {
      const message = type === 'insert' ? '등록되었습니다' :
        type === 'update' ? '수정되었습니다' : '삭제되었습니다';

      notify({
        message: message,
        position: {
            my: 'center top',
            at: 'center top'
        }
      }, 'success', 2000);

      if (type === 'insert' || type === 'update') {
        this.groupSearchForm.cmnGrpCd = this.groupCodeForm.cmnGrpCd;
      } else {
        this.groupSearchForm.cmnGrpCd = '';
      }
      this.codeManagerService.retrieveGroupCodeList(this.groupSearchForm.cmnGrpCd.trim());
    })

    this.codeManagerService.retrieveJobCodeList(JOB_ST_CD);
  }

  ngAfterViewInit() {
    // this.myform.instance.validate()
  }

  selectionChanged(data: any) {
    this.selectedItemKeys = data.selectedRowKeys;
  }

  onRowRemoved(event: any) {
    this.deleteCodeList.push({
      cmnCd: event.data.cmnCd,
      cmnCdNm: event.data.cmnCdNm,
      cmnGrpCd: event.data.cmnGrpCd,
      srtOdr: event.data.srtOdr,
      useYn: event.data.useYn,
      type: 'delete'
    });
  }

  saveGridInstance (e: any) {
    this.codeListGridInstance = e.component;
  }

  deleteRecords() {
    const result: any = confirm('삭제하시겠습니까?', '확인');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.selectedItemKeys.forEach((key) => {
            this.codeList.remove(key);
        });
        for (const codeModel of this.originCodeList) {
          if (this.selectedItemKeys.includes(codeModel.cmnCd)) {
            this.deleteCodeList.push({
              ...codeModel,
              type: 'delete'
            });
          }
        }
        this.codeListGridInstance.refresh();
      }
    });
  }

  onToolbarPreparing(e: any) {
    e.toolbarOptions.items[0].showText = 'always';

    e.toolbarOptions.items.push({
      location: 'after',
      template: 'deleteButton',
    });
  }

  onSearchSubmitHandler(event: Event) {
    this.codeManagerService.retrieveGroupCodeList(this.groupSearchForm.cmnGrpCd.trim());
  }

  onInputResetHandler(event: Event) {
    this.groupSearchForm.cmnGrpCd = '';
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
  }

  onFocusedRowChangedHandler(event: any) {
    delayExcute(100, () => {
      if (!this.isBack && this.currentGroupCode) {
        // TODO: 하위 코드 리스트를 체크 추가
        if (this.codeManagerService.isChangeValue(this.currentGroupCode, this.groupCodeForm)) {
          console.log('change : ', this.currentGroupCode, this.groupCodeForm);
          const result: any = confirm('수정중인 데이터가 있습니다. 작업을 취소하시겠습니까?', 'Confirm');
          result.done((dialogResult: any) => {
            if (!dialogResult) {
              this.isBack = true;
              this.focusedGroupCodeRowKey = this.groupCodeForm.cmnGrpCd;
            } else {
              this.isBack = false;
              this.setFormSetting(event);
              console.log('onFocusedRowChangedHandler3 : ', event, this.focusedGroupCodeRowKey);
            }
          });
        } else {
          this.isBack = false;
          this.setFormSetting(event);
          console.log('onFocusedRowChangedHandler2 : ', event, this.focusedGroupCodeRowKey);
        }
      } else {
        if (!this.isBack) {
          this.setFormSetting(event);
          console.log('onFocusedRowChangedHandler1 : ', event, this.focusedGroupCodeRowKey);
        }
        this.isBack = false;
        
      }
    });
  }

  onChangeGroupCode(event: any) {
    console.log('onGroupCodeChange : ', event, this.groupCodeForm.cmnGrpCd);
  }

  onChangeJobCode(event: ListCode) {
    this.jobCd = event.id;
    this.groupCodeForm.jobStCd = this.jobCd;
  }

  onNewRegisterHandler(event: Event) {
    this.isValid = false;
    this.isGroupCodeDisabled = false;
    this.groupCodeForm = {
      cmnGrpCd: '',
      cmnGrpCdNm: '',
      cdDesc: '',
      jobStCd: '',
      useYn: 'Y',
      type: 'insert',
      codeList: []
    };

    this.codeList = new ArrayStore({
      key: 'cmnCd',
      data: []
    });

    this.deleteCodeList.length = 0;
  }

  onSubmitByGroupCodeHandler(event: Event) {
    const resultCodeList: CodeParam[] = this.codeListGridInstance.getDataSource().items().map((code: CodeModel) => {
      code.cmnGrpCd = this.groupCodeForm.cmnGrpCd;
      if (this.groupCodeForm.type === 'insert') {
        code.type = this.groupCodeForm.type;
      } else {
        code.type = code.isServer ? 'update' : 'insert';
      }
      return code as CodeParam;
    });
    // const resultCodeList: CodeParam[] = (this.codeList as any)._array.map((code: CodeModel) => {
    //   code.cmnGrpCd = this.groupCodeForm.cmnGrpCd;
    //   if (this.groupCodeForm.type === 'insert') {
    //     code.type = this.groupCodeForm.type;
    //   } else {
    //     code.type = code.isServer ? 'update' : 'insert';
    //   }
    //   return code;
    // });

    for (const delItem of this.deleteCodeList) {
      resultCodeList.push(delItem as CodeParam);
    }

    const param: GroupCodeParam = {
      cmnGrpCd: this.groupCodeForm.cmnGrpCd,
      cmnGrpCdNm: this.groupCodeForm.cmnGrpCdNm,
      jobStCd: this.groupCodeForm.jobStCd,
      cdDesc: this.groupCodeForm.cdDesc,
      useYn : this.groupCodeForm.useYn,
      type: this.groupCodeForm.type,
      codeList: resultCodeList
    };

    const formCheckMessage = this.codeManagerService.validationGroupParam(param)
    if (formCheckMessage !== '') {
      alert(formCheckMessage, '경고');
      return;
    }

    const result: any = confirm(!this.isGroupCodeDisabled ? '등록하시겠습니까?' : '수정하시겠습니까?', '확인');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        // update
        if (this.isGroupCodeDisabled) {
          this.codeManagerService.updateGroupCode(param);
        } else {
          // insert
          if (!this.isValid) {
            alert('검증을 실행해주세요.', '경고');
            return;
          }
          this.codeManagerService.insertGroupCode(param);
        }
      }
    });

    console.log('onSubmitByGroupCodeHandler : ', this.groupCodeForm, this.codeListGridInstance.getDataSource().items());
  }

  onDeleteByGroupCodeHandler(event: Event) {
    // const result: any = confirm('Would you like to Delete?', 'Confirm');
    const result: any = confirm('삭제하시겠습니까?', '확인');
    result.done((dialogResult: any) => {
      if (dialogResult) {
        this.codeManagerService.deleteGroupCode(this.groupCodeForm.cmnGrpCd);
      }
    });
    console.log('onSubmitHandler : ', this.groupCodeForm);
  }

  detailsButtonMouseEnter() {
    this.positionOf = `#compareButton`;
  }

  onVerificationHandler(event: Event) {
    this.codeManagerService.validateGroupCode(this.groupCodeForm.cmnGrpCd);
  }

  private setFormSetting(event: any) {
    this.deleteCodeList.length = 0;
    const targetData: GroupCodeModel = event.row.data;

    this.isGroupCodeDisabled = true;

    this.groupCodeForm = {
      cmnGrpCd: targetData.code,
      cmnGrpCdNm: targetData.codeName,
      cdDesc: targetData.codeDescription,
      jobStCd: targetData.jobCode,
      useYn: targetData.useYn,
      type: 'update',
      codeList: []
    };

    this.currentGroupCode = {...event.row.data};
    this.codeManagerService.retrieveCodeListByGroupCode(event.row.data.code);
  }
}
