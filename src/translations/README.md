# Internationalization (i18n)

## File Structure
```
translations/
├── en.json       # English translations
└── nl.json       # Dutch translations
```

## Usage in Components
```tsx
const { t } = useTranslation();
return <h1>{t('header.title')}</h1>;
```

## Adding Languages
1. Create new JSON file (e.g. fr.json)
2. Update language context provider
3. Add language switcher UI component

## Key Conventions
- Use dot notation for hierarchy
- Group by feature area
- Keep keys consistent across languages