/**
 * @author min
 * @description assert를 활용한 타입 가드를 하고자 하여 만들었습니다.
 * @param value assert를 활용하여 타입가드를 하고자 하는 값
 * @param errorMsg 타입가드가 실패하였을 때 throw 하고자 하는 에러 메세지
 * @example
function toString(value?: number) {
  assert(value !== undefined, "value 는 undefined 가 아니어야 한다.");
  return value.toFixed(2);
}
assert 로 타입 가드가 적용되면서 toFixed 사용 시 타입 에러가 발생하지 않습니다.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function assert(value: any, errorMsg: string): asserts value {
  if (!value) throw new Error(errorMsg);
}
