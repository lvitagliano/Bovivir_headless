import { useState, useEffect } from 'react';
import moment from 'moment';

const getWedOfMonth = date => {
  const wedArray = [];
  const wed = moment(date, 'YYYY-MM-DD')
    .startOf('month')
    .day(3); //wednesday
  const month = wed.month();

  if (wed.date() > 7) {
    wed.add(7, 'd');
  }

  while (month === wed.month()) {
    wedArray.push(moment(wed));
    wed.add(7, 'd');
  }

  return wedArray;
};


const getRangeOfDates = (start, end) => {
  const fromDate = moment(start);
  const toDate = moment(end).add(15, 'days');

  const range = moment().range(fromDate, toDate);

  const array = range.toArray('days');

  return array.map(day => moment(day).format('DD/MM/YYYY'));
};

export const useSubscriptionDate = (date = moment()) => {
  const [data, setData] = useState({
    deliveryDates: null,
    renovationDate: null
  });

  useEffect(() => {
    setData({ deliveryDates: null, renovationDate: null });

    const wedArr = getWedOfMonth(date);

    const controlDate = wedArr.length === 4 ? wedArr[1] : wedArr[2];
    const mmdate = moment(date, 'YYYY-MM-DD');

    const nextDate = mmdate.isBefore(controlDate)
      ? mmdate
      : moment(mmdate).add(1, 'months');

    const start = moment(nextDate).format('YYYY-MM-01');
    const end = moment(nextDate).format('YYYY-MM-10');

    setData({
      deliveryDates: { start, end },
      renovationDate: controlDate.format('YYYY-MM-DD')
    });
  }, []);

  return data;
};
