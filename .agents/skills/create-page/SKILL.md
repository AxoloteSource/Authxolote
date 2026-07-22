---
name: create-page
description: Master guide for creating new pages in the Backoffice (React + TypeScript)
globs: resources/js/pages/**/*.tsx, resources/js/routes/**/*.tsx, resources/js/appComponents/Menu/useMenu.ts
---

### AI Agent Skills Guide: Creating Pages in the Backoffice

This is the master guide for creating new pages in the project's Backoffice. Follow these steps to ensure consistency with the existing architecture.

#### 1. Page Types
Depending on the page's purpose, you should choose one of the following approaches:

- **Basic Page:** A simple view using only the `<Page />` component.
- **Index Page:** A page containing a data table with filters and CRUD operations.
  - **IMPORTANT:** If you need to create an Index Page, you **MUST** use the specialized skill: `create-index-page`.

#### 2. Directory Structure
All pages should be located in `resources/js/pages/Backoffice/`. Create a dedicated folder for the page and use a `partials/` subfolder where each component has its own directory:

```
resources/js/pages/Backoffice/MyModule/MyNewPage/
├── MyNewPage.tsx         # Main component
├── useMyNewPage.tsx      # Page logic (Optional/Hook)
└── partials/             # Page-specific components folder
    └── MyNewSubComponent/
        ├── MyNewSubComponent.tsx
        └── useMyNewSubComponent.tsx # (Optional Hook)
```

#### 3. Creating a Basic Page
A basic page should use the `<Page />` component from `@/components/Page/Page`. Even for simple pages, it's recommended to separate sub-components into the `partials/` directory (each in its own folder) to keep the main file clean and readable.

**Example:**
```tsx
import { Page } from '@/components/Page/Page';
import { useTranslation } from 'react-i18next';
import { MyNewSubComponent } from './partials/MyNewSubComponent/MyNewSubComponent';

const MyNewPage = () => {
```,search:
  const { t } = useTranslation();

  const breadCrumbles = [
    { label: t('home'), url: '/' },
    { label: t('my_new_page') }
  ];

  return (
    <Page titleTranslation="my_new_page_title" breadCrumblesItems={breadCrumbles}>
      <MyNewSubComponent />
    </Page>
  );
};

export default MyNewPage;
```

#### 4. Route Registration
Routes are managed in `resources/js/routes/modules/backoffice.routes.tsx`.

1. **Enum Update:** Add the new route to the `RoutesBackoffice` enum.
   ```typescript
   export enum RoutesBackoffice {
     Home = '/',
     MyNewPage = '/my-new-path',
     // ...
   }
   ```

2. **Lazy Loading:** Define the lazy component using `lazy`.
   ```typescript
   const MyNewPage = lazy(() => import('@/pages/Backoffice/MyModule/MyNewPage/MyNewPage'));
   ```

3. **Route Configuration:** Add the configuration to the `backofficeRoutes` array.
   ```typescript
   {
     path: RoutesBackoffice.MyNewPage,
     element: <MyNewPage />,
     breadcrumb: 'my_new_page_breadcrumb',
   }
   ```

#### 5. Sidebar Menu Registration
To add the new page to the sidebar, you must update two files:

1. **Menu Hook (`resources/js/appComponents/Menu/useMenu.ts`):** 
   - Define permissions/roles if necessary.
   - Add the item to the relevant submenu if it belongs to a group (like "Catalogs").

2. **Menu Component (`resources/js/appComponents/Menu/Menu.tsx`):**
   - Import the required icon from `lucide-react`.
   - Use the `SidebarLink` component to render the link.
   - For items with submenus, pass the `subItems` and `roles` props.

**Example in `Menu.tsx`:**
```tsx
import { useMenu } from '@/appComponents/Menu/useMenu'
import { SidebarLink } from '@/components/Layouts/SidelbarLink/SidebarLink'
import { RoutesBackoffice } from '@/routes/modules/backoffice.routes'
import { Database, House, MyNewIcon } from 'lucide-react'

export const Menu = () => {
  const {
    canCatalogs,
    catalogSubmenu,
    t,
  } = useMenu()

  const iconsClassName = 'group-hover:!text-primary shrink-0 ltr:mr-2'

  return (
    <ul>
      <SidebarLink 
        name={t('home')} 
        to={RoutesBackoffice.Home} 
        icon={<House className={iconsClassName} />} 
      />
      <SidebarLink 
        roles={canCatalogs}
        subItems={catalogSubmenu}
        name={t('menu.catalogs')}
        to={RoutesBackoffice.Catalog}
        icon={<Database className={iconsClassName} />}
      />
      <SidebarLink 
        name={t('my_new_page')} 
        to={RoutesBackoffice.MyNewPage} 
        icon={<MyNewIcon className={iconsClassName} />} 
      />
    </ul>
  )
}
```

#### 6. Verification
- Run `lint` to check for TypeScript and syntax errors.
- Ensure translations exist in `public/locales/es/translation.json`.
- Verify the breadcrumb consistency.
