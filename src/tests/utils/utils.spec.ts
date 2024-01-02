// utils.spec.ts
import { Utils } from '../../app/utils/utils';

describe('Utils', () => {
  describe('getCurrencyDate', () => {
    it('should return the current date', () => {
      // Arrange
      const currentDate = new Date();
      const originalDateNow = Date.now;
      Date.now = jest.fn(() => currentDate.getTime());
      const result = Utils.getCurrencyDate();
      expect(result.toISOString().split('T')[0]).toEqual(currentDate.toISOString().split('T')[0]);
      Date.now = originalDateNow;
    });
  });

  describe('formatDate', () => {
    it('should format the date correctly', () => {
      const inputDate = new Date('2022-12-31T00:00:00.000Z');
      const expectedFormattedDate = '2022-12-30';
      const result = Utils.formatDate(inputDate);
      expect(result).toMatch(expectedFormattedDate);
    });

    it('should handle single-digit month and day', () => {
      const inputDate = new Date('2022-05-05T00:00:00.000Z');
      const expectedFormattedDate = '2022-05-04';
      const result = Utils.formatDate(inputDate);
      expect(result).toMatch(expectedFormattedDate);
    });
  });
});
