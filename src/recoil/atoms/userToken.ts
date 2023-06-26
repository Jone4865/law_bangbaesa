import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface userTokenTypes {
  hasToken: boolean;
}

export const userTokenState = atom<userTokenTypes>({
  key: 'userTokenState',
  default: {
    hasToken: false,
  },
  effects_UNSTABLE: [persistAtom],
});
