interface IObserverNew {
  register(event: string, func: () => void): void;
  unsubscribe(event: string): void;
  notify(event: string): void;
}

interface IObserversList {
  [key: string]: () => void;
}

export { IObserverNew, IObserversList };
