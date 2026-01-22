import * as React from "react";
import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";
import { Button } from "../fundamental/button";
import { Progress } from "../fundamental/progress";
import { Icon } from "../fundamental/icon";
import { Badge } from "../fundamental/badge";

// File upload context
interface FileUploadContextValue {
  files: FileUploadFile[];
  onFilesChange: (files: FileUploadFile[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: string[];
  disabled?: boolean;
  multiple?: boolean;
  onUpload?: (files: File[]) => Promise<void>;
}

const FileUploadContext = React.createContext<FileUploadContextValue | null>(
  null,
);

const useFileUpload = () => {
  const context = React.useContext(FileUploadContext);
  if (!context) {
    throw new Error("useFileUpload must be used within a FileUpload component");
  }
  return context;
};

// File upload types
export interface FileUploadFile {
  id: string;
  file: File;
  status: "pending" | "uploading" | "success" | "error";
  progress?: number;
  error?: string;
  preview?: string;
}

// Main FileUpload component
export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  files: FileUploadFile[];
  onFilesChange: (files: FileUploadFile[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  accept?: string[];
  disabled?: boolean;
  multiple?: boolean;
  onUpload?: (files: File[]) => Promise<void>;
}

const FileUploadRoot = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      files,
      onFilesChange,
      maxFiles = 10,
      maxSize = 10 * 1024 * 1024, // 10MB
      accept,
      disabled = false,
      multiple = true,
      onUpload,
      children,
      ...props
    },
    ref,
  ) => {
    const contextValue: FileUploadContextValue = React.useMemo(
      () => ({
        files,
        onFilesChange,
        maxFiles,
        maxSize,
        accept,
        disabled,
        multiple,
        onUpload,
      }),
      [
        files,
        onFilesChange,
        maxFiles,
        maxSize,
        accept,
        disabled,
        multiple,
        onUpload,
      ],
    );

    return (
      <FileUploadContext.Provider value={contextValue}>
        <div ref={ref} className={cn("space-y-4", className)} {...props}>
          {children}
        </div>
      </FileUploadContext.Provider>
    );
  },
);
FileUploadRoot.displayName = "FileUploadRoot";

// Dropzone component
const dropzoneVariants = cva(
  "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors duration-200",
  {
    variants: {
      isDragActive: {
        true: "border-[var(--color-border-brand-bold)] bg-[var(--color-background-brand-subtle)]",
        false:
          "border-[var(--color-interaction-border-input)] hover:border-[var(--color-border-brand-bold)]",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      isDragActive: false,
      disabled: false,
    },
  },
);

export interface FileUploadDropzoneProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FileUploadDropzone = React.forwardRef<
  HTMLDivElement,
  FileUploadDropzoneProps
>(({ className, children, ...props }, ref) => {
  const {
    files,
    onFilesChange,
    maxFiles,
    maxSize,
    accept,
    disabled,
    multiple,
  } = useFileUpload();
  const [isDragActive, setIsDragActive] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File size must be less than ${formatFileSize(maxSize)}`;
    }

    if (accept && accept.length > 0) {
      const fileType = file.type;
      const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;

      const isValidType = accept.some((acceptType) => {
        if (acceptType.startsWith(".")) {
          return acceptType.toLowerCase() === fileExtension;
        }
        if (acceptType.includes("*")) {
          const baseType = acceptType.split("/")[0];
          return fileType.startsWith(baseType);
        }
        return fileType === acceptType;
      });

      if (!isValidType) {
        return `File type not supported. Accepted types: ${accept.join(", ")}`;
      }
    }

    return null;
  };

  const processFiles = (fileList: FileList) => {
    const newFiles: FileUploadFile[] = [];
    const currentFileCount = files.length;

    Array.from(fileList).forEach((file, index) => {
      if (maxFiles && currentFileCount + newFiles.length >= maxFiles) return;

      const error = validateFile(file);
      const fileUpload: FileUploadFile = {
        id: `${Date.now()}-${index}`,
        file,
        status: error ? "error" : "pending",
        error: error || undefined,
        progress: 0,
      };

      // Generate preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const updatedFiles = files.map((f) =>
            f.id === fileUpload.id
              ? { ...f, preview: e.target?.result as string }
              : f,
          );
          onFilesChange(updatedFiles);
        };
        reader.readAsDataURL(file);
      }

      newFiles.push(fileUpload);
    });

    if (newFiles.length > 0) {
      onFilesChange([...files, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (disabled) return;

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      processFiles(selectedFiles);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = "";
  };

  return (
    <div
      ref={ref}
      className={cn(dropzoneVariants({ isDragActive, disabled }), className)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label="Upload files"
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept?.join(",")}
        disabled={disabled}
        className="hidden"
        onChange={handleInputChange}
      />
      {children}
    </div>
  );
});
FileUploadDropzone.displayName = "FileUploadDropzone";

// File upload trigger button
export interface FileUploadTriggerProps
  extends React.ComponentProps<typeof Button> {}

const FileUploadTrigger = React.forwardRef<
  HTMLButtonElement,
  FileUploadTriggerProps
>(({ children, ...props }, ref) => {
  const { disabled } = useFileUpload();

  return (
    <Button ref={ref} disabled={disabled} {...props}>
      {children}
    </Button>
  );
});
FileUploadTrigger.displayName = "FileUploadTrigger";

// File list component
export interface FileUploadListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FileUploadList = React.forwardRef<HTMLDivElement, FileUploadListProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    );
  },
);
FileUploadList.displayName = "FileUploadList";

// Individual file item
export interface FileUploadItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  file: FileUploadFile;
}

const FileUploadItem = React.forwardRef<HTMLDivElement, FileUploadItemProps>(
  ({ className, file, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 rounded-lg border p-3",
          "border-[var(--color-border-primary)]",
          file.status === "error" &&
            "border-[var(--color-border-error-bold)] bg-[var(--color-background-error-subtle)]",
          file.status === "success" &&
            "border-[var(--color-border-success-bold)] bg-[var(--color-background-success-subtle)]",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FileUploadItem.displayName = "FileUploadItem";

// File preview
export interface FileUploadItemPreviewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  file: FileUploadFile;
}

const FileUploadItemPreview = React.forwardRef<
  HTMLDivElement,
  FileUploadItemPreviewProps
>(({ className, file, ...props }, ref) => {
  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return "image";
    if (type.startsWith("video/")) return "video";
    if (type.startsWith("audio/")) return "volume-2";
    if (type.includes("pdf")) return "file-text";
    if (type.includes("text/") || type.includes("application/json"))
      return "file-text";
    return "file";
  };

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded",
        className,
      )}
      {...props}
    >
      {file.preview ? (
        <img
          src={file.preview}
          alt={file.file.name}
          className="h-full w-full rounded object-cover"
        />
      ) : (
        <Icon
          name={getFileIcon(file.file.type) as any}
          className="h-5 w-5 text-[var(--color-text-secondary)]"
        />
      )}
    </div>
  );
});
FileUploadItemPreview.displayName = "FileUploadItemPreview";

// File metadata
export interface FileUploadItemMetadataProps
  extends React.HTMLAttributes<HTMLDivElement> {
  file: FileUploadFile;
}

const FileUploadItemMetadata = React.forwardRef<
  HTMLDivElement,
  FileUploadItemMetadataProps
>(({ className, file, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("flex-1 space-y-1", className)} {...props}>
      <div className="flex items-center gap-2">
        <p className="text-body-sm truncate font-medium">{file.file.name}</p>
        <Badge>
          {file.status}
        </Badge>
      </div>
      <p className="text-caption-sm text-[var(--color-text-secondary)]">
        {formatFileSize(file.file.size)}
      </p>
      {file.error && (
        <p className="text-caption-sm text-[var(--color-text-error-bold)]">
          {file.error}
        </p>
      )}
    </div>
  );
});
FileUploadItemMetadata.displayName = "FileUploadItemMetadata";

// File progress
export interface FileUploadItemProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  file: FileUploadFile;
  variant?: "linear" | "circular";
}

const FileUploadItemProgress = React.forwardRef<
  HTMLDivElement,
  FileUploadItemProgressProps
>(({ className, file, variant = "linear", ...props }, ref) => {
  if (file.status !== "uploading" || file.progress === undefined) return null;

  return (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      <Progress value={file.progress} className="h-2" />
      <p className="text-caption-sm mt-1 text-[var(--color-text-secondary)]">
        {Math.round(file.progress)}%
      </p>
    </div>
  );
});
FileUploadItemProgress.displayName = "FileUploadItemProgress";

// File delete button
export interface FileUploadItemDeleteProps
  extends React.ComponentProps<typeof Button> {
  file: FileUploadFile;
}

const FileUploadItemDelete = React.forwardRef<
  HTMLButtonElement,
  FileUploadItemDeleteProps
>(({ file, ...props }, ref) => {
  const { files, onFilesChange } = useFileUpload();

  const handleDelete = () => {
    const updatedFiles = files.filter((f) => f.id !== file.id);
    onFilesChange(updatedFiles);
  };

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      aria-label={`Remove ${file.file.name}`}
      {...props}
    >
      <Icon name="x" className="h-4 w-4" />
    </Button>
  );
});
FileUploadItemDelete.displayName = "FileUploadItemDelete";

// Utility functions
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Compound component export
export const FileUpload = {
  Root: FileUploadRoot,
  Dropzone: FileUploadDropzone,
  Trigger: FileUploadTrigger,
  List: FileUploadList,
  Item: FileUploadItem,
  ItemPreview: FileUploadItemPreview,
  ItemMetadata: FileUploadItemMetadata,
  ItemProgress: FileUploadItemProgress,
  ItemDelete: FileUploadItemDelete,
};

// Export individual components for direct import
export {
  FileUploadRoot,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemMetadata,
  FileUploadItemProgress,
  FileUploadItemDelete,
  useFileUpload,
  formatFileSize,
};

