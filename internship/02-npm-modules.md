# Тестовые задания на реализацию npm модулей

Реализуем на github, публикуем в npm под названием **@имя-вашего-npm-пользователя/название-пакета**, например **@vasya228/react-use**

## React - useDocumentVisibility

Стек: React, typescript (опционален), сборка - microbundle/rollup

Надо реализовать react hook, который
- скажет, активна (видна) ли сейчас вкладку браузера
- скажет, сколько раз с момента инициализации компонента вкладка становилась неактивной (невидимой)
- предоставит функцию, в которой можно подписаться на изменение активности (видимости) текущей вкладки

**Замечание**: речь про "вкладка активна(видна)/неактивна", а не "вкладка в фокусе/не фокусе", это важно.

### Пример работы хука

`useDocumentVisibility.ts`

```jsx
import React from 'react'
import { useDocumentVisibility } from '@my-npm-user/react-document-visibility'

const LeaveTabCounter = () => {
  const { count, visible, onVisibilityChange } = useDocumentVisibility();

  useEffect(() => {
    onVisibilityChange((isVisible) => {
      console.log('first handler', isVisible)
    });
    onVisibilityChange((isVisible) => {
      console.log('second handler', isVisible)
    });
  }, [])

  return (
    <div>
      <span>
        Вы покинули страницу: {count} раз
        Вкладка активна? {visible ? 'да' : 'нет'}
      </span>
    </div>
  );
};
```

## React - react-responsive

Стек: React, typescript, сборка - microbundle/rollup

Надо реализовать react hook и компонент для работы с https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList

### Пример работы хука

`useMediaQuery.ts`

```tsx
import React from 'react'
import { useMediaQuery } from '@my-npm-user/react-responsive'

const Example = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  return <div>
    <h1>Device Test!</h1>
    {isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
    {isBigScreen && <p>You  have a huge screen</p>}
    {isTabletOrMobile && <p>You are a tablet or mobile phone</p>}
    <p>Your are in {isPortrait ? 'portrait' : 'landscape'} orientation</p>
    {isRetina && <p>You are retina</p>}
  </div>
}
```

### Пример работы компонента

`MediaQuery.tsx`

```tsx

import React from 'react'
import MediaQuery from '@my-npm-user/react-responsive'

const Example = () => (
  <div>
    <h1>Device Test!</h1>
    <MediaQuery minWidth={1224}>
      <p>You are a desktop or laptop</p>
      <MediaQuery minWidth={1824}>
        <p>You also have a huge screen</p>
      </MediaQuery>
    </MediaQuery>
    <MediaQuery minResolution="2dppx"> // @media (-webkit-min-device-pixel-ratio: 2)
      {/* You can also use a function (render prop) as a child */}
      {(matches) =>
        matches
          ? <p>You are retina</p>
          : <p>You are not retina</p>
      }
    </MediaQuery>
  </div>
)
```

Ожидаемые props этого компонента:

```
orientation
minResolution
maxResolution
minWidth
maxWidth
minHeight
maxHeight
```

Дополнительно:
- Типизировать minResolution, чтобы можно было указать либо строку вида "{число}dppx", либо просто number (то есть чтобы и так и так можно было, а строка только определённого вида)
