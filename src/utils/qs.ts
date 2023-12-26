/**
 * 解析url参数为一个对象
 * 例如：queryStringParse('https://www.com/?foo=bnar&name=%E6%B1%AA%E5%BE%AE#123')=>{foo: "bnar", name: "汪微", #: "123"}
 * @param {*} str
 * @returns
 */
export const queryStringParse: (string) => any = (str = '') => {
  const [queryString, hash] = str.split('#');
  return Object.assign(
    queryString
      .replace('?', '')
      .split('&')
      .map((kv) => kv.split('='))
      .reduce((result, [key, value]) => {
        result[key] = value;
        return result;
      }, {}),
    { '#': hash },
  );
};

/**
 * 将对象转换为queryString
 *
 * @example ({ foo: 10, bar: '20', '#': 'SOME_STRING'  }) => '?foo=10&bar=20#SOME_STRING'
 * @param params
 */
export const queryString = (params: any) => {
  if (!params) return '';
  const urlHash = params['#'];
  let curHash = '';
  delete params['#'];
  if (urlHash) {
    curHash = `#${urlHash}`;
  }

  const norParams = Object.entries(params)
    .filter(([, value]) => typeof value !== 'undefined' && String(value).length > 0)
    .reduce((result, current, index) => `${result}${index ? '&' : '?'}${current[0]}=${current[1]}`, '');

  return norParams + curHash;
};
