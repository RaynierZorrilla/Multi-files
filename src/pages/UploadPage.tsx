import { FileUpload } from '../components';
import { Sparkles } from 'lucide-react';

export const UploadPage = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 glass rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            <span className="text-foreground/80">Quick and easy file uploads</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent px-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
            Upload Your Files
          </h1>
          <p className="text-base sm:text-lg text-foreground/60 max-w-2xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Upload images, videos, and documents to your storage. Drag and drop or browse to get started.
          </p>
        </div>

        {/* Upload Component */}
        <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <FileUpload />
        </div>
      </div>
    </div>
  );
};
