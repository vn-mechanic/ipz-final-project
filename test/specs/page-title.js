import assert from 'assert';

describe('fixture', () => {
    it('sample name', () => {
        browser.url('/');
        assert.equal(browser.getTitle(), 'End-to-End Testing');
    });
});