
export type FieldType = 'TEXT' | 'NUMBER' | 'DROPDOWN' | 'TEXTAREA' | 'DYNAMIC_CONTACTS' | 'MULTISELECT' | 'DATE' | 'DATETIME' | 'LINK';

export interface DynamicContact {
  name: string;
  phone: string;
  date?: string;
}

export interface FileRecord {
  // File Information
  FILE_ID: string;
  INTIMATION_NO: string;
  AGENT_NAME: string;
  REFERENCE: string;
  MID: string;
  DEATH_PERSON_NAME: string;
  INTIMATION_BY: string;
  INTIMATION_PERSON_PHONE_NUMBER: string;
  TYPE_OF_ACCIDENT: string;
  ACCIDENT_REMARKS: string;
  NOMINEE_NAME: string;
  NOMINEE_RELATION: string;
  NOMINEE_MOBILE: string;
  CONTACT_DETAILS: DynamicContact[];
  TICKET_NO: string;
  CID: string;
  FILE_REMARKS: string;
  
  // Address
  DISTRICT: string;
  AC_NAME: string;
  MANDAL_NAME: string;
  VILLAGE_NAME: string;
  DOOR_NO: string;
  ADD_REMARKS: string;

  // Scanning
  FILE_NO: string;
  SCANNED_DATE: string;
  SCANNING_REMARKS: string;

  // File Status
  FILE_STATUS: string;
  FWD_DATE: string;
  UTR_DATE: string;
  UTR_NO: string;
  FILE_STATUS_REMARKS: string;

  // Resubmission
  RESUBMISSION_REQ_DOCS: string[];
  RESUBMISSION_TYPE: string;
  RESUBMISSION_DOCS_RECEIVED: string[];
  RESUBMISSION_INFORMATION: DynamicContact[];
  RESUBMISSION_STATUS: string;
  RESUBMISSION_DATE: string;
  RESUBMISSION_FWD_DATE: string;
  RESUBMISSION_REMARKS: string;

  // File Letter Distribution
  LTR_DATE: string;
  LTR_DISTRIBUTED_DATE: string;
  LTR_STATUS: string;
  LTR_BY: string;
  LTR_LINK1: string;
  LTR_LINK2: string;
  LTR_REMARKS: string;

  createdAt: string;
  updatedAt: string;
}

export interface SchemaField {
  id: keyof FileRecord;
  header: string;
  type: FieldType;
  section: string;
  description?: string;
  options?: string[];
  hidden?: boolean;
}
