function date_string(now: Date) {
  let day = now.getDate().toString();
  if (day.length === 1) day = `0${day}`;
  let month = (now.getMonth() + 1).toString();
  if (month.length === 1) month = `0${month}`;
  const year = now.getFullYear().toString();

  return `${day}.${month}.${year}`;
}

export interface today_data {
  at_source: string;
  at_text: string;
  nt_source: string;
  nt_text: string;
  sunday: string;
}

export interface entry {
  Datum: string;
  Wtag: string;
  Sonntag: string;
  Losungsvers: string;
  Losungstext: string;
  Lehrtextvers: string;
  Lehrtext: string;
}

export function get_today(data: entry[], date: Date) {
  for (const i of data) {
    if (i.Datum == date_string(date)) {
      const result: today_data = {
        at_source: i.Losungsvers,
        at_text: i.Losungstext,
        nt_source: i.Lehrtextvers,
        nt_text: i.Lehrtext,
        sunday: i.Sonntag,
      };

      return result;
    }
  }

}

export function formatDate(date: Date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month, year].join('.');
}
