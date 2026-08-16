export type MetadataControlType =
  | "text"
  | "number"
  | "date"
  | "boolean"
  | "select"
  | "lookup"
  | "textarea";

export type ScreenRenderMode = "core" | "hybrid" | "generic" | "special";

export interface MetadataFieldOption {
  value: string;
  label: string;
}

export interface MetadataField {
  fieldKey: string;
  label: string;
  dataType: string;
  controlType: MetadataControlType;
  required: boolean;
  readOnly: boolean;
  visible: boolean;
  width: number;
  displayOrder: number;
  isCustom: boolean;
  options?: MetadataFieldOption[];
}

export interface MetadataSection {
  code: string;
  title: string;
  description?: string;
  type: "header" | "section" | "lines";
  fields: MetadataField[];
}

export interface MetadataAction {
  actionKey: string;
  label: string;
  actionType: "api" | "navigate" | "workflow";
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  variant?: "contained" | "outlined" | "text";
}

export interface ScreenDefinition {
  code: string;
  name: string;
  route: string;
  renderMode: ScreenRenderMode;
  entityName: string;
  apiBasePath: string;
  workflowEnabled: boolean;
  printEnabled: boolean;
  aiEnabled: boolean;
}

export interface ScreenMetadata {
  screen: ScreenDefinition;
  layout: {
    mode: string;
    columns: number;
  };
  sections: MetadataSection[];
  actions: MetadataAction[];
}

export interface CustomFieldDefinition {
  entityName: string;
  fieldKey: string;
  label: string;
  dataType: string;
  displayOrder: number;
  isRequired: boolean;
  isActive: boolean;
}
