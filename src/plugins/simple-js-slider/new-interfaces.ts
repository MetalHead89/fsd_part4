interface IObserverNew {
  register(event: string, func: (args?: any) => void): void;
  unsubscribe(event: string): void;
  notify(event: string, args?: any): void;
}

interface IObserversList {
  [key: string]: (args?: any) => void;
}

export { IObserverNew, IObserversList };
