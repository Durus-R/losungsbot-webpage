import Papa from 'papaparse';
import { delimiter, entry, get_today, webData } from 'src/lib/data';
import sanitizeHtml from 'sanitize-html';


export function parse(origin: string, callback: (data: Papa.ParseResult<never>) => void) {
  Papa.parse(`${origin}/Losungen_${(new Date()).getFullYear()}.csv`, {
    encoding: 'utf-8',
    download: true,
    complete: callback,
    header: true,
    delimiter: delimiter
  });
}

const strong_regex = /\/(.*?)\//g;

export function parseResult(result : Papa.ParseResult<never>, date : Date) {
  const jsonData = result.data as entry[];
  const today_data = get_today(jsonData, date);
  const output : webData = {
    at_text: '',
    at_source: '',
    nt_text: '',
    nt_source: ''
  }
  output.at_text =
    sanitizeHtml(today_data?.at_text.replaceAll(
      strong_regex,
      '<strong>$1</strong>'
    ) ?? '');
  output.at_source = today_data?.at_source ?? '';
  output.nt_text =
    sanitizeHtml(today_data?.nt_text.replaceAll(
      strong_regex,
      '<strong>$1</strong>'
    ) ?? '');
  output.nt_source = today_data?.nt_source ?? '';
  return output
}
