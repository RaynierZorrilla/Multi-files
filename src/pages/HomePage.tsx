import { Upload, FolderOpen, Zap, Sparkles } from 'lucide-react';
import { Link } from '../components/Link';
import { Button } from '../components/ui/Button';

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Floating badge */}
          <div className="mb-8 inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-foreground/80">Modern file management reimagined</span>
          </div>

          {/* Main heading */}
          <h1 className="text-balance text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-4 sm:mb-6 px-4 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
            Store and manage your files with style
          </h1>

          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-pretty text-base sm:text-lg leading-7 sm:leading-8 text-foreground/60 px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Upload, organize, and access your files from anywhere. Experience the future of cloud storage with our
            beautiful and intuitive interface.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-12 px-6 sm:px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
            >
              <Link to="/upload">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 px-6 sm:px-8 rounded-full glass hover:glass-strong bg-transparent"
            >
              <Link to="/gallery">View Gallery</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Everything you need</h2>
          <p className="mt-4 text-pretty text-foreground/60">Powerful features wrapped in a beautiful interface</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature Card 1 */}
          <div className="group relative glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:glass-strong transition-all duration-300 shimmer hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10">
            <div className="mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10">
              <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h3 className="mb-3 text-lg sm:text-xl font-semibold">Easy Upload</h3>
            <p className="text-pretty text-sm sm:text-base text-foreground/60 leading-relaxed">
              Drag and drop your files or click to browse. Upload multiple files at once with our intuitive interface.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="group relative glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:glass-strong transition-all duration-300 shimmer hover:scale-[1.02] hover:shadow-xl hover:shadow-secondary/10">
            <div className="mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-secondary/10">
              <FolderOpen className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
            </div>
            <h3 className="mb-3 text-lg sm:text-xl font-semibold">Organized Storage</h3>
            <p className="text-pretty text-sm sm:text-base text-foreground/60 leading-relaxed">
              Keep your files organized with smart categorization and powerful search capabilities.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="group relative glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:glass-strong transition-all duration-300 shimmer hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/10 sm:col-span-2 lg:col-span-1">
            <div className="mb-4 inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-accent/10">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
            </div>
            <h3 className="mb-3 text-lg sm:text-xl font-semibold">Fast & Secure</h3>
            <p className="text-pretty text-sm sm:text-base text-foreground/60 leading-relaxed">
              Lightning-fast uploads and downloads with enterprise-grade security to keep your data safe.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:px-8">
        <div className="relative glass-strong rounded-2xl sm:rounded-[2rem] p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pointer-events-none" />

          <div className="relative text-center">
            <h2 className="text-balance text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4">Ready to get started?</h2>
            <p className="mx-auto max-w-xl text-pretty text-base sm:text-lg text-foreground/60 mb-6 sm:mb-8 px-4">
              Join thousands of users who trust us with their files. Start uploading today.
            </p>
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-12 px-6 sm:px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
            >
              <Link to="/upload">Upload Your First File</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
