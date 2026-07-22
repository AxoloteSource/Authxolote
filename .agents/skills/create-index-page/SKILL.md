---
name: create-index-page
description: Guide for creating a new Index page in the Backoffice (React + TypeScript)
globs: resources/js/pages/**/*.tsx, resources/js/routes/**/*.tsx, resources/js/services/**/*.ts, resources/js/interfaces/**/*.ts
---

### AI Agent Skills Guide: Creating Index Pages in the Backoffice

This guide is a specialized extension of `create-page` for creating Index pages (with data tables and filters).

#### 1. Pre-requisites
Ensure you have followed the general steps in `create-page` for:
- Directory setup.
- Route registration.
- Sidebar menu integration.

#### 2. Directory Structure (Index Specific)
In addition to the main component, an Index page typically requires:
```
resources/js/pages/Backoffice/MyModule/MyNewPage/
├── MyNewPage.tsx         # Main component (View)
├── useMyNewPage.tsx      # Page logic (Hook)
└── partials/             # Page-specific components
    ├── FilterFormMyNew/
    │   ├── FilterFormMyNew.tsx
    │   └── useFilterFormMyNew.tsx
    └── MyNewForm/
        ├── MyNewForm.tsx
        └── useMyNewForm.tsx
```

#### 2. Interface and Service Definition
Before creating the page, ensure you have the model interface and the API service.

- **Interface:** `resources/js/interfaces/models/MyModule/IMyModel.ts`
- **Service:** `resources/js/services/my-module/useServiceMyModel.ts`

#### 3. The Page Hook (`useMyNewPage.tsx`)
This hook should handle:
- Modal state (open/close for create/edit).
- Selected item for editing.
- Search filters.
- `refreshKey` to update the table after successful changes.
- `renderersMap` for custom table columns (e.g., actions, booleans, images).

#### 4. The Page Component (`MyNewPage.tsx`)
Use the `<Page />` component as the main container and `<DataTableFilter />` to list the data.

```tsx
import { Page } from '@/components/Page/Page'
import { DataTableFilter } from '@/components/Tables/DataTableFilter/DataTableFilter'
import { MyNewForm } from './partials/MyNewForm/MyNewForm'
import { FilterFormMyNew } from './partials/FilterFormMyNew/FilterFormMyNew'
// ... imports
const MyNewPage = () => {
  const { filters, open, renderersMap, close, isOpen, selectedItem, refreshKey, handleSuccess } = useMyNewPage()

  return (
    <Page titleTranslation="my_title" breadCrumblesItems={breadCrumbles}>
      <DataTableFilter
        key={refreshKey}
        filters={filters}
        onClickNew={open}
        service={useServiceIndexMyModel}
        renderersMap={renderersMap}
      >
        {(formik) => <FilterFormMyNew formik={formik} />}
      </DataTableFilter>
      <MyNewForm onSuccess={handleSuccess} selectedItem={selectedItem} close={close} isOpen={isOpen} />
    </Page>
  )
}
```

#### 5. Verification (Index Specific)
- Run `lint` to check for TypeScript and syntax errors.
- Ensure translations exist in `public/locales/es/translation.json`.
- Verify that the breadcrumb is consistent.
- Run `vendor/bin/pint --dirty --format agent` if you made changes to PHP files (e.g., if you also created the endpoint).
