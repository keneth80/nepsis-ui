export interface GroupCodeModel {
  code: string;
  codeName: string;
  codeStep: string;
  codeDescription: string;
  jobCode: string;
  useYn: string;
}

export interface CodeModel {
  cmnCd: string;
  cmnCdNm: string;
  cmnGrpCd: string;
  useYn: string;
  srtOdr: number;
  codeDescription?: string;
  createDtm?: string;
  fstRegpId?: string;
  lstChgDtm?: string;
  lstChgpId?: string;
  rmk?: string;
  type?: string;
  isServer?: boolean;
}