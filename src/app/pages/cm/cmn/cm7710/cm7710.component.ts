import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
import 'devextreme/data/odata/store';
import ArrayStore from 'devextreme/data/array_store';
import {alert, confirm} from 'devextreme/ui/dialog';
import notify from 'devextreme/ui/notify';

import {contentSize, delayExcute} from '../../../../shared/utils';
import {BaseComponent} from '../../../../shared/components/base.component';
import {GlobalVariableService} from '../../../../shared/services/app/global-variable.service';

import {Cm7710Service} from './cm7710.service';
import {CodeModel, GroupCodeModel} from '../../../../shared/models/group-code-model';
import {ListCode} from '../../../../shared/models/common-code';
import {JOB_ST_CD} from '../../../../shared/const';
import {CodeParam, GroupCodeParam} from '../../../../shared/backend/params/group-code-param';

type GroupSearchForm = {
    cmnGrpCd: string;
}

/**
 * 공통코드 (그룹코드, 코드) : 그룹코드 관리 및 그룹코드에 속한 코드의 정보를 관리한다.
 *
 * @author 강효선
 * @version 1.0
 * @see <pre>
 * --------------------------------------------------
 * 2021.08.06  강효선  최초생성
 * --------------------------------------------------
 * </pre>
 * @since 2021.08.06
 */
@Component({
    templateUrl: 'cm7710.component.html',
    styleUrls: ['./cm7710.component.scss'],
    providers: [
        Cm7710Service
    ]
})
export class Cm7710Component extends BaseComponent implements OnInit, AfterViewInit {
    // 검색 영역 form
    groupSearchForm: GroupSearchForm;
    // 검색 input 설정 정보
    minColWidth: number = 300;
    // 검색 영역의 엔터키 이벤트를 위한 옵션
    groupCodeSearchInputOptions: any;

    // 그룹 코드 그리드에서 포커 변경 시 변경되는 key
    focusedGroupCodeRowKey: any;
    // 그룹 코드 리스트 데이터
    groupCodeList: ArrayStore;

    // 선택 된 그룹코드 데이터
    currentGroupCode: any;
    originCurrentGroupCode: any;

    // 그룹코드 에디팅 form
    groupCodeForm: GroupCodeParam;
    // 그룹코드 disabled 처리위한 변수
    isGroupCodeDisabled = true;
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
    popupVisible = true;
    // popupVisible = true;
    emailButtonOptions: any;
    closeButtonOptions: any;
    positionOf: string = '#compareButton';

    // test job code
    jobCd: string = '';

    // group code grid height
    groupListHeight: number = 242;

    private isValid = false;

    private codeListGridInstance: any;

    private groupCodeListGridInstance: any;

    private originCodeList: CodeModel[] = [];

    private deleteCodeList: CodeModel[] = [];

    private isBack = false;

    /**
     * Constructor
     * @param element
     * @param globalVariableService
     * @param service
     */
    constructor(
        private element: ElementRef,
        private globalVariableService: GlobalVariableService,
        private service: Cm7710Service
    ) {
        super();
        this.groupSearchForm = {
            // cmnGrpCd: 'GRN_CAGO_TY_CD'
            cmnGrpCd: ''
        };
        this.groupCodeSearchInputOptions = {
            onEnterKey: (event: any) => this.onSearchSubmitHandler(event)
        };

        this.groupCodeList = new ArrayStore({
            key: 'code',
            data: []
        });

        this.codeList = new ArrayStore({
            key: 'cmnCd',
            data: []
        });

        this.groupCodeForm = {
            cmnGrpCd: '',
            cmnGrpCdNm: '',
            cdDesc: '',
            jobStCd: '',
            useYn: 'Y',
            type: 'insert',
            codeList: []
        };

        this.editorOptions = {
            itemTemplate: 'ynTemplete'
        };

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

    /**
     * ngOnInit
     */
    ngOnInit() {
        this.subscribe();
        this.service.retrieveJobCodeList(JOB_ST_CD);
    }

    /**
     * ngAfterViewInit
     */
    ngAfterViewInit() {
        this.onResizeGroupList();
    }

    /**
     * 그룹코드 Grid 사이즈 지정
     */
    @HostListener('window:resize')
    public onResizeGroupList(): void {
        const wrapper = contentSize(this.element, 'wrapper');
        const search = contentSize(this.element, 'search');
        const lower = contentSize(this.element, 'lower');
        const bottom = contentSize(this.element, 'bottom');
        const offset = 82;
        const minHeight = 238;
        const height = wrapper.height - (search.height + lower.height + bottom.height + offset);
        this.groupListHeight = minHeight > height ? minHeight : height;
    }

    /**
     * 그룹 코드 Grid Event - onInitialized
     * @param event
     */
    onInitializedGroupCodeGrid(event: any) {
        this.groupCodeListGridInstance = event.component;
    }

    /**
     * 그룹 코드 Grid Event - onRowRemoved
     * @param event
     */
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

    /**
     * 그룹 코드 Grid Event - onToolbarPreparing
     * @param event
     */
    onToolbarPreparing(event: any) {
        event.toolbarOptions.items[0].showText = 'always';
        event.toolbarOptions.items.push({
            location: 'after',
            template: 'deleteButton',
        });
    }

    /**
     * 그룹 코드 조회 버튼 click Event
     * @param event
     */
    onSearchSubmitHandler(event: Event) {
        this.service.retrieveGroupCodeList(this.groupSearchForm.cmnGrpCd.trim());
    }

    /**
     * 그룹 코드 조회 조건 초기화 버튼 click Event
     * @param event
     */
    onInputResetHandler(event: Event) {
        this.groupSearchForm.cmnGrpCd = '';
    }

    /**
     * 그룹 코드 Grid Event - onFocusedRowChangingHandler
     * @param event
     */
    onFocusedRowChangingHandler(event: any) {
        const rowsCount = event.component.getVisibleRows().length,
            pageCount = event.component.pageCount(),
            pageIndex = event.component.pageIndex(),
            key = event.event && event.event.key;

        if (key && event.prevRowIndex === event.newRowIndex) {
            if (event.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
                event.component.pageIndex(pageIndex + 1).done(function () {
                    event.component.option('focusedRowIndex', 0);
                });
            } else if (event.newRowIndex === 0 && pageIndex > 0) {
                event.component.pageIndex(pageIndex - 1).done(function () {
                    event.component.option('focusedRowIndex', rowsCount - 1);
                });
            }
        }
    }

    /**
     * 그룹 코드 Grid Event - onFocusedRowChangedHandler
     * @param event
     */
    onFocusedRowChangedHandler(event: any) {
        delayExcute(100, () => {
            if (!this.isBack && this.currentGroupCode) {
                // TODO: 하위 코드 리스트를 체크 추가
                if (this.service.isChangeValue(this.currentGroupCode, this.groupCodeForm)) {
                    const result: any = confirm('수정중인 데이터가 있습니다. 작업을 취소하시겠습니까?', 'Confirm');
                    result.done((dialogResult: any) => {
                        if (!dialogResult) {
                            this.isBack = true;
                            this.focusedGroupCodeRowKey = this.groupCodeForm.cmnGrpCd;
                        } else {
                            this.isBack = false;
                            this.groupCodeList.update(this.groupCodeForm.cmnGrpCd, {
                                ...this.currentGroupCode
                            });
                            this.setFormSetting(event);
                        }
                    });
                } else {
                    this.isBack = false;
                    this.setFormSetting(event);
                }
            } else {
                if (!this.isBack) {
                    this.setFormSetting(event);
                }
                this.isBack = false;

            }
        });
    }

    /**
     * 그룹코드 Form - 그룹코드 변경 Event
     * @param event
     */
    onChangeGroupCode(event: any) {
        // console.log('onGroupCodeChange : ', event, this.groupCodeForm.cmnGrpCd);
    }

    /**
     * 그룹코드 Form - 그룹코드 검증 버튼 click Event
     * @param event
     */
    onVerificationHandler(event: Event) {
        this.service.validateGroupCode(this.groupCodeForm.cmnGrpCd);
    }

    /**
     * 그룹코드 Form - 그룹코드 명칭 변경 Event
     * @param event
     */
    onChangeGroupName(event: any) {
        if (this.isGroupCodeDisabled) {
            this.groupCodeList.update(this.groupCodeForm.cmnGrpCd, {codeName: this.groupCodeForm.cmnGrpCdNm});
        }
    }

    /**
     * 그룹코드 Form - 그룹코드 설명 변경 Event
     * @param event
     */
    onChangeGroupDesc(event: any) {
        if (this.isGroupCodeDisabled) {
            this.groupCodeList.update(this.groupCodeForm.cmnGrpCd, {codeDescription: this.groupCodeForm.cdDesc});
        }
    }

    /**
     * 그룹코드 Form - 그룹코드 사용여부 변경 Event
     * @param event
     */
    onChangeGroupUseYn(event: any) {
        if (this.isGroupCodeDisabled) {
            this.groupCodeList.update(this.groupCodeForm.cmnGrpCd, {useYn: this.groupCodeForm.useYn});
        }
    }

    /**
     * 그룹코드 Form - 그룹코드 jobcode 변경 Event
     * @param event
     */
    onChangeJobCode(event: ListCode) {
        this.jobCd = event.id;
        this.groupCodeForm.jobStCd = this.jobCd;
        if (this.isGroupCodeDisabled) {
            this.groupCodeList.update(this.groupCodeForm.cmnGrpCd, {jobCode: this.jobCd});
        }
    }

    /**
     * 그룹 코드 Form - 신규 생성 버튼 click Event
     * @param event
     */
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

    /**
     * 상세 코드 Grid Event - onInitialized
     * @param e
     */
    onInitializedCodeGrid(event: any) {
        this.codeListGridInstance = event.component;
    }

    /**
     * 상세 코드 Grid Event - onSelectionChanged
     * @param event
     */
    onSelectionChanged(event: any) {
        this.selectedItemKeys = event.selectedRowKeys;
    }

    /**
     * 상세 코드 Grid 삭제 버튼 Event - deleteRecords
     */
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

    /**
     * 저장 버튼 click Event
     * @param event
     */
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

        this.deleteCodeList.forEach((code: any) => resultCodeList.push(code));
        // for (const delItem of this.deleteCodeList) {
        //   resultCodeList.push(delItem as CodeParam);
        // }

        const param: GroupCodeParam = {
            cmnGrpCd: this.groupCodeForm.cmnGrpCd,
            cmnGrpCdNm: this.groupCodeForm.cmnGrpCdNm,
            jobStCd: this.groupCodeForm.jobStCd,
            cdDesc: this.groupCodeForm.cdDesc,
            useYn: this.groupCodeForm.useYn,
            type: this.groupCodeForm.type,
            codeList: resultCodeList
        };

        const formCheckMessage = this.service.validationGroupParam(param)
        if (formCheckMessage !== '') {
            alert(formCheckMessage, '경고');
            return;
        }

        const result: any = confirm(!this.isGroupCodeDisabled ? '등록하시겠습니까?' : '수정하시겠습니까?', '확인');
        result.done((dialogResult: any) => {
            if (dialogResult) {
                // update
                if (this.isGroupCodeDisabled) {
                    this.service.updateGroupCode(param);
                } else {
                    // insert
                    if (!this.isValid) {
                        alert('검증을 실행해주세요.', '경고');
                        return;
                    }
                    this.service.insertGroupCode(param);
                }
            }
        });

        // console.log('onSubmitByGroupCodeHandler : ', this.groupCodeForm, this.codeListGridInstance.getDataSource().items());
    }

    /**
     * 삭제 버튼 click Event
     * @param event
     */
    onDeleteByGroupCodeHandler(event: Event) {
        // const result: any = confirm('Would you like to Delete?', 'Confirm');
        const result: any = confirm('삭제하시겠습니까?', '확인');
        result.done((dialogResult: any) => {
            if (dialogResult) {
                this.service.deleteGroupCode(this.groupCodeForm.cmnGrpCd);
            }
        });
        // console.log('onSubmitHandler : ', this.groupCodeForm);
    }

    /**
     * 그룹코드 그리드에서 선택된 row 정보를 폼에 지정
     * @param event
     * @private
     */
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
        this.service.retrieveCodeListByGroupCode(event.row.data.code);
    }

    /**
     * 구독 처리
     */
    subscribe() {

        // jobcode
        this.subscription = this.service.$jobCodeList.subscribe((jobCodeList: any) => {
            this.globalVariableService.commonCode[JOB_ST_CD] = jobCodeList;
            this.jobCodeList = this.globalVariableService.commonCode[JOB_ST_CD];

            this.service.retrieveGroupCodeList(this.groupSearchForm.cmnGrpCd.trim());
        });

        // 그룹코드
        this.subscription = this.service.$groupCodeList.subscribe((groupCodeList: GroupCodeModel[]) => {
            this.groupCodeList = new ArrayStore({
                key: 'code',
                data: groupCodeList
            });
            if (groupCodeList.length) {
                this.service.retrieveCodeListByGroupCode(groupCodeList[0].code);
            }
        });

        // 상세코드
        this.subscription = this.service.$codeListByGroupCode.subscribe((codeList: any) => {
            this.codeList = new ArrayStore({
                key: 'cmnCd',
                data: codeList
            });
            this.originCodeList = [...codeList];
        });

        // 그룹코드 검증
        this.subscription = this.service.$validateGroupCode.subscribe((validate: boolean) => {
            this.isValid = validate;
            alert(this.isValid ? '검증이 완료되었습니다.' : '다른 코드를 입력해주세요.', '확인');
        });

        // 저장
        this.subscription = this.service.$success.subscribe((type: string) => {
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
            this.service.retrieveGroupCodeList(this.groupSearchForm.cmnGrpCd.trim());
        })
    }
}
