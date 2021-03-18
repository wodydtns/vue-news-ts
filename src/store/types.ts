// store/types.ts
import { CommitOptions, DispatchOptions, Store } from "vuex";
import { Actions } from "./actions";
import { Getters } from "./getters";
import { Mutations } from "./mutations";
import { RootState } from "./state";

type MyMutations = {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};

//store에서 commit만 제외함
//omit : 특정 속성만 제거한 타입을 정의
//commit만 재정의 하기 위해서
//https://kyounghwan01.github.io/blog/TS/Fundamentals/utility-types/#pick
type MyActions = {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};
type MyGetters = {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export type MyStore = Omit<
  Store<RootState>,
  "commit" | "dispatch" | "getters"
> &
  MyMutations &
  MyActions &
  MyGetters;

/** intersaction(합집합) - A와 B 타입 합집합
type A = {
  name: string;
};
type B = {
  age: number;
};
type C = A & B;

const person: C = {
  name: "a"
  //age: 10
};
 */
