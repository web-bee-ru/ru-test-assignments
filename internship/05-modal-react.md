# Тестовое задание на React компонент Modal (+ ModalProvider)

Реализуем на github или codesandbox

Написать manager модальных окон для react приложения

**Зачем**: бывают случаи, когда в интерфейсе требуются вложенные модальки. Без менеджера они будут конфликтовать между собой.

Полезная информация про поведение модальных окон: https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/

## Стек

- `react@18`
- `typescript@4`
- `styled-components`/`emotion`

## Требования

- менеджмент реализуем в компоненте `ModalProvider`
- у модалек затемнение на заднем фоне
- модальки выравнены по центру
- остальная часть приложения должна должна перестать ловить фокус (например от кнопки Tab). Теперь только элементы модальки ловят фокус.
- модальки отключают скролл окна. Закрытие модальки возвращает скролл туда, где он был во время открытия
- контент новой модальки рисуется вместо контента предыдущей. То есть я не должен видеть куски родительской модальки, пока вижу дочернюю.
- клавиша `Escape` должна вызывать `onClose` у текущей модальки (а не у всех открытых). При этом можно отключить закрытие по `Escape` через проп `closeOnEscape`
- клик вне модальки (по тёмному фону) должен `вызывать onClose`
- если открыто несколько модалек, то модалька в своём хедере должна писать, какая это модалька по счёту (*"Номер окна: 4"*)
- dom узел родителя модальки должен рендерится не в том же dom узле, где он был вызван, а должен быть во "вне", в то есть корне `<body>` (например)
- "иерархия" (последовательность) модалек (предыдущий-следующий) формируется не из порядка объявления, а из порядка открытия (например `child` открыли последним, поэтому его мы видим на экране). При этом валидна ситуация, что при закрытии дочерней модальки, родительской уже не окажется, т.к. её кто-то успел спрятать программно.
- добавить поддержку пропа `important`, чтобы такая модалька была всегда **поверх дургих модалек**. Т.к. их может быть несколько, то последняя открытая `important` находится поверх остальных `important` модалек.

## Пример

```tsx
// Приложение завёрнуто в <ModalProvider>

const [showModalParent, setShowModalParent] = useState(false)
const [showModalChild, setShowModalChild] = useState(false)

return <div>
  <button onClick={() => setShowModalParent(true)}>Открыть родительскую модальку</button>
  <Modal visible={showModalParent} onClose={() => setShowModalParent(false)} closeOnEscape={false}>
    <div>
      <h1>Родительская модалька</h1>
      <button onClick={() => setShowModalChild(true)}>Открыть дочернюю модальку</button>
      <button onClick={() => setShowModalParent(false)}>Закрыть</button>
    </div>
  </Modal>
  <Modal visible={showModalChild} onClose={() => setShowModalChild(false)} closeOnEscape={true}>
    <div>
      <h1>Дочерняя модалька</h1>
      <button onClick={() => setShowModalChild(false)}>Закрыть</button>
    </div>
  </Modal>
</div>
```