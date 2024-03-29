import { atom, useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { IProduct } from '../types/Types';

export const LocalStorageKeys = {
    HAS_FIRST_JOIN_TIME: 'HAS_FIRST_JOIN_TIME',
    SHOP_PRODUCTS: 'SHOP_PRODUCTS',
    CART_PRODUCTS: 'CART_PRODUCTS'
  }
const atomCache: any = {};
const createLocalStorageAtom = (key: string) => {
  if (!atomCache[key]) {
    atomCache[key] = atom({
      key: 'useLocalStorage_' + key,
      default: null,
    });
  }
  return atomCache[key];
};

export function useLocalStorage(key: string): [IProduct[] | null, (value: IProduct[]) => Promise<void>] {
  const asyncStorageAtom = createLocalStorageAtom(key);
  const [storageValue, setRecoilValue] = useRecoilState(asyncStorageAtom);

  useEffect(() => {
    const fetchValue = async () => {
      const value = localStorage.getItem(key);
      setRecoilValue(JSON.parse(value || '[]'));
    };
    fetchValue();
  }, [key, setRecoilValue]);

  const setValue = async (value: IProduct[]) => {
    localStorage.setItem(key, JSON.stringify(value));
    setRecoilValue(value);
  };

  return [storageValue as IProduct[], setValue];
}