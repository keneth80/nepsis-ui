import { GroupCode, Code } from '../backend/models/group-code';
import { GroupCodeModel, CodeModel } from '../models/group-code-model';

export const groupCodeModelMapper = (groupCode: GroupCode): GroupCodeModel => {
  return {
    code: groupCode.cmnGrpCd,
    codeName: groupCode.cmnGrpCdNm,
    codeStep: groupCode.fstRegpId,
    codeDescription: groupCode.cdDesc,
    jobCode: groupCode.jobStCd,
    hrkCode: groupCode.lstChgpId,
    deleteYn: groupCode.delYn
  } as GroupCodeModel;
};

export const codeModelMapper = (code: Code): CodeModel => {
  return {
    code: code.cmnCd,
    codeName: code.cmnCdNm,
    codeDescription: '',
    groupCode: code.cmnGrpCd,
    delYn: code.delYn,
    srtOdr: code.srtOdr,
    createDtm: code.fstRegDtm
  } as CodeModel;
};
