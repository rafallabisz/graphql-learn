import { Stream } from 'stream';

export interface Upload {
  filename: string;
  mimetype: string;
  endocing: string;
  createReadStream: () => Stream;
}
