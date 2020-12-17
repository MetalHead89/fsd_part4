# Incredible slider plugin
Incredible slider plugin - простой в использовании сдайдер для быстрого выбора значения или диапазона значений.

## Особенности:
- два режима работы: "одиночный" - для выбора одного значения и "диапазон" - для выбора диапазона значений;
- горизонтальное и вертикальное представление. При горизонтальной ориентации элемент автоматически подстраивается под ширину контейнера, при вертикальной имеет фиксированную высоту, которая задаётся через стили;
- возможность задавать величину шага, а также минимальное и максимальное значение;
- возможность включения/отключения отображения шкалы и блоков со значениями над бегунками;
- удобное API, позволяющее изменять настройки плагина во время работы из кода.

## Содержание

1. [Работа с проектом](#работа-с-проектом)
    * [Установка](#установка)
    * [Команды](#команды)
2. [Установка плагина](#установка-плагина)
3. [Использование](#использование)
	* [Добавление слайдера в DOM](#добавление-слайдера-в-dom)
	* [Настройки по-умолчанию](#настройки-по-умолчанию)
	* [Пользовательские настройки](#пользовательские-настройки)
	* [API](#api)

## Работа с проектом

### Установка

Cкопируйте репозиторий:

	https://github.com/MetalHead89/fsd_part4.git

Установите зависимости:

	npm install

### Команды

Запуск сервера разработки:

	npm start

Development сборка:

	npm run dev

Production build:

	npm run build

Запуск тестов:

	npm test

Запуск тестов с покрытием:

	nom run coverage

## Установка плагина

>Внимание! Для работы плагина ваш проект дожен поддерживать работу с TypeScript, scss и jQuery. Если во время работы со слайдером в вашем проекте возникают ошибки, убедитесь, что выполнена установка соответствующих пакетов и произведена настройка сборщика для работы с ними.

Скопируйте каталог sliderPlugin из репозитория проекта:

    https://github.com/MetalHead89/fsd_part4/tree/master/src/plugins

Импортируйте плагин в точке входа вашего проекта:

    import 'путьДоКаталогаSliderPlugin/sliderPlugin/incredibleSliderPlugin.ts'

Импортируйте стили плагина в точке входа вашего проекта:

    import 'путьДоКаталогаSliderPlugin/sliderPlugin/styles/style.scss'

## Использование

### Добавление слайдера в DOM

Слайдер размещается в пустом div элементе, который служит для него обёрткой. Поэтому первым шагом к добавлению слайдера в DOM, будет создание div элемента в месте, где должен находиться слайдер. Это можно сделать, как через HTML разметку, так и динамически в js коде. Например:
	
	const sliderWrapper = document.createElement('div');
	const body = document.querySelector('body');
	body.append(sliderWrapper);

Вторым шагом будет вызов функции incredibleSliderPlugin() у обёрнутого в jQuery элемента, созданного ранее:

	$(sliderWrapper).incredibleSliderPlugin();

Готово! Слайдер добавлен в DOM и готов к работе.

### Настройки по-умолчанию

На предыдущем шаге нами был успешно создан слайдер с настройками по-умолчанию. Они имеют следующий вид:

* ориентация: горизонтальная;
* тип: диапазон;
* шкала: отбражается;
* значения над бегунками: отображаются;       
* минимальное значение: 0;
* максимальное значение: 10;
* величина шага: 1

### Пользовательские настройки

Настройки по-умолчанию удобны для быстрого создания нового слайдера, но в подавляющем большинстве случаев, необходим слайдер с иным диапазоном значений или другим типом. Для этого в плагине предусмотрена возможность конфигурирования настроек при создании слайдера. Всё что тербуется сделать - это передать в метод incredibleSliderPlugin() объект с необходимыми настройками, специфичными для текущего проекта:

	$(sliderWrapper).incredibleSliderPlugin({'min': 60, 'max': 4000, 'orientation': 'vertical'});

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

Помимо конфигурирования во время создания, плагином предусмотрен API для динамической смены настроек слайдера, уже размещённого в DOM. Для обращения к API нужно передать в функцию incredibleSliderPlugin() два аргумента:

	$(sliderWrapper).incredibleSliderPlugin(functionAPI, arg);

* functionAPI - функция API, которую необходимо выполнить;
* arg - аргумент, который будет передан в функцию functionAPI

#### Функции API

| Функция API | Тип аргумента | Описание |
|:-:|:-:|:-:|
| setMin | number | Задаёт минимальное значение слайдера |
| setMax | number | Задаёт максимальное значение слайдера |
| setStep | number | Задаёт величину шага слайдера |
| changeScaleVisibility | boolean | Задаёт режим отображения шкалы |
| changeTooltipsVisibility | boolean | Задаёт режим отображения значений над бегунками |
| getScaleVisiblity | boolean | Возвращает режим отображения шкалы |
| getTooltipsVisiblity | boolean | Возвращает режим отображения значений над бегунками |
| changeSliderType | string | Задаёт тип слайдера |
| getSliderType | string | Возвращает тип слайдера |
| getSliderOrientation | string | Возвращает ориентацию слайдера |
| changeSliderOrientation | string | Задаёт ориентацию слайдера |

Например, для того, чтобы установить минимальное значение слайдера равное пяти, необходимо выполнить следующую команду:

	$(sliderWrapper).incredibleSliderPlugin(setMin, 5);