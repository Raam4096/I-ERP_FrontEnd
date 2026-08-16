/**
 * Backend error codes from the i-ERP process-flow contract.
 * Mapped once so pages never switch on raw strings.
 */
export const ERROR_CODES = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  DUPLICATE_RECORD: "DUPLICATE_RECORD",
  BUSINESS_RULE_VIOLATION: "BUSINESS_RULE_VIOLATION",
  INVALID_STATUS_TRANSITION: "INVALID_STATUS_TRANSITION",
  DOCUMENT_ALREADY_POSTED: "DOCUMENT_ALREADY_POSTED",
  CREDIT_LIMIT_EXCEEDED: "CREDIT_LIMIT_EXCEEDED",
  INSUFFICIENT_STOCK: "INSUFFICIENT_STOCK",
  UNAUTHORIZED: "UNAUTHORIZED",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  FORBIDDEN: "FORBIDDEN",
  TENANT_NOT_FOUND: "TENANT_NOT_FOUND",
  TENANT_SUSPENDED: "TENANT_SUSPENDED",
  FIELD_PERMISSION_DENIED: "FIELD_PERMISSION_DENIED",
  AI_PERMISSION_DENIED: "AI_PERMISSION_DENIED",
  AI_APPROVAL_REQUIRED: "AI_APPROVAL_REQUIRED",
  WORKFLOW_ERROR: "WORKFLOW_ERROR",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export const ERROR_FALLBACK_MESSAGES: Record<ErrorCode, string> = {
  VALIDATION_ERROR: "Please correct the highlighted fields.",
  DUPLICATE_RECORD: "A record with these details already exists.",
  BUSINESS_RULE_VIOLATION: "This action violates a business rule.",
  INVALID_STATUS_TRANSITION: "This status change is not allowed.",
  DOCUMENT_ALREADY_POSTED: "Posted documents cannot be edited or deleted.",
  CREDIT_LIMIT_EXCEEDED: "This transaction exceeds the customer credit limit.",
  INSUFFICIENT_STOCK: "Insufficient stock is available for this transaction.",
  UNAUTHORIZED: "Your session is not valid. Please sign in again.",
  TOKEN_EXPIRED: "Your session expired. Refreshing credentials…",
  FORBIDDEN: "You do not have permission to perform this action.",
  TENANT_NOT_FOUND: "The tenant on this session could not be found.",
  TENANT_SUSPENDED: "This tenant account is suspended.",
  FIELD_PERMISSION_DENIED: "You cannot view or edit this field.",
  AI_PERMISSION_DENIED: "AI actions are not permitted for your role.",
  AI_APPROVAL_REQUIRED: "This AI action is waiting for human approval.",
  WORKFLOW_ERROR: "The workflow step failed. Review the instance log.",
  NOT_FOUND: "The requested record was not found.",
  INTERNAL_ERROR: "An unexpected server error occurred.",
};
