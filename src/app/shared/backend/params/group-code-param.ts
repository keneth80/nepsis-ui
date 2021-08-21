export interface CodeParam {
  cmnGrpCd: string;
  cmnCd: string;
  cmnCdNm: string;
  srtOdr: number;
  useYn: string;
  rmk: string;
  type: string;
}

export interface GroupCodeParam {
  cmnGrpCd: string;
  cmnGrpCdNm: string;
  cdDesc: string;
  jobStCd: string;
  useYn : string;
  type: string;
  codeList: CodeParam[];
}