# Задачи на Promise

## Реализовать функцию timeout

Пример вызова
```js
await timeout(5000)
```

## Реализовать Promise.all

## Реализовать Promise.race

## Реализовать mapPromiseSequential, который **последовательно** перебирает массив и вызывает следующий при окончании предыдущего

Доп. требования
- с сохранением результатов

Пример вызова
```js
const values = [1, 2, 3]
const result = await mapPromiseSequential(values, value => {
    return await value ** 2;
}) // [1, 4, 9]
```

## Реализовать функцию waitForEvent

Доп. требования
- Типизировать аргументы исходя из типов других аргументов

Пример вызова с колбэком
```js
// не продолжаем исполнение, пока пользователь нажмёт пробел (Space)
await waitForEvent(document, 'keyup', event => event.code === 'Space')
// document - dom узел, keyup - событие, event - объект события
```

Пример вызова без колбэка
```js
// не продолжаем исполнение, пока пользователь нажмёт любую клавишу
const [event] = await waitForEvent(document, 'keyup')
// event - 1й аргумент, который должен был передаться в колбэк с примера с колбэком
```


## Реализовать submit, который покажет модальку с кнопками Да/Нет

Пример вызова
```js
const yes = await submit('Да', 'Нет')
console.log(yes) // true/false/undefined (undefined если закрыли модаль без нажатия кнопок Да/Нет)
```

## Реализовать `class MyPromise`

Требования
- new MyPromise() // как new Promise()
- then/catch/finally
- с поддержкой типизации (сложно)

Пример вызова
```js
const promise = new MyPromise((res, rej) => {
    setTimeout(() => Math.random() > 0.5 ? res(10) : rej(new Error()), 500)
})

promise.then(v => v * v).then(v => console.log(v))
promise.then(console.log)
promise.catch(console.log)
```

## Реализовать функцию promisify

см. https://nodejs.org/api/util.html#util_util_promisify_original

> Смысл:
> Takes a function following the common error-first callback style, i.e. taking an (err, value) => ... callback as the last argument, and returns a version that returns promises.

Пример вызова
```js
// функции типа fs.stats всегда последним (!) аргументом принимают колбэк и вызывают этот колбэк в случае ошибки/успеха
// cb(error, null) - в случае ошибки
// cb(null, stats) - в случае успеха

// Было

const fs = require('fs'); 
  
// Getting information for a file 
fs.stat("example_file.txt", (error, stats) => { 
  if (error) { 
    // Handle the error. 
  } 
  else { 
    // Do something with `stats` 
  } 
}); 


// Стало
 
const fs = require('fs');  

const stat = promisify(fs.stat);

stat("example_file.txt").then((stats) => {
  // Do something with `stats`
}).catch((error) => {
  // Handle the error.
});

// с опциями
stat("example_file.txt", { bigint: true }).then((stats) => {
  // Do something with `stats`
}).catch((error) => {
  // Handle the error.
});

// @NOTE: fs.stat можно заменить на любую функцию, имеющую вид
// const func = (arg1, arg2, ..., cb) => cb(error, value1, value2, ...)
```
