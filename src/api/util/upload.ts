import { uploadFile } from '/@/common/http';
export type uploadData = {
  url: string;
  filePath: string;
  name: string;
};

export const upload = (uploadData: uploadData) => {
  return uploadFile({
    url: uploadData.url,
    filePath: uploadData.filePath,
    name: uploadData.name,
  });
};
