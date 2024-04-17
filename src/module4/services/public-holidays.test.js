const axios = require('axios');
const {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays
} = require('./public-holidays.service');

jest.mock('axios');
axios.get = jest.fn();

describe('Get list of public holidays', () => {
  const mockPublicHolidays = [
    { date: '2024-01-01', name: 'New Year', country: 'FR' },
    { date: '2024-04-01', name: 'Easter Day', country: 'FR' },
  ];

  it('Returns list of public holidays for France in 2024', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPublicHolidays });
    const result = await getListOfPublicHolidays(2024, 'FR');
    expect(result).toEqual([
      { date: '2024-01-01', name: 'New Year' },
      { date: '2024-04-01', name: 'Easter Day' },
    ]);
  });

  it('Returns an empty array if there is an error', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    const result = await getListOfPublicHolidays(2024, 'DE');
    expect(result).toEqual([]);
  });

  test('Should call proper API', async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: mockPublicHolidays }));

    await getListOfPublicHolidays(2024, 'FR');
    expect(axiosGetSpy).toHaveBeenCalledWith('https://date.nager.at/api/v3/PublicHolidays/2024/FR');
  });
});


describe('Check if today is a public holiday', () => {
  it('Returns true if it is a public holiday today in NL', async () => {
    axios.get.mockResolvedValueOnce({ status: 200 });
    const result = await checkIfTodayIsPublicHoliday('NL');
    expect(result).toEqual(true);
  });

  it('Returns false if there is an error', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));
    const result = await checkIfTodayIsPublicHoliday('NL');
    expect(result).toEqual(false);
  });
});

describe('Get next public holidays', () => {
  const mockNextPublicHoliday = [{
    date: '2024-05-01',
    name: 'Labour Day',
    localName: 'Labour Day'
  }];

  it('Returns an array of next public holidays for a given country', async () => {
    axios.get.mockResolvedValueOnce({ data: mockNextPublicHoliday });
    const result = await getNextPublicHolidays('GB');
    expect(result).toEqual([{
      date: '2024-05-01',
      name: 'Labour Day',
      localName: 'Labour Day'
    }]);
  });

  it('Returns an empty array if there is an error', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    const result = await getNextPublicHolidays('GB');
    expect(result).toEqual([]);
  });

  test('Should call proper API', async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: mockNextPublicHoliday }));
  
    await getNextPublicHolidays('GB');
    expect(axiosGetSpy).toHaveBeenCalledWith('https://date.nager.at/api/v3/NextPublicHolidays/GB');
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
