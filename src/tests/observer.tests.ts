import Observer from '../plugins/sliderPlugin/observer/observer';

const observer = new Observer();
let testData: any = '';

function testFunc(someData: any): any {
    testData = someData;
};

beforeEach( () => {
    testData = 'null';
});

describe('Checking operability of the observer', () => {
    
    test('Should be "This is test 1"', () => {

        observer.subscribe('test1', (someData: string) => { testFunc(someData) });
        observer.notify('test1', 'This is test 1');       

        expect(testData).toBe('This is test 1');

    });

    test('Should be "null"', () => {

        observer.subscribe('test2', (someData: string) => { testFunc(someData) });

        expect(testData).toBe('null');

    });

    test('Should be 389', () => {
        
        observer.subscribe('test3', (someData: number) => { testFunc(someData) });
        observer.notify('test3', 389);

        expect(testData).toBe(389);

    });

    test('Should be "This is test 4"', () => {

        const observerFunc = (someData: number) => { testFunc(someData) };

        observer.subscribe('test4', observerFunc);
        observer.notify('test4', 'This is test 4');
        expect(testData).toBe('This is test 4');

        observer.unsubscribe('test4', observerFunc);
        observer.notify('test4', 'This notification must not be intercepted');
        expect(testData).toBe('This is test 4');

    });

    test('Should be 389', () => {
        
        const observerFunc = (someData: number) => { testFunc(someData) };
        
        observer.subscribe('test5', observerFunc);
        observer.notify('test5', 389);
        expect(testData).toBe(389);

        observer.unsubscribe('test5', observerFunc);
        observer.notify('test5', 'This notification must not be intercepted');
        expect(testData).toBe(389);

    });

    test('Should be "null"', () => {

        observer.subscribe('test6', (someData: number) => { testFunc(someData) });
        observer.notify('testWithoutListeners', 'This is test 6');
        expect(testData).toBe('null');

    });

});