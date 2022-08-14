import { onMounted, ref } from 'vue';
import { ILocationQuery, ISOCodeEnum } from '../models';

/**
 * init location query
 * @returns {ILocationQuery}
 */
const initLocation = (): ILocationQuery => {
  const query = new URLSearchParams(location.search);
  const from = query.get('from')?.toUpperCase() ?? ISOCodeEnum.CNY;
  const to = query.get('to')?.toUpperCase() ?? ISOCodeEnum.USD;
  return {
    from: ISOCodeEnum[from] ?? ISOCodeEnum.CNY,
    to: ISOCodeEnum[to] ?? ISOCodeEnum.USD
  };
};

export const useLocation = () => {
  const search = ref<ILocationQuery>(initLocation());

  const replace = (locationQuery: ILocationQuery) => {
    const query = Object.entries(locationQuery)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    search.value = locationQuery;
    history.replaceState(null, '', `?${query}`);
  };

  // init query string from url
  onMounted(() => {
    replace(search.value);
  });

  return { search, replace };
};
