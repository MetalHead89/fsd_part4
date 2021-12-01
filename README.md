# Simple js slider plugin
Simple js slider plugin - простой в использовании слайдер для быстрого выбора значения или диапазона значений.

## Особенности:
- два режима работы: "одиночный" - для выбора одного значения и "диапазон" - для выбора диапазона значений;
- горизонтальное и вертикальное представление;
- возможность задавать величину шага, а также минимальное и максимальное значение;
- возможность включения/отключения отображения шкалы и блоков со значениями над бегунками;
- удобное API, позволяющее получать данные и изменять настройки плагина во время работы из кода.

## Содержание

1. [Демо страница](#демо-страница)
2. [Зависимости](#зависимости)
1. [Работа с проектом](#работа-с-проектом)
    * [Создание локальной копии проекта](#создание-локальной-копии-проекта)
    * [Команды](#команды)
2. [Добавление плагина в проект](#добавление-плагина-в-проект)
3. [Использование](#использование)
	* [Добавление слайдера в DOM](#добавление-слайдера-в-dom)
	* [Настройки по-умолчанию](#настройки-по-умолчанию)
	* [Пользовательские настройки](#пользовательские-настройки)
	* [API](#api)
4. [Архитектура](#архитектура)

## Демо страница

https://metalhead89.github.io/fsd_demo_slider_page/

## Зависимости

1. Node.js v16.13.0 - https://nodejs.org/
2. npm v8.1.0 - https://www.npmjs.com/
3. jQuery v3.5.1 - https://jquery.com/
4. TypeScript v4.0.3 - https://www.typescriptlang.org/

## Работа с проектом

### Создание локальной копии проекта

Для создания локальной копии проекта необходимо:

1. Скопировать репозиторий:

	git clone https://github.com/MetalHead89/fsd_part4.git

2. Установить зависимости:

	npm install

### Команды

Запуск сервера разработки:

	npm start

Development сборка слайдера:

	npm run slider-dev

Production сборка слайдера:

	npm run slider-prod

Development сборка демо-страницы:

	npm run demo-dev

Production сборка демо-страницы:

	npm run demo-prod

Запуск тестов:

	npm test

Запуск тестов с покрытием:

	npm run coverage

Сборка npm пакета:
  
  npm run npm-prod

## Добавление плагина в проект

>Внимание! Для работы плагина, проект должен поддерживать работу jQuery. Если во время работы со слайдером возникают ошибки, необходимо убедиться, что выполнена установка соответствующих пакетов и произведена настройка сборщика для работы с ними.

Для добавления плагина в проект необходимо:

1. Установить npm пакет simple-js-slider:

  npm i simple-js-slider

2. Произвести импорт плагина в точке входа:

  import 'simple-js-slider'

3. Произвести импорт стилей в точке входа:

  import 'simple-js-slider/index.css'

Либо самостоятельно собрать плагин и вручную скопировать его файлы в свой проект используя следующую инструкцию:

1. Собрать плагин используя команды npm run slider-dev или npm run slider-prod

2. Скопировать содержимое каталога dist (появится после сборки) в свой проект

3. Произвести импорт плагина в точке входа проекта:

    import 'путь_до_каталога_с_файлами_simple-js-slider/simple-js-slider.js'

4. Произвести импорт стилей плагина в точке входа проекта:

    import 'путь_до_каталога_с_файлами__simple-js-slider/styles.css'

## Использование

### Добавление слайдера в DOM

Слайдер размещается в пустом div элементе, который служит для него обёрткой. Поэтому первым шагом к добавлению слайдера в DOM, будет создание div элемента в месте, где должен находиться слайдер. Это можно сделать, как через HTML разметку, так и динамически в js коде. Например:
	
	const sliderWrapper = document.createElement('div');
	const body = document.querySelector('body');
	body.append(sliderWrapper);

Вторым шагом будет вызов функции simpleJsSlider() у обёрнутого в jQuery элемента, созданного ранее:

	$(sliderWrapper).simpleJsSlider();

Готово! Слайдер добавлен в DOM и готов к работе.

### Настройки по-умолчанию

На предыдущем шаге был успешно создан слайдер с настройками по-умолчанию. Они имеют следующий вид:

* ориентация: горизонтальная;
* тип: диапазон;
* шкала: отображается;
* значения над бегунками: отображаются;       
* минимальное значение: 0;
* максимальное значение: 10;
* величина шага: 1

### Пользовательские настройки

Настройки по-умолчанию удобны для быстрого создания нового слайдера, но в подавляющем большинстве случаев, необходим слайдер с иным диапазоном значений или другим типом. Для этого в плагине предусмотрена возможность конфигурирования настроек при создании слайдера. Всё что требуется сделать - это передать в метод simpleJsSlider() объект с необходимыми настройками, специфичными для текущего проекта:

	$(sliderWrapper).simpleJsSlider({'min': 60, 'max': 4000, 'orientation': 'vertical'});

#### Изменяемые опции для пользовательских настроек:

| Опция | Тип | Возможные значения | Значение по-умолчанию | Описание |
|:-:|:-:|:-:|-|:-:|
| orientation | string | horizontal или vertical | horizontal | Ориентация слайдера. horizontal - горизонтальная, vertical - вертикальная |
| type | string | single или range | range | Тип слайдера. single - одно значение, range - диапазон значений |
| scale | boolean | true или false | true | Режим отображения шкалы. true - шкала отображается, false - шкала скрыта |
| tooltips | boolean | true или false | true | Режим отображения значений над бегунками. true - значения отображаются, false - значения скрыты |
| min | number | любое целое значение | 0 | Минимальное значение слайдера |
| max | number | любое целое значение | 10 | Максимальное значение слайдера |
| step | number | любое целое значение большее нуля | 1 | Величина шага |

### API

Помимо конфигурирования во время создания, плагином предусмотрен API для динамической смены настроек слайдера, уже размещённого в DOM. Для обращения к API нужно передать в функцию simpleJsSlider() два аргумента:

	$(sliderWrapper).simpleJsSlider(functionAPI, arg);

* functionAPI - функция API, которую необходимо выполнить;
* arg - аргумент, который будет передан в функцию functionAPI

#### Функции API

| Функция API | Тип аргумента | Описание |
|:-:|:-:|:-:|
| getModelSubject | - | Возвращает субъект модели плагина, который оповещает своих подписчиков об изменениях |
| getThumbsValues | - | Возвращает объект со значениями бегунков |
| getMin | - | Возвращает минимальное значение слайдера |
| getMax | - | Возвращает максимальное значение слайдера |
| getStep | - | Возвращает значение шага слайдера |
| getScaleState | - | Возвращает истину, если шкала отображается, иначе ложь |
| getPopUpsState | - | Возвращает истину, если всплывающие сообщения отображаются, иначе ложь |
| getType | - | Возвращает тип слайдера (одиночный или диапазон) |
| getOrientation | - | Возвращает ориентацию слайдера (горизонтальная или вертикальная) |
| refreshSliderState | ISliderSettings | Обновляет настройки слайдера в соответствии с полученным объектом |

Например, для того, чтобы получить текущие значения бегунков, необходимо выполнить следующую команду:

	$(sliderWrapper).simpleJsSlider(getThumbsValues);

## Архитектура

Проект спроектирован на основе MVC паттерна и состоит из трёх основных компонентов Model, View и Controller. Такой выбор позволил произвести отделение пользовательского интерфейса от данных приложения и методов их обработки. Диаграмма взаимодействия всех трех компонентов показана ниже:

![Диаграмма классов](./src/images/class_diagram.jpg)

Слабая связность между компонентами обеспечивается при помощи паттерна Observer. Паттерн позволяет контроллеру следить и реагировать на события, происходящие в модели и представлении, которые в свою очередь не знают о существовании других компонентов.

### Model

Хранит в себе данные плагина и производит над ними различные расчеты. В случае изменения данных посылает через Observer оповещения контроллеру.
Модель ничего не знает о существовании представления и контроллера.

### View

Отвечает за вывод слайдера на экран в соответствии с данными полученными от модели, а так же реагирует на пользовательский ввод и посылает через Observer оповещения контроллеру. Представление так же ничего не знает о существовании модели и контроллера.

Представление декомпозируется на 6 subView, которые наследуют от класса Element общие свойства. Каждый subView отвечает за отдельный компонент слайдера:

* container - контейнер, который объединяет в себе все остальные компоненты слайдера;
* track - направляющая вдоль которой перемещаются бегунки;
* thumb - бегунок;
* progressBar - индикатор отображающий выбранный диапазон;
* scale - шкала;
* popUp - элемент отображающий значения позиции, на которой находится бегунок

### Controller

Служит посредником между моделью и представлением. Он обрабатывает события, возникающие в представлении, и в зависимости от их типа изменяет состояние модели путем вызова ее публичных методов, после чего обновляет представление в соответствии с новым состоянием.
