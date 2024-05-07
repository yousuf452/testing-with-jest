// denna testet ska kolla på om push funktionen körs rätt 
const stack = require('../src/stack');

test('push funktionalitet', () => {
    //vi pushar ut element till the stack för att kunna köra våra tester.
    stack.push(1);
    stack.push(2);
    stack.push(3);

    // här kollar vi om det vi har pushat har kommit fram.
    expect(stack.peek()).toBe(3);
    //vi tar sedan bort top elementet. 
    stack.pop();
    //kollar nu igen om det stämmer överens.
    expect(stack.peek()).toBe(2)

});

