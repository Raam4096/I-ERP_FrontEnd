# i-ERP Frontend — Production-Ready React + Vite Implementation

You are working on the frontend of **i-ERP — Intelligent Enterprise Platform**, a large-scale SaaS ERP application.

This frontend is being created **from scratch**.

The backend APIs are already being developed/available using:

* ASP.NET Core 8
* PostgreSQL
* REST APIs
* JWT authentication
* Refresh tokens
* `/api/v1/` API versioning

Frontend stack:

* React
* Vite
* TypeScript
* MUI
* Redux Toolkit
* React Router
* Axios
* TanStack Table
* TanStack Virtual where virtualization is actually required

The highest priorities are:

1. Production-quality architecture
2. Reusable components
3. Maintainability
4. Consistent UI/UX
5. Type safety
6. Responsive design
7. Performance
8. Clear separation of concerns
9. Minimal dependencies
10. Code that can scale to a large ERP SaaS application

---

# 1. READ THE PROJECT REFERENCES FIRST

Before writing application code, inspect the following project references:

* `docs/i-ERP_ProcessFlow_v4.docx`
* `docs/reference/ui/dashboard.png`
* `docs/reference/ui/leads.png`

If the filenames are different, locate the equivalent files.

These references are authoritative.

The screenshots define the **visual language**.

The i-ERP process-flow document defines the **functional and architectural expectations**.

Do not invent a completely different design system.

Do not replace the visual direction with a generic MUI dashboard template.

---

# 2. IMPORTANT PRODUCT ARCHITECTURE

i-ERP is a SaaS ERP and must eventually support:

* Multi-tenancy
* Role-based permissions
* Field-level permissions
* Metadata-driven screens
* Core screens
* Hybrid screens
* Dynamic screens
* Special screens
* Workflow engine
* Rule engine
* Bridge engine
* Print engine
* AI assistant
* Reporting
* Custom fields
* Audit logs

The frontend must therefore be designed as a **platform**, not as a collection of isolated pages.

The architecture must allow future modules to reuse the same shell, forms, tables, filters, dialogs, permissions, loading states, error handling and metadata rendering.

---

# 3. VISUAL DESIGN — FOLLOW THE PROVIDED SCREENSHOTS

The supplied screenshots show the target visual language.

Maintain the same general visual identity:

* Dark navy application shell
* Dark sidebar
* Dark top navigation/header
* Bright electric blue primary accent
* Subtle borders
* Dark cards
* High readability
* Compact enterprise spacing
* Professional enterprise SaaS appearance
* Rounded cards and controls
* Minimal unnecessary decoration
* Clear hierarchy
* Consistent iconography

The following must be visually consistent across the entire application:

* Sidebar
* Top navbar
* Page headers
* Cards
* Buttons
* Tables
* Tabs
* Filters
* Dialogs
* Forms
* Status badges
* Empty states
* Loading states
* Error states
* Pagination
* Drawers
* Notifications

The Dashboard and Leads screens must look like they belong to the same application.

Do not create different visual systems for different modules.

---

# 4. RESPONSIVE DESIGN

The application must be responsive.

Support at minimum:

* Desktop
* Laptop
* Tablet
* Mobile

The desktop screenshot is the primary reference, but do not hardcode desktop dimensions.

The sidebar should collapse appropriately on smaller screens.

Tables should have controlled horizontal scrolling rather than breaking the entire page.

Cards should adapt to available width.

Forms should use responsive MUI Grid/layout behavior.

Never use fixed widths unnecessarily.

Avoid layouts such as:

width: 1200px;

when a responsive alternative exists.

---

# 5. NO INLINE CSS

Do NOT use:

```tsx
style={{ ... }}
```

Do not build pages using large amounts of inline styling.

Prefer:

* MUI `sx` only for small component-local styling where appropriate
* MUI theme configuration for global design tokens
* reusable styled components where appropriate
* CSS modules if component-specific CSS genuinely requires them

The main visual system should come from the MUI theme.

Do not scatter magic colors, spacing values and border-radius values throughout the application.

---

# 6. DESIGN SYSTEM

Create a centralized MUI theme.

Example conceptual structure:

```text
src/
└── theme/
    ├── index.ts
    ├── palette.ts
    ├── typography.ts
    ├── components.ts
    └── shadows.ts
```

Centralize:

* Colors
* Typography
* Border radius
* Spacing
* Shadows
* Button styles
* Card styles
* Input styles
* Table styles
* Dialog styles
* Chip/status styles

The screenshots should be used to derive the visual tokens.

Do not copy colors into individual components.

For example, avoid:

```tsx
color="#1F6FEB"
```

throughout the codebase.

Instead use the theme.

---

# 7. PROJECT STRUCTURE

Use the following structure as the starting point, but improve it if necessary.

```text
src/
│
├── app/
│   ├── App.tsx
│   ├── routes.tsx
│   └── providers.tsx
│
├── configurations/
│   └── api/
│       ├── config.ts
│       ├── index.ts
│       ├── requestBuilder.ts
│       └── apiTypes.ts
│
├── redux/
│   ├── store.ts
│   ├── hooks.ts
│   └── features/
│       ├── auth/
│       │   ├── authSlice.ts
│       │   ├── authSelectors.ts
│       │   └── authTypes.ts
│       │
│       ├── tenant/
│       │   └── tenantSlice.ts
│       │
│       ├── permissions/
│       │   └── permissionSlice.ts
│       │
│       ├── employees/
│       │   └── employeeSlice.ts
│       │
│       └── departments/
│           └── departmentSlice.ts
│
├── models/
│   ├── common/
│   ├── auth/
│   ├── employee/
│   ├── department/
│   ├── lead/
│   └── metadata/
│
├── layouts/
│   ├── AppLayout/
│   │   ├── AppLayout.tsx
│   │   └── AppLayout.module.css
│   │
│   ├── Sidebar/
│   │   ├── Sidebar.tsx
│   │   ├── SidebarItem.tsx
│   │   └── navigationConfig.ts
│   │
│   └── Topbar/
│       ├── Topbar.tsx
│       └── ...
│
├── components/
│   ├── common/
│   │   ├── PageHeader/
│   │   ├── LoadingState/
│   │   ├── EmptyState/
│   │   ├── ErrorState/
│   │   ├── ConfirmDialog/
│   │   ├── StatusChip/
│   │   └── SearchInput/
│   │
│   ├── cards/
│   │   ├── KpiCard/
│   │   └── SummaryCard/
│   │
│   ├── tables/
│   │   ├── DataTable/
│   │   ├── DataTableToolbar/
│   │   ├── DataTablePagination/
│   │   ├── DataTableEmptyState/
│   │   └── DataTableSkeleton/
│   │
│   ├── forms/
│   │   ├── FormField/
│   │   ├── FormSection/
│   │   ├── TextField/
│   │   ├── SelectField/
│   │   ├── DateField/
│   │   └── LookupField/
│   │
│   └── metadata/
│       ├── GenericPage/
│       ├── MetadataFieldRenderer/
│       ├── MetadataSectionRenderer/
│       └── MetadataActionRenderer/
│
├── pages/
│   ├── Dashboard/
│   ├── CRM/
│   │   └── Leads/
│   ├── Sales/
│   ├── Purchase/
│   ├── Inventory/
│   ├── Finance/
│   ├── HR/
│   ├── Projects/
│   ├── Workflow/
│   ├── Reports/
│   ├── Administration/
│   ├── Masters/
│   └── Settings/
│
├── hooks/
│   ├── useAuth.ts
│   ├── usePermissions.ts
│   ├── useDebounce.ts
│   ├── useResponsive.ts
│   └── useTableState.ts
│
├── utils/
│   ├── formatters/
│   ├── validators/
│   ├── permissions/
│   └── errorHandling/
│
├── constants/
│   ├── routes.ts
│   ├── statuses.ts
│   └── permissions.ts
│
├── theme/
│   ├── index.ts
│   ├── palette.ts
│   ├── typography.ts
│   └── components.ts
│
├── assets/
│
├── types/
│
└── main.tsx
```

You may improve this structure if you have a strong architectural reason.

Do not create folders just for the sake of creating folders.

---

# 8. API ARCHITECTURE

Create one centralized API layer.

Do NOT call Axios directly inside pages.

Bad:

```tsx
axios.get("/api/v1/leads");
```

inside a page component.

Instead:

```text
Page
 ↓
Feature API/service
 ↓
Central API client
 ↓
Axios
 ↓
Backend
```

All API URLs must be centralized.

Example:

```text
config.ts
```

should contain endpoint definitions.

Example:

```ts
export const API_ENDPOINTS = {
  auth: {
    login: "/api/v1/auth/login",
    refresh: "/api/v1/auth/refresh",
    logout: "/api/v1/auth/logout",
  },
  leads: {
    list: "/api/v1/leads",
    byId: (id: string) => `/api/v1/leads/${id}`,
  },
};
```

Do not scatter endpoint strings across components.

---

# 9. API RESPONSE CONTRACT

The backend follows this response pattern:

Success:

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

Error:

```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Customer is required",
  "field": "customerId"
}
```

Pagination:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 245,
    "totalPages": 13
  }
}
```

Build TypeScript types for these envelopes.

Do not create different response-handling logic for every page.

Create reusable response/error handling.

---

# 10. AUTHENTICATION

The documented authentication model is:

* Access token: JWT
* Access token lifetime: 15 minutes
* Refresh token: HttpOnly cookie
* Refresh token lifetime: 7 days
* Refresh token rotation
* Logout revokes the refresh token

Implement the frontend API layer accordingly.

Do not store sensitive refresh tokens in localStorage.

The Axios layer should:

1. Attach the access token to requests.
2. Detect unauthorized responses.
3. Attempt refresh where appropriate.
4. Retry the failed request after successful refresh.
5. Prevent multiple simultaneous refresh calls.
6. Clear authentication state when refresh fails.
7. Redirect the user to login when the session is no longer valid.

Keep this logic inside the API/authentication infrastructure rather than individual pages.

---

# 11. REDUX

Use Redux Toolkit.

Do not put everything into Redux.

Global Redux state should primarily cover:

* Authentication
* Current user
* Tenant context
* Roles
* Permissions
* Global application state

Local component state should handle things such as:

* Modal open/close
* Temporary form values
* Table UI state when it does not need to be shared
* Local filters
* Local UI interactions

Use typed hooks:

```ts
useAppDispatch()
useAppSelector()
```

Do not use untyped Redux hooks throughout the application.

---

# 12. PERMISSION ARCHITECTURE

The documentation defines roles such as:

* Super Admin
* Tenant Admin
* Finance Manager
* Finance Executive
* Sales Manager
* Sales Executive
* Purchase Manager
* Purchase Executive
* Warehouse Staff
* Read Only

The frontend must be prepared for:

* Route permissions
* Module permissions
* Action permissions
* Field-level permissions

Create reusable permission utilities.

For example:

```tsx
<PermissionGate permission="sales.quotation.create">
  <CreateButton />
</PermissionGate>
```

However, remember:

**Frontend permissions are only for UI behaviour.**

The backend remains the source of truth for authorization.

Never assume hiding a button provides security.

---

# 13. APPLICATION SHELL

Build the application shell first.

It must contain:

```text
AppLayout
├── Sidebar
├── Topbar
└── MainContent
```

The sidebar must match the provided screenshots.

Modules should be configuration-driven rather than manually duplicated.

Example:

```ts
const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "CRM",
    children: [...]
  },
  {
    label: "Sales",
    children: [...]
  },
];
```

The navigation configuration should eventually support:

* permission checks
* active route
* expandable modules
* nested navigation
* badges
* disabled states

Do not hardcode sidebar markup for every module.

---

# 14. DASHBOARD

Recreate the supplied Dashboard screenshot as the visual reference.

Build reusable components for:

* KPI cards
* Trend indicators
* Charts/analytics containers
* Pending approval cards
* Audit log cards
* Activity streams
* Intelligence/insight cards

Do not make the dashboard one huge component.

Example:

```text
Dashboard
├── DashboardHeader
├── KpiGrid
│   └── KpiCard
├── CommercialPerformance
├── PendingApprovals
├── AuditLogList
├── ExecutiveIntelligence
└── ActivityStream
```

The dashboard should initially work with mock data if APIs are not yet connected.

Keep mock data separated from components so it can later be replaced by API calls without rewriting the UI.

---

# 15. LEADS SCREEN

Recreate the supplied Leads screen.

The Leads page should contain:

* Page header
* Live/status indicator
* New button
* KPI cards
* Leads worklist
* Search
* Filtering
* Sorting
* Pagination
* Selection
* Row actions
* Responsive behaviour

The table should support:

* View
* Edit
* Delete
* Print/action where applicable
* Status
* Lead score
* Assigned user
* Created date

Do not hardcode table markup that cannot be reused.

---

# 16. TABLE ARCHITECTURE

Use **TanStack Table** as the reusable table engine.

Do NOT install multiple table frameworks just because they are available.

Do not use:

* TanStack Table
* Material React Table
* AG Grid

all together.

Choose one primary abstraction.

Use:

**TanStack Table + MUI**

This provides flexibility while maintaining control over the ERP visual design.

Build a reusable:

```text
<DataTable />
```

with support for:

* Column definitions
* Sorting
* Filtering
* Pagination
* Row selection
* Column visibility
* Loading state
* Empty state
* Error state
* Row actions
* Server-side pagination
* Server-side sorting
* Server-side filtering

The API contract supports:

```text
?page=1
&pageSize=20
&search=keyword
&sortBy=created_at
&sortDir=desc
```

Therefore the table architecture must support server-side operations.

Do not load thousands of records into the browser unnecessarily.

---

# 17. VIRTUALIZATION

Do not automatically virtualize every table.

Use TanStack Virtual only where datasets genuinely become large.

For normal ERP screens:

* Server-side pagination
* Sorting
* Filtering

should be sufficient.

For large operational datasets, introduce virtualization through the reusable DataTable layer without changing the consuming page API.

The page should not care whether the table is virtualized.

---

# 18. GENERIC PAGE / METADATA-DRIVEN UI

This is one of the most important architectural requirements.

The documentation defines `GenericPage` as the frontend renderer for metadata-driven screens.

The metadata API is:

```text
GET /api/v1/metadata/screens/{screenCode}
```

The response can define:

* Screen
* Layout
* Sections
* Fields
* Field types
* Visibility
* Required state
* Read-only state
* Width
* Display order
* Actions
* Workflow
* AI capabilities

Build the architecture so:

```text
GenericPage
    ↓
Screen Metadata
    ↓
MetadataSectionRenderer
    ↓
MetadataFieldRenderer
    ↓
Reusable Form Controls
```

Do not implement the metadata system as one giant switch statement.

Create extensible field/control mappings.

For example:

```ts
const fieldRendererMap = {
  text: TextFieldRenderer,
  number: NumberFieldRenderer,
  date: DateFieldRenderer,
  boolean: BooleanFieldRenderer,
  lookup: LookupFieldRenderer,
};
```

The exact implementation can be improved where necessary.

---

# 19. CORE / HYBRID / DYNAMIC / SPECIAL SCREENS

Respect the documented screen architecture.

Core screens:

* Fixed UI/business logic
* Custom fields may still be rendered

Hybrid screens:

* Fixed business data
* Configurable layout
* Custom fields
* Workflow
* Rules

Dynamic screens:

* Fully metadata-driven

Special screens:

* Dashboard
* AI Control Room
* Settings
* Other custom experiences

Do not force every screen into GenericPage.

GenericPage is for metadata-driven rendering where appropriate.

---

# 20. CUSTOM FIELDS

The documentation defines:

```text
custom_field_definitions
```

with:

```text
entity_name
field_key
label
data_type
display_order
is_required
is_active
```

The critical relationship is:

```text
entity_name == screen code
```

The frontend architecture must support custom fields being dynamically merged into the screen definition.

Do not hardcode custom fields into individual pages.

---

# 21. COMMON COMPONENTS

Create reusable components before duplicating UI.

At minimum:

```text
PageHeader
KpiCard
StatusChip
DataTable
DataTableToolbar
SearchInput
FilterButton
FilterPanel
Pagination
ConfirmDialog
FormSection
EmptyState
LoadingState
ErrorState
PermissionGate
ResponsiveDrawer
ActionMenu
```

Every reusable component should have:

* Strong TypeScript types
* Clear props
* Sensible defaults
* No unnecessary coupling
* Minimal assumptions about business modules

---

# 22. FORMS

Forms must be reusable.

Do not create custom styling separately for every page.

Prepare reusable field components:

```text
TextField
NumberField
DateField
SelectField
LookupField
CheckboxField
SwitchField
```

They should integrate naturally with MUI.

Keep business logic out of presentational field components.

---

# 23. ERROR HANDLING

Create centralized error handling.

Support the documented error codes including:

```text
VALIDATION_ERROR
DUPLICATE_RECORD
BUSINESS_RULE_VIOLATION
INVALID_STATUS_TRANSITION
DOCUMENT_ALREADY_POSTED
CREDIT_LIMIT_EXCEEDED
INSUFFICIENT_STOCK
UNAUTHORIZED
TOKEN_EXPIRED
FORBIDDEN
TENANT_NOT_FOUND
TENANT_SUSPENDED
FIELD_PERMISSION_DENIED
AI_PERMISSION_DENIED
AI_APPROVAL_REQUIRED
WORKFLOW_ERROR
NOT_FOUND
INTERNAL_ERROR
```

Do not simply show:

```text
Something went wrong
```

for every error.

Where possible:

* Display field-level errors beside fields.
* Display business errors as notifications/dialogs.
* Handle unauthorized errors through auth infrastructure.
* Provide useful fallback messages.

---

# 24. LOADING / EMPTY / ERROR STATES

Every API-driven screen must have explicit:

```text
Loading
Success
Empty
Error
```

states.

Do not leave blank screens while data loads.

Create reusable skeleton components.

---

# 25. API DATA VS UI DATA

Separate:

```text
API models
```

from:

```text
UI models
```

where necessary.

Do not let backend response details leak throughout the entire component tree.

If a backend field changes, the entire UI should not need rewriting.

---

# 26. COMMENTS IN CODE

This is important.

Add meaningful comments explaining:

* Why a piece of logic exists
* What an authentication interceptor is doing
* Why a refresh-token queue exists
* Why server-side pagination is used
* Why virtualization is conditionally enabled
* Why GenericPage merges custom fields
* Why permission checks exist
* Why a particular abstraction exists

Example:

```ts
// Queue failed requests while a single refresh request is in progress.
// This prevents multiple simultaneous refresh calls when several API
// requests receive TOKEN_EXPIRED at the same time.
```

Do NOT add useless comments such as:

```ts
// Set loading to true
setLoading(true);
```

Comments should explain **intent and reasoning**, not repeat the code.

---

# 27. TYPESCRIPT QUALITY

Use strict TypeScript.

Do not use:

```ts
any
```

unless there is an unavoidable external boundary and it is isolated and documented.

Prefer:

```ts
unknown
```

and proper type guards where appropriate.

Avoid duplicated interfaces.

Create shared types for:

* Pagination
* API responses
* API errors
* Permissions
* Statuses
* Metadata
* Table state

---

# 28. THIRD-PARTY PACKAGE POLICY

Keep dependencies minimal.

Before installing a package, ask:

1. Can React/MUI/TypeScript handle this?
2. Can a small reusable internal utility handle this?
3. Is the dependency solving a real architectural problem?
4. Is it necessary for production?

Do NOT add libraries simply because they are popular.

Preferred ecosystem:

* React
* MUI
* Redux Toolkit
* React Router
* Axios
* TanStack Table
* TanStack Virtual

Avoid adding:

* Multiple UI frameworks
* Multiple table libraries
* Multiple state managers
* Unnecessary utility libraries
* Duplicate form libraries
* Duplicate date libraries

---

# 29. ROUTING

Use React Router.

Centralize routes.

Example:

```text
/dashboard
/crm/leads
/sales/quotations
/purchase/orders
/inventory
/finance
/hr
/projects
/workflow
/reports
/administration
/masters
/settings
```

Routes should eventually support permission guards.

Do not hardcode route strings repeatedly throughout components.

---

# 30. MOCK DATA

Because the project is starting from scratch, use mock data only where backend integration is not yet available.

Keep mock data separate:

```text
pages/
  Dashboard/
    dashboard.mock.ts
```

Do not mix fake data into production API services.

When the backend endpoint becomes available, replacing mock data should require minimal changes.

---

# 31. PERFORMANCE

Treat this as a large-scale SaaS product.

Avoid:

* unnecessary re-renders
* huge component trees
* duplicated API calls
* loading massive datasets
* unnecessary global state
* unnecessary memoization everywhere

Use memoization only where it provides actual value.

Use:

* server-side pagination
* lazy-loaded routes where useful
* reusable table infrastructure
* controlled API calls
* debounced search
* virtualization for genuinely large lists

---

# 32. ACCESSIBILITY

Use semantic HTML and MUI accessibility features.

Ensure:

* buttons have accessible labels
* icon-only buttons have tooltips/aria labels
* keyboard navigation works
* dialogs trap focus correctly
* forms expose validation messages
* sufficient text contrast
* navigation is keyboard accessible

---

# 33. CODE ORGANIZATION RULE

Do not put everything in:

```text
App.tsx
```

Do not create:

```text
utils.ts
helpers.ts
common.ts
misc.ts
```

containing unrelated functionality.

Keep modules cohesive.

Each feature should own its:

* components
* API calls
* models
* configuration
* state

when those are feature-specific.

---

# 34. IMPLEMENTATION ORDER

Do NOT attempt to build the entire ERP in one pass.

Implement in this exact order:

## Phase 1 — Project Foundation

Create:

* Vite React TypeScript project
* MUI
* Redux Toolkit
* React Router
* Axios
* TanStack Table
* TanStack Virtual
* ESLint
* Prettier
* Strict TypeScript

Then create the folder architecture.

---

## Phase 2 — Theme

Create the complete dark i-ERP theme based on the supplied screenshots.

Implement:

* palette
* typography
* spacing
* cards
* buttons
* inputs
* tables
* dialogs
* chips
* layout

---

## Phase 3 — Application Shell

Implement:

```text
AppLayout
├── Sidebar
├── Topbar
└── Content Area
```

Make it responsive.

Match the supplied screenshots closely.

---

## Phase 4 — API Infrastructure

Implement:

```text
config.ts
requestBuilder.ts
index.ts
```

Implement:

* base URL
* headers
* bearer token
* refresh token flow
* error normalization
* request retry
* logout handling

---

## Phase 5 — Redux

Implement:

```text
store
auth
tenant
permissions
```

with typed hooks.

---

## Phase 6 — Reusable Components

Build:

* PageHeader
* KpiCard
* StatusChip
* DataTable
* Table toolbar
* Pagination
* Search
* Filters
* Dialog
* Loading state
* Empty state
* Error state
* PermissionGate

Do this before building many pages.

---

## Phase 7 — Dashboard

Implement the dashboard screenshot using reusable components.

---

## Phase 8 — Leads

Implement the Leads screen using:

* reusable KPI cards
* reusable DataTable
* server-side table state
* responsive design
* reusable action menu
* status chips

---

## Phase 9 — GenericPage Foundation

Implement the first version of:

```text
GenericPage
MetadataSectionRenderer
MetadataFieldRenderer
MetadataActionRenderer
```

Prepare it for the backend metadata API.

---

# 35. DO NOT OVERENGINEER THE FIRST VERSION

Do not build the complete ERP engine now.

The current objective is to create a **strong frontend foundation** that can scale.

Do not prematurely implement:

* complete AI Control Room
* complete workflow designer
* complete dynamic module builder
* complete reporting engine
* every ERP screen

unless explicitly requested.

Build the reusable foundation first.

---

# 36. ACCEPTANCE CRITERIA

Before considering the implementation complete, verify:

### Architecture

* [ ] Clear folder structure
* [ ] Separation of concerns
* [ ] No giant components
* [ ] No duplicated business logic
* [ ] Strict TypeScript
* [ ] Reusable components

### UI

* [ ] Dashboard matches reference
* [ ] Leads matches reference
* [ ] Sidebar matches reference
* [ ] Topbar matches reference
* [ ] Same colors across application
* [ ] Responsive layout
* [ ] Consistent spacing
* [ ] Consistent typography

### API

* [ ] Central API client
* [ ] Central endpoints
* [ ] Token handling
* [ ] Refresh handling
* [ ] Error normalization
* [ ] Pagination support
* [ ] Filtering support
* [ ] Sorting support

### State

* [ ] Redux Toolkit configured
* [ ] Typed Redux hooks
* [ ] Auth state
* [ ] Tenant state
* [ ] Permission state
* [ ] No unnecessary Redux state

### Tables

* [ ] TanStack Table
* [ ] MUI rendering
* [ ] Server-side pagination
* [ ] Server-side sorting
* [ ] Server-side filtering
* [ ] Row selection
* [ ] Reusable actions
* [ ] Virtualization capability without coupling pages to virtualization

### ERP Architecture

* [ ] GenericPage foundation
* [ ] Metadata models
* [ ] Dynamic field rendering
* [ ] Custom field support
* [ ] Permission architecture
* [ ] Core/Hybrid/Dynamic/Special screen distinction

### Code quality

* [ ] No unnecessary dependencies
* [ ] No inline CSS
* [ ] No magic colors
* [ ] No magic API URLs
* [ ] No unnecessary `any`
* [ ] Meaningful comments for non-obvious logic
* [ ] No duplicated components
* [ ] No unused code
* [ ] No unused dependencies

---

# 37. VERY IMPORTANT — DEVELOPMENT BEHAVIOUR

Do not simply generate code quickly.

Think about how this frontend will look after:

* 50 modules
* 200+ screens
* hundreds of tables/forms
* multiple tenants
* multiple roles
* metadata-driven screens
* thousands/millions of records

Every architectural decision should consider that scale.

At the same time, avoid unnecessary abstraction.

Follow:

> Build the smallest reusable abstraction that solves the current problem and can naturally support the next ERP features.

Do not create an abstraction merely because it sounds architecturally sophisticated.

---

# 38. FINAL INSTRUCTION

Start with the project foundation.

First inspect the screenshots and documentation.

Then:

1. Create the project structure.
2. Install only required dependencies.
3. Configure TypeScript/ESLint/Prettier.
4. Configure MUI theme.
5. Configure Redux.
6. Configure Router.
7. Configure API infrastructure.
8. Build AppLayout.
9. Build Sidebar.
10. Build Topbar.
11. Build reusable components.
12. Build Dashboard.
13. Build Leads.
14. Build GenericPage foundation.

After each major phase, verify the application builds successfully.

Do not leave broken imports or placeholder architecture.

Do not generate hundreds of fake screens.

The code must be production-oriented from the beginning.

Every important/non-obvious piece of logic must contain a concise comment explaining **why the logic exists**.

The final result should look and feel like a serious enterprise SaaS ERP product, not a demo dashboard.
