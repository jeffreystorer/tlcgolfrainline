import { useState, useEffect } from 'react';

const useFetch = (spreadsheetId, sheetName, ref) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [headings, setHeadings] = useState(null);

  useEffect(() => {
    if (ref.current) {
      (async () => {
        try {
          const response = await fetch(
            `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`
          );
          const result = await response.text();
          console.log('😊😊 result', result);
          const json = JSON.parse(
            result.replace(
              /.*google.visualization.Query.setResponse\({(.*?)}\);?/s,
              '{$1}'
            )
          );
          const headingsData = json.table.cols.map((item) => item.label);
          console.log('😊😊 headingsData', headingsData);
          setHeadings(headingsData);
          console.log('😊😊 json.table.rows', json.table.rows);
          const responseData = json.table.rows.map((item) => {
            let row = {};
            item.c.forEach((cell, idx) => {
              row[headingsData[idx]] = cell?.v ?? null;
            });
            return row;
          });
          console.log('😊😊 responseData', responseData);
          responseData.forEach((item, index) =>
            console.log('😊😊 item: ', index, item, typeof item['H.I.'])
          );
          setData(responseData);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      })();
    }
    return () => {
      ref.current = false;
    };
  }, [spreadsheetId, sheetName, ref]);
  return { loading, headings, data, error };
};

export default useFetch;
