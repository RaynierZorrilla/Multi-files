import { FileUpload } from '../components';

export const UploadPage = () => {
  return (
    <div className="py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Files</h1>
        <p className="text-gray-600">Upload images, videos, and documents to your storage</p>
      </div>
      <FileUpload />
    </div>
  );
};
