export function mockCall(ms: number, shouldFail: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject('Fail triggered.');
            } else {
                resolve();
            }   
        }, ms);
    });
};