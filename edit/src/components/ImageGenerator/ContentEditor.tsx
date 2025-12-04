import { useState, useRef } from "react";
import { Upload, Trash2, Type, FileText, Image } from "lucide-react";

interface ContentEditorProps {
  title: string;
  subtitle: string;
  logo?: string;
  onTitleChange: (title: string) => void;
  onSubtitleChange: (subtitle: string) => void;
  onLogoChange: (logo?: string) => void;
}

const ContentEditor = ({
  title,
  subtitle,
  logo,
  onTitleChange,
  onSubtitleChange,
  onLogoChange,
}: ContentEditorProps) => {
  const [dragging, setDragging] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTitleChange(e.target.value);
  };

  const handleSubtitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onSubtitleChange(e.target.value);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast("Image too large. Maximum size is 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        onLogoChange(event.target?.result as string);
        showToast("Logo uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast("Image too large. Maximum size is 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        onLogoChange(event.target?.result as string);
        showToast("Logo uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onLogoChange(undefined);
    showToast("Logo removed");
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 bg-white text-black px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-down">
          {toast}
        </div>
      )}

      {/* Title Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Type className="h-4 w-4 text-blue-400" />
          <label htmlFor="title" className="text-sm font-medium text-white/90">
            Title
          </label>
          <span className="text-xs text-white/40">({title.length}/100)</span>
        </div>
        <textarea
          id="title"
          value={title}
          onChange={handleTitleChange}
          maxLength={100}
          placeholder="Enter your main title..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none"
          rows={2}
        />
      </div>

      {/* Subtitle Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-purple-400" />
          <label htmlFor="subtitle" className="text-sm font-medium text-white/90">
            Subtitle
          </label>
          <span className="text-xs text-white/40">({subtitle.length}/150)</span>
        </div>
        <textarea
          id="subtitle"
          value={subtitle}
          onChange={handleSubtitleChange}
          maxLength={150}
          placeholder="Add a compelling subtitle..."
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
          rows={2}
        />
      </div>

      {/* Logo Upload Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Image className="h-4 w-4 text-green-400" />
          <label htmlFor="logo" className="text-sm font-medium text-white/90">
            Logo or Image
          </label>
          {logo && (
            <span className="text-xs text-green-400 ml-auto">✓ Uploaded</span>
          )}
        </div>
        
        <div
          className={`relative h-40 rounded-xl border-2 border-dashed transition-all duration-300 ${
            dragging
              ? "border-green-500 bg-green-500/10 scale-[1.02]"
              : "border-white/10 hover:border-white/30 hover:bg-white/5"
          } flex items-center justify-center cursor-pointer overflow-hidden group`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {logo ? (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img
                src={logo}
                alt="Logo preview"
                className="max-h-full max-w-full object-contain drop-shadow-2xl"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeLogo();
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-red-500/90 text-white hover:bg-red-600 transition-all hover:scale-110 shadow-lg"
                aria-label="Remove logo"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="h-8 w-8 text-green-400" />
              </div>
              <p className="text-sm font-medium text-white/80 mb-1">
                Drag & drop or click to upload
              </p>
              <p className="text-xs text-white/40">
                PNG, JPG or SVG • Max 2MB
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            id="logo"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
        <p className="text-xs text-blue-300/70 leading-relaxed">
          💡 <span className="font-medium">Pro tip:</span> Use clear, concise titles and high-contrast logos for better social media engagement.
        </p>
      </div>
    </div>
  );
};

export default ContentEditor;