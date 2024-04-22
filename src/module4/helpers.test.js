const {validateCountry, validateYear, validateInput} = require('./helpers');

describe('Validate if the country exists in the list', () => {
  // test for success
  it('should return true for one of France = FR', () => {
    const exist = validateCountry('FR');
    expect(exist).toBe(true);
  })
  // test for false
  it('should return false for Russia = RU', () => {
    const exist = validateCountry('RU');
    expect(exist).toBe(false);
  })
  // test for wrong type
  it('should return false for number', () => {
    const exist = validateCountry(111);
    expect(exist).toBe(false);
  })
})

describe('Validate if the year is current', () => {
  // test for success
  it('should return true for 2024', () => {
    const isCurrent = validateYear(2024);
    expect(isCurrent).toBe(true);
  })
  // test for false
  it('should return false for 1900', () => {
    const isCurrent = validateYear(1900);
    expect(isCurrent).toBe(false);
  })
  // test for wrong type
  it('should return false for string', () => {
    const isCurrent = validateYear('year');
    expect(isCurrent).toBe(false);
  })
})

describe('Validate input', () => {
  test('should return true for 2024 year and DE', () => {
    const validationResponse = validateInput({year: 2024, country: 'DE'});
    expect(validationResponse).toEqual(true);
  });

  test('should throw error for 2024 year and HU', () => {
    expect(() => {
      validateInput({year: 2024, country: 'HU'})
    }).toThrow();
  });

  test('should return false for 2020 year and FR', () => {
    expect(() => {
      validateInput({year: 2020, country: 'FR'})
    }).toThrow('Year provided not the current, received: 2020');
  });
});