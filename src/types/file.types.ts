
export interface FileOut {
  id: number;
  uuid: string;
  original_name: string;
  content_type: string;
  size: number;
  ext: string;
  width?: number | null;
  height?: number | null;
  created_at: string;
}

export type FileMetadata = FileOut;

export type UploadResponse = FileOut[];

export interface FileUploadProgress {
  filename: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export interface FileListParams {
  limit?: number;
  offset?: number;
  content_type?: string;
  q?: string;
  min_size?: number;
  max_size?: number;
}

export interface DeleteResponse {
  ok: boolean;
}
