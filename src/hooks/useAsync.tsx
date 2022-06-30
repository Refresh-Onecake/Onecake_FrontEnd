import {useCallback, useEffect, useState} from 'react';
/**
 * @author min
 * 
 * @description React 훅 함수의 callback function 안에서는 async 함수를 사용하지 못합니다.
 * 그래서 이를 해결할 수 있는 방법으로 asyncFn등과 같은 중첩함수(nest function)을 만들어 줄 수 있습니다.
 * 하지만 이의 문제는 asynFc 함수 내에서 reject가 발생할 경우 이에 대한 에러 핸들링을 할 수 있는 방법이 존재하지 않습니다.
 * error 문에 대해서 error : initialState, setError : setter를 가진 useState를 생성해주고 그리고 .catch 문을 이용해서 setter 함수를 통해 오류를 수정 수 있으나
 * 하지만 이렇게 매번 작성해주는 것은 매우 번거롭기 때문에 custom Hook으로 분리해주었습니다.
 * 
 * @param asyncCallback 
 * @param deps 
 * @returns Error | null
 * 
 * @example
  const [fetchInfo, setFetchInfo] = useState<IFetchInfo>([]);
   const [error, resetError] = useAsync(async () => {
    setFetchInfo([]);
    //화면에 보이는 error 문구 제거 함수
    resetError(); // useCallback을 통해 만들어졌기 때문에 최적화되어 있다.
    // Error 타입 객체가 reject되는 경우 테스트할 시 주석 제거
    // await Promise.reject(new Error('some error occurs'));
    const fetchData = await getSomeFetch(); // 비동기 처리로 데이터를 받아오는 부분이다.

    setFetchInfo(fetchInfo);
  });
  */
export const useAsync = <T,>(
  asyncCallback: () => Promise<T>,
  deps: any[] = [],
): [Error | null, () => void] => {
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    asyncCallback().catch(setError);
  }, deps);
  const resetError = useCallback(() => setError(notUsed => null), []);
  return [error, resetError];
};
