import {useState, useEffect} from 'react';

export const useDebounce = <T>(value: T, delay: number) : T => {
    const [deBouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(()=>{
        const handler = setTimeout(()=> {
            setDebouncedValue(value);
        },delay);
        
        return () => {
          clearTimeout(handler);  
        };
    },[value,delay])

    return deBouncedValue;
};