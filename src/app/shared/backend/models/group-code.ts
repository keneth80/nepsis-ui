export interface GroupCode {
  cdDesc: string;
  cmnGrpCd: string;
  cmnGrpCdNm: string;
  codeList: Code[];
  delYn: string;
  fstRegDtm: string;
  fstRegpId: string;
  jobStCd: string;
  lstChgDtm: string;
  lstChgpId: string;
  type: string;
}

export interface Code {
  aplEndDt: string;
  aplStrDt: string;
  cmnCd: string;
  cmnCdNm: string;
  cmnGrpCd: string;
  delYn: string;
  fstRegDtm: string;
  fstRegpId: string;
  lstChgDtm: string;
  lstChgpId: string;
  rmk: string;
  srtOdr: number;
  type: string;

}