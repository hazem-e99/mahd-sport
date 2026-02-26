# NavBar Component Copy

This folder contains a standalone copy of the NavBar component and all its dependencies.

## Structure

```
navBarCoponnentCopy/
├── navBar/
│   ├── nav-bar.component.tsx       # Main NavBar component
│   └── nav-bar.component.scss      # NavBar styles
├── dateTimeDisplay/
│   ├── date-time-display.component.tsx
│   └── date-time-display.component.scss
├── navMenuToggle/
│   ├── nav-menu-toggle.component.tsx
│   └── nav-menu-toggle.component.scss
├── notificationBell/
│   ├── notification-bell.component.tsx
│   └── notification-bell.component.scss
├── user-profilemenu/
│   ├── user-profilemenu.component.tsx
│   └── user-profilemenu.component.scss
├── MadietConfirmModal/
│   ├── MadietConfirmModal.tsx
│   └── MadietConfirmModal.scss
├── icons/
│   ├── mahadlogo.tsx
│   ├── cloud-icon.tsx
│   ├── bar-icon.tsx
│   ├── notification-icon.tsx
│   └── arrowdown-icon.tsx
├── context/
│   └── languageContext.tsx
├── types/
│   └── language-context.type.tsx
├── styles/
│   └── _variables.scss
├── api/
│   ├── auth.ts
│   ├── employees.ts
│   └── EmployeesApi.ts
├── msalConfig.ts
└── README.md
```

## Dependencies (External - need to be installed in the target project)

- `react`
- `react-router-dom`
- `react-bootstrap`
- `react-toastify`
- `react-i18next`
- `i18next`
- `@azure/msal-browser`
- `@azure/msal-react`

## Notes

- Update import paths (`@/...`) to match the target project's path aliases.
- The `msalConfig.ts` references constants from `constants/auth`, `constants/environment`, and `constants/urls` — you need to provide these in the target project.
- The `languageContext` depends on `i18n` configuration and `localization.service` — adapt accordingly.
- The `EmployeesApi` depends on `axiosClient` — provide your own axios instance.
