import { useState, useEffect } from 'react';

const useFetchRoster = (ref) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ref.current) {
      (async () => {
        try {
          const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/1GEP9S0xt1JBPLs3m0DoEOaQdwxwD8CEPFOXyxlxIKkg/values/GHIN_Numbers?key=AIzaSyCWOTHZxzxvJS7990cNcvF8pSWEoEf_cbg`
          );
          const result = await response.json();
          console.log('😊😊 result', result);
          console.log('😊😊 data.values', result.values);
          setData(result.values);
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
  }, [ref]);
  return { loading, data, error };
};

export default useFetchRoster;
