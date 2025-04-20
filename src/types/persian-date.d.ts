// types/persian-date.d.ts
declare module 'persian-date' {
    class PersianDate {
      constructor(date?: Date | string | number);
      toLocale(lang: 'fa' | 'en'): PersianDate;
      year(year: number): PersianDate;
      month(month: number): PersianDate;
      date(day: number): PersianDate;
      hour(hour: number): PersianDate;
      minute(minute: number): PersianDate;
      second(second: number): PersianDate;
      valueOf(): number;
    }
  
    export = PersianDate;
  }