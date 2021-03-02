// /* eslint-disable dot-notation */

// import Subject from '../plugins/simple-slider/subject/subject';

// let subject = new Subject();

// beforeEach(() => {
//   subject = new Subject();
// });

// describe('Register', () => {
//   test('Observers must be added', () => {
//     const newObserverOne = {
//       update(): void {
//         /* some operations */
//       },
//     };
//     const newObserverTwo = {
//       update(): void {
//         /* some operations */
//       },
//     };
//     const newObserverThree = {
//       update(): void {
//         /* some operations */
//       },
//     };

//     subject.register('thumbMove', newObserverOne);
//     expect(subject['observers'].thumbMove.length).toBe(1);

//     subject.register('thumbMove', newObserverTwo);
//     expect(subject['observers'].thumbMove.length).toBe(2);

//     subject.register('thumbMove', newObserverThree);
//     expect(subject['observers'].thumbMove.length).toBe(3);
//   });
// });

// describe('Remove', () => {
//   test('Observers must be removed', () => {
//     const newObserverOne = {
//       update(): void {
//         /* some operations */
//       },
//     };
//     const newObserverTwo = {
//       update(): void {
//         /* some operations */
//       },
//     };
//     const newObserverThree = {
//       update(): void {
//         /* some operations */
//       },
//     };

//     subject.register('thumbMove', newObserverOne);
//     subject.register('thumbMove', newObserverTwo);
//     subject.register('thumbMove', newObserverThree);

//     expect(subject['observers'].thumbMove.length).toBe(3);

//     subject.remove('thumbMove', newObserverOne);
//     expect(subject['observers'].thumbMove.length).toBe(2);

//     subject.remove('thumbMove', newObserverTwo);
//     expect(subject['observers'].thumbMove.length).toBe(1);

//     subject.remove('thumbMove', newObserverThree);
//     expect(subject['observers'].thumbMove.length).toBe(0);
//   });
// });

// describe('Notify', () => {
//   test('Observers must be notified', () => {
//     let numberOfNotifiedObservers = 0;

//     const newObserverOne = {
//       update(): void {
//         numberOfNotifiedObservers += 1;
//       },
//     };
//     const newObserverTwo = {
//       update(): void {
//         numberOfNotifiedObservers += 1;
//       },
//     };
//     const newObserverThree = {
//       update(): void {
//         numberOfNotifiedObservers += 1;
//       },
//     };

//     subject.register('thumbMove', newObserverOne);
//     subject.notify('thumbMove');
//     expect(numberOfNotifiedObservers).toBe(1);

//     numberOfNotifiedObservers = 0;
//     subject.register('thumbMove', newObserverTwo);
//     subject.notify('thumbMove');
//     expect(numberOfNotifiedObservers).toBe(2);

//     numberOfNotifiedObservers = 0;
//     subject.register('thumbMove', newObserverThree);
//     subject.notify('thumbMove');
//     expect(numberOfNotifiedObservers).toBe(3);

//     numberOfNotifiedObservers = 0;
//     subject.remove('thumbMove', newObserverThree);
//     subject.notify('thumbMove');
//     expect(numberOfNotifiedObservers).toBe(2);

//     numberOfNotifiedObservers = 0;
//     subject.register('clickToScale', newObserverOne);
//     subject.notify('thumbMove');
//     expect(numberOfNotifiedObservers).toBe(2);
//     numberOfNotifiedObservers = 0;
//     subject.notify('clickToScale');
//   });
// });
