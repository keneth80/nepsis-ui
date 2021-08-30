export interface GroupCode {
    cdDesc: string;
    cmnGrpCd: string;
    cmnGrpCdNm: string;
    codeList: Code[];
    useYn: string;
    fstRegDtm: string;
    fstRegpId: string;
    jobStCd: string;
    lstChgDtm: string;
    lstChgpId: string;
    type: string;
}

export interface Code {
    cmnCd: string;
    cmnCdNm: string;
    cmnGrpCd: string;
    useYn: string;
    srtOdr: number;
    delYn: string;
    fstRegDtm: string;
    fstRegpId: string;
    lstChgDtm: string;
    lstChgpId: string;
    rmk: string;
    type: string;
    aplEndDt: string;
    aplStrDt: string;
}

export interface CommonCode {
    id: string;
    label: string;
}
