export interface GroupCodeModel {
  code: string;
  codeName: string;
  codeStep: string;
  codeDescription: string;
  jobCode: string;
  useYn: string;
}

export interface CodeModel {
  aplEndDt?: string;
  aplStrDt?: string;
  code: string;
  codeName: string;
  codeDescription: string;
  groupCode: string;
  useYn: string;
  srtOdr: number;
  createDtm: string;
  fstRegpId?: string;
  lstChgDtm?: string;
  lstChgpId?: string;
  rmk?: string;
  type?: string;
  isServer?: boolean;
}