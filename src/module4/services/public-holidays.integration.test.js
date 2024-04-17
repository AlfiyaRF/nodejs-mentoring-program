const {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays
} = require('./public-holidays.service');

const FR_FULL_LIST = [
  {
    "date":"2024-01-01",
    "localName":"Jour de l'an",
    "name":"New Year's Day"
  },{
    "date":"2024-04-01",
    "localName":"Lundi de Pâques",
    "name":"Easter Monday"
  },{
    "date":"2024-05-01",
    "localName":"Fête du Travail",
    "name":"Labour Day",
  },{
    "date":"2024-05-08",
    "localName":"Victoire 1945",
    "name":"Victory in Europe Day"
  },{
    "date":"2024-05-09",
    "localName":"Ascension",
    "name":"Ascension Day"
  },{
    "date":"2024-05-20",
    "localName":"Lundi de Pentecôte",
    "name":"Whit Monday"
  },{
    "date":"2024-07-14",
    "localName":"Fête nationale",
    "name":"Bastille Day"
  },{
    "date":"2024-08-15",
    "localName":"Assomption",
    "name":"Assumption Day"
  },{
    "date":"2024-11-01",
    "localName":"Toussaint",
    "name":"All Saints' Day"
  },{
    "date":"2024-11-11",
    "localName":"Armistice 1918",
    "name":"Armistice Day"
  },{
    "date":"2024-12-25",
    "localName":"Noël",
    "name":"Christmas Day"
  }
];

describe('Integration test for getListOfPublicHolidays', () => {
  it('Should return a list of public holidays for France in 2024', async () => {
    const result = await getListOfPublicHolidays(2024, 'FR');
    expect(result).toEqual(FR_FULL_LIST);
  });
});

describe('Integration test for checkIfTodayIsPublicHoliday', () => {
  it('Should return if it is a public holiday in Great Britan', async () => {
    const result = await checkIfTodayIsPublicHoliday('GB');
    expect(result).toEqual(false);
  });
});

const GB_NEXT_LIST = [
  {
    "date":"2024-05-06",
    "localName":"Early May Bank Holiday",
    "name":"Early May Bank Holiday",
  },{
    "date":"2024-05-27",
    "localName":"Spring Bank Holiday",
    "name":"Spring Bank Holiday",
  },{
    "date":"2024-07-12",
    "localName":"Battle of the Boyne",
    "name":"Battle of the Boyne",
  },{
    "date":"2024-08-05",
    "localName":"Summer Bank Holiday",
    "name":"Summer Bank Holiday",
  },{
    "date":"2024-08-26",
    "localName":"Summer Bank Holiday",
    "name":"Summer Bank Holiday",
  },{
    "date":"2024-11-30",
    "localName":"Saint Andrew's Day",
    "name":"Saint Andrew's Day",
  },{
    "date":"2024-12-25",
    "localName":"Christmas Day",
    "name":"Christmas Day",
  },{
    "date":"2024-12-26",
    "localName":"Boxing Day",
    "name":"St. Stephen's Day",  
  },{
    "date":"2025-01-01",
    "localName":"New Year's Day",
    "name":"New Year's Day",
  },{
    "date":"2025-01-01",
    "localName":"New Year's Day",
    "name":"New Year's Day",
  },{
    "date":"2025-01-01",
    "localName":"New Year's Day",
    "name":"New Year's Day",
  },{
    "date":"2025-01-02",
    "localName":"2 January",
    "name":"2 January",
  },{
    "date":"2025-03-17",
    "localName":"Saint Patrick's Day",
    "name":"Saint Patrick's Day"
  }
];

describe('Integration test for getNextPublicHolidays', () => {
  it('Should return next public holiday for Great Britan', async () => {
    const result = await getNextPublicHolidays('GB');
    expect(result).toEqual(GB_NEXT_LIST);
  });
});