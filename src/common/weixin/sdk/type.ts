type shareParams = {
  title: string;
  desc: string;
  imgUrl: string;
};
export type shareFunc = {
  (shareParams: shareParams): void;
};
