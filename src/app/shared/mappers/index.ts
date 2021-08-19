import { GroupCode, Code, CommonCode } from '../backend/models/group-code';
import { GroupCodeModel, CodeModel } from '../models/group-code-model';
import { ListCode } from '../models/common-code';

export const groupCodeModelMapper = (groupCode: GroupCode): GroupCodeModel => {
  return {
    code: groupCode.cmnGrpCd,
    codeName: groupCode.cmnGrpCdNm,
    codeStep: groupCode.fstRegpId,
    codeDescription: groupCode.cdDesc,
    jobCode: groupCode.jobStCd,
    useYn: groupCode.delYn
  } as GroupCodeModel;
};

export const codeModelMapper = (code: Code): CodeModel => {
  return {
    code: code.cmnCd,
    codeName: code.cmnCdNm,
    codeDescription: '',
    groupCode: code.cmnGrpCd,
    useYn: code.delYn,
    srtOdr: code.srtOdr,
    createDtm: code.fstRegDtm,
    isServer: true
  } as CodeModel;
};

export const listCodeMapper = (code: CommonCode) => {
  return {
    id: code.id,
    label: code.label
  } as ListCode;
}
