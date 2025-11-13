# File Management System

A modern, full-featured file management web application built with React, TypeScript, and Vite. Upload, preview, and manage your files with an intuitive and beautiful user interface.

## ✨ Features

### 📤 File Upload
- **Drag & Drop**: Intuitive drag-and-drop interface for easy file uploads
- **Multiple Files**: Upload multiple files simultaneously
- **Progress Tracking**: Real-time upload progress indicators
- **File Type Support**:
  - Images: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
  - Videos: `.mp4`, `.webm`, `.mov`, `.avi`, `.mkv`, `.flv`, `.wmv`, `.m4v`
  - Documents: `.pdf`, `.txt`, `.csv`
- **File Size Limit**: Up to 500 MB per file

### 🖼️ File Gallery
- **Grid View**: Beautiful card-based grid layout
- **Thumbnails**: Automatic thumbnail generation for images
- **Video Previews**: First frame preview for video files
- **PDF Placeholders**: Visual indicators for PDF documents
- **File Information**: Display file size, type, and upload date

### 👁️ File Preview
- **Full Preview Modal**: Click any file to view it in a full-screen modal
- **Image Viewer**: High-quality image viewing with zoom support
- **Video Player**: Built-in HTML5 video player with controls
- **Document Info**: Detailed metadata display for non-previewable files
- **Quick Actions**: Download and delete directly from preview

### 🗑️ File Management
- **Delete Confirmation**: Elegant modal confirmation before deletion
- **Toast Notifications**: Success and error notifications for all actions
- **Auto-refresh**: Automatic list updates after operations

### 🎨 User Interface
- **Modern Design**: Clean, responsive design with Tailwind CSS
- **Dark Overlays**: Professional modal overlays
- **Smooth Animations**: Polished transitions and animations
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A running file server API (see API Documentation below)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "project 2"
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (optional):
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── FileCard.tsx     # File card component
│   ├── FileList.tsx     # File list/grid component
│   ├── FileUpload.tsx   # Upload component
│   ├── FilePreviewModal.tsx  # Preview modal
│   ├── ConfirmDeleteModal.tsx # Delete confirmation
│   ├── Toast.tsx        # Toast notification component
│   └── ...
├── pages/               # Page components
│   ├── HomePage.tsx
│   ├── UploadPage.tsx
│   └── GalleryPage.tsx
├── hooks/               # Custom React hooks
│   ├── useFiles.ts      # File list hook
│   ├── useFileUpload.ts # Upload hook
│   └── useFileDelete.ts # Delete hook
├── services/            # API services
│   └── file.service.ts  # File API service
├── contexts/           # React contexts
│   └── ToastContext.tsx # Toast notification context
├── types/              # TypeScript types
│   └── file.types.ts   # File-related types
└── config/             # Configuration
    └── api.config.ts   # API configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## 🌐 API Integration

This application requires a backend API server. The API should implement the following endpoints:

### Base URL
```
http://localhost:8000
```

### Endpoints

- `POST /upload` - Upload files
- `GET /files` - List files (supports query parameters: limit, offset, content_type, q, min_size, max_size)
- `GET /files/{id}` - Get file metadata
- `GET /files/{id}/download` - Download file
- `GET /images/{id}/thumbnail` - Get image thumbnail (supports w, h, fit parameters)
- `DELETE /files/{id}` - Delete file

See the API documentation for detailed endpoint specifications.

## 🛠️ Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Query (TanStack Query)** - Server state management
- **Axios** - HTTP client
- **Lucide React** - Icon library

## 📝 Features in Detail

### Toast Notifications
- Success notifications for successful uploads
- Error notifications for failed operations
- Auto-dismiss after 5 seconds
- Manual dismiss option
- Multiple toast support

### File Preview
- **Images**: Full-resolution preview with proper aspect ratio
- **Videos**: HTML5 video player with play controls
- **Documents**: Metadata display with download option
- Keyboard support (ESC to close)
- Click outside to close

### File Cards
- Thumbnail previews for images
- Video frame previews
- PDF document indicators
- File metadata (name, size, date)
- Quick action buttons (download, delete, preview)

## 🎯 Usage

1. **Upload Files**: Navigate to the Upload page and drag files or click to select
2. **View Gallery**: Browse all uploaded files in the Gallery page
3. **Preview Files**: Click any file card to open the preview modal
4. **Download Files**: Use the download button on any file card or in the preview modal
5. **Delete Files**: Click the delete button and confirm in the modal

## 🔒 Error Handling

- Network error detection and user-friendly messages
- Server error handling with detailed feedback
- CORS error detection and troubleshooting tips
- File upload error handling with retry suggestions

## 🎨 Customization

### Styling
The application uses Tailwind CSS. Customize colors, spacing, and other design tokens in `tailwind.config.js`.

### API Configuration
Modify API endpoints and settings in `src/config/api.config.ts`.

### File Size Limits
Adjust the maximum file size in `src/config/api.config.ts`:
```typescript
MAX_FILE_SIZE_MB: 500
```

## 📦 Building for Production

```bash
npm run build
```

The production build will be created in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🐛 Troubleshooting

### CORS Errors
If you encounter CORS errors, ensure your API server has CORS enabled and allows requests from your frontend origin.

### File Upload Fails
- Check that the file size is within the limit (500 MB)
- Verify the file type is supported
- Ensure the API server is running and accessible

### Preview Not Working
- Check browser console for errors
- Verify the file exists on the server
- Ensure proper CORS headers are set

## 📞 Support

For issues and questions, please contact the development team.

---

Built with ❤️ using React and TypeScript

