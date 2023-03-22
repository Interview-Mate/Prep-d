import { run } from '../SafeEval';

describe('run', () => {
  it('should return the correct results when run is called', async () => {
    const result1 = run('function add(a, b) { return a + b; } add(1, 1);');
    const result2 = run('function add(a, b) { return a + b; } add(2, 8);');
    const result3 = run('function add(a, b) { return a + b; } add(44, 3);');

    expect(result1.output).toEqual(2);
    expect(result2.output).toEqual(10);
    expect(result3.output).toEqual(47);
  });
});
