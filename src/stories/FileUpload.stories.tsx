import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FileUpload, FileUploadFile } from '../components/fundamental/file-upload'
import { Card, CardContent, CardHeader, CardTitle } from '../components/fundamental/card'
import { Button } from '../components/fundamental/button'
import { Icon } from '../components/fundamental/icon'
import { Badge } from '../components/fundamental/badge'

const meta: Meta<typeof FileUpload.Root> = {
  title: 'NPM • Fundamental/FileUpload',
  component: FileUpload.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxFiles: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Maximum number of files allowed',
    },
    maxSize: {
      control: { type: 'number' },
      description: 'Maximum file size in bytes',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple file selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable file upload',
    },
  },
} satisfies Meta<typeof FileUpload.Root>

export default meta
type Story = StoryObj<typeof meta>

// Default file upload
export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<FileUploadFile[]>([])
    
    return (
      <div className="w-96 space-y-4">
        <FileUpload.Root
          files={files}
          onFilesChange={setFiles}
          maxFiles={5}
          maxSize={10 * 1024 * 1024} // 10MB
        >
          <FileUpload.Dropzone className="min-h-32">
            <div className="text-center">
              <Icon name="upload" size="l" className="mx-auto mb-2 text-[var(--color-text-tertiary)]" />
              <p className="text-body-sm font-medium mb-1">Drop files here or click to browse</p>
              <p className="text-caption-sm text-[var(--color-text-secondary)]">
                Up to 5 files, max 10MB each
              </p>
            </div>
          </FileUpload.Dropzone>
          
          {files.length > 0 && (
            <FileUpload.List>
              {files.map((file) => (
                <FileUpload.Item key={file.id} file={file}>
                  <FileUpload.ItemPreview file={file} />
                  <FileUpload.ItemMetadata file={file} />
                  <FileUpload.ItemProgress file={file} />
                  <FileUpload.ItemDelete file={file} />
                </FileUpload.Item>
              ))}
            </FileUpload.List>
          )}
        </FileUpload.Root>
      </div>
    )
  },
}

// Image upload with previews
export const ImageUpload: Story = {
  render: () => {
    const [files, setFiles] = useState<FileUploadFile[]>([])
    
    const simulateUpload = async (newFiles: File[]) => {
      // Simulate upload progress for demo
      const updatedFiles = files.map(f => ({ ...f }))
      
      newFiles.forEach((newFile, index) => {
        const fileUpload = updatedFiles.find(f => f.file === newFile)
        if (fileUpload) {
          fileUpload.status = 'uploading'
          fileUpload.progress = 0
          
          // Simulate progress
          const interval = setInterval(() => {
            fileUpload.progress = Math.min((fileUpload.progress || 0) + 10, 100)
            setFiles([...updatedFiles])
            
            if (fileUpload.progress >= 100) {
              clearInterval(interval)
              fileUpload.status = 'success'
              setFiles([...updatedFiles])
            }
          }, 200)
        }
      })
    }
    
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle>Photo Gallery Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload.Root
              files={files}
              onFilesChange={setFiles}
              accept={['image/*']}
              maxFiles={10}
              maxSize={5 * 1024 * 1024} // 5MB
              onUpload={simulateUpload}
            >
              <FileUpload.Dropzone className="min-h-32">
                <div className="text-center">
                  <Icon name="image" size="l" className="mx-auto mb-2 text-[var(--color-text-tertiary)]" />
                  <p className="text-body-sm font-medium mb-1">Upload your photos</p>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">
                    Images only, up to 5MB each
                  </p>
                  <FileUpload.Trigger className="mt-3">
                    Choose Files
                  </FileUpload.Trigger>
                </div>
              </FileUpload.Dropzone>
              
              {files.length > 0 && (
                <FileUpload.List>
                  {files.map((file) => (
                    <FileUpload.Item key={file.id} file={file}>
                      <FileUpload.ItemPreview file={file} />
                      <FileUpload.ItemMetadata file={file} />
                      <FileUpload.ItemProgress file={file} />
                      <FileUpload.ItemDelete file={file} />
                    </FileUpload.Item>
                  ))}
                </FileUpload.List>
              )}
            </FileUpload.Root>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Document upload with file type restrictions
export const DocumentUpload: Story = {
  render: () => {
    const [files, setFiles] = useState<FileUploadFile[]>([])
    
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload.Root
              files={files}
              onFilesChange={setFiles}
              accept={['.pdf', '.doc', '.docx', '.txt', '.rtf']}
              maxFiles={3}
              maxSize={20 * 1024 * 1024} // 20MB
            >
              <FileUpload.Dropzone className="min-h-32">
                <div className="text-center">
                  <Icon name="file-text" size="l" className="mx-auto mb-2 text-[var(--color-text-tertiary)]" />
                  <p className="text-body-sm font-medium mb-1">Upload documents</p>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">
                    PDF, DOC, DOCX, TXT, RTF files only
                  </p>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">
                    Max 3 files, 20MB each
                  </p>
                </div>
              </FileUpload.Dropzone>
              
              {files.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm font-medium">
                      Uploaded Files ({files.length}/3)
                    </span>
                    <Button 
                      variant="ghost" 
                      size="s"
                      onClick={() => setFiles([])}
                    >
                      Clear All
                    </Button>
                  </div>
                  
                  <FileUpload.List>
                    {files.map((file) => (
                      <FileUpload.Item key={file.id} file={file}>
                        <FileUpload.ItemPreview file={file} />
                        <FileUpload.ItemMetadata file={file} />
                        <FileUpload.ItemDelete file={file} />
                      </FileUpload.Item>
                    ))}
                  </FileUpload.List>
                </div>
              )}
            </FileUpload.Root>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Avatar upload (single file)
export const AvatarUpload: Story = {
  render: () => {
    const [files, setFiles] = useState<FileUploadFile[]>([])
    
    return (
      <div className="w-80">
        <Card>
          <CardHeader>
            <CardTitle>Profile Avatar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload.Root
              files={files}
              onFilesChange={setFiles}
              accept={['image/jpeg', 'image/png', 'image/webp']}
              maxFiles={1}
              maxSize={2 * 1024 * 1024} // 2MB
              multiple={false}
            >
              {files.length === 0 ? (
                <FileUpload.Dropzone className="aspect-square max-w-32 mx-auto">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[var(--color-background-neutral-subtlest)] rounded-full mx-auto mb-2 flex items-center justify-center">
                      <Icon name="user" size="l" className="text-[var(--color-text-tertiary)]" />
                    </div>
                    <p className="text-caption-sm font-medium mb-1">Upload avatar</p>
                    <p className="text-caption-sm text-[var(--color-text-secondary)]">
                      JPG, PNG, WebP
                    </p>
                  </div>
                </FileUpload.Dropzone>
              ) : (
                <div className="max-w-32 mx-auto">
                  {files.map((file) => (
                    <div key={file.id} className="relative">
                      <div className="aspect-square rounded-full overflow-hidden border-4 border-[var(--color-border-primary)]">
                        {file.preview ? (
                          <img 
                            src={file.preview} 
                            alt="Avatar preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-[var(--color-background-neutral-subtlest)] flex items-center justify-center">
                            <Icon name="user" size="l" className="text-[var(--color-text-tertiary)]" />
                          </div>
                        )}
                      </div>
                      <FileUpload.ItemDelete 
                        file={file}
                        className="absolute -top-2 -right-2 rounded-full bg-[var(--color-background-error-subtle)] hover:bg-[var(--color-background-error-subtle-hovered)]"
                      >
                        <Icon name="x" size="s" className="text-white" />
                      </FileUpload.ItemDelete>
                    </div>
                  ))}
                </div>
              )}
            </FileUpload.Root>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Batch upload with progress
export const BatchUpload: Story = {
  render: () => {
    const [files, setFiles] = useState<FileUploadFile[]>([])
    const [isUploading, setIsUploading] = useState(false)
    
    const uploadAll = async () => {
      setIsUploading(true)
      
      // Simulate batch upload
      const pendingFiles = files.filter(f => f.status === 'pending')
      
      for (const file of pendingFiles) {
        file.status = 'uploading'
        file.progress = 0
        setFiles([...files])
        
        // Simulate upload progress
        await new Promise(resolve => {
          const interval = setInterval(() => {
            file.progress = Math.min((file.progress || 0) + 20, 100)
            setFiles([...files])
            
            if (file.progress >= 100) {
              clearInterval(interval)
              file.status = 'success'
              setFiles([...files])
              resolve(undefined)
            }
          }, 300)
        })
      }
      
      setIsUploading(false)
    }
    
    const pendingCount = files.filter(f => f.status === 'pending').length
    const uploadingCount = files.filter(f => f.status === 'uploading').length
    const successCount = files.filter(f => f.status === 'success').length
    
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Batch File Upload</CardTitle>
              <div className="flex gap-1">
                <Badge size="s">{successCount} done</Badge>
                <Badge size="s">{pendingCount} pending</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload.Root
              files={files}
              onFilesChange={setFiles}
              maxFiles={10}
              maxSize={10 * 1024 * 1024}
            >
              <FileUpload.Dropzone className="min-h-24">
                <div className="text-center">
                  <Icon name="upload-cloud" size="l" className="mx-auto mb-2 text-[var(--color-text-tertiary)]" />
                  <p className="text-body-sm font-medium">Add files to upload queue</p>
                </div>
              </FileUpload.Dropzone>
              
              {files.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-body-sm font-medium">
                      Files ({files.length})
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="s"
                        onClick={() => setFiles([])}
                        disabled={isUploading}
                      >
                        Clear All
                      </Button>
                      <Button 
                        size="s"
                        onClick={uploadAll}
                        disabled={pendingCount === 0 || isUploading}
                      >
                        {isUploading ? (
                          <>
                            <Icon name="loader-2" size="s" className="mr-1 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Icon name="upload" size="s" className="mr-1" />
                            Upload All
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <FileUpload.List>
                    {files.map((file) => (
                      <FileUpload.Item key={file.id} file={file}>
                        <FileUpload.ItemPreview file={file} />
                        <div className="flex-1">
                          <FileUpload.ItemMetadata file={file} />
                          <FileUpload.ItemProgress file={file} />
                        </div>
                        <FileUpload.ItemDelete file={file} />
                      </FileUpload.Item>
                    ))}
                  </FileUpload.List>
                </div>
              )}
            </FileUpload.Root>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Error states and validation
export const ErrorStates: Story = {
  render: () => {
    const [files, setFiles] = useState<FileUploadFile[]>([
      {
        id: '1',
        file: new File([''], 'large-file.pdf', { type: 'application/pdf' }),
        status: 'error',
        error: 'File size exceeds 5MB limit',
      },
      {
        id: '2', 
        file: new File([''], 'invalid-type.exe', { type: 'application/x-msdownload' }),
        status: 'error',
        error: 'File type not supported',
      },
      {
        id: '3',
        file: new File([''], 'upload-failed.doc', { type: 'application/msword' }),
        status: 'error',
        error: 'Upload failed - network error',
      }
    ])
    
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="alert-triangle" className="text-[var(--color-text-error-bold)]" />
              Upload Errors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 border border-[var(--color-border-error-bold)] bg-[var(--color-background-error-subtle)] rounded-l">
              <p className="text-body-sm text-[var(--color-text-error-bold)]">
                Some files could not be uploaded. Please check the errors below and try again.
              </p>
            </div>
            
            <FileUpload.Root
              files={files}
              onFilesChange={setFiles}
              accept={['.pdf', '.doc', '.docx']}
              maxFiles={5}
              maxSize={5 * 1024 * 1024} // 5MB
            >
              <FileUpload.List>
                {files.map((file) => (
                  <FileUpload.Item key={file.id} file={file}>
                    <FileUpload.ItemPreview file={file} />
                    <FileUpload.ItemMetadata file={file} />
                    <FileUpload.ItemDelete file={file} />
                  </FileUpload.Item>
                ))}
              </FileUpload.List>
              
              <FileUpload.Dropzone className="min-h-20 border-dashed">
                <div className="text-center">
                  <p className="text-body-sm">Drop replacement files here</p>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">
                    PDF, DOC, DOCX only, max 5MB
                  </p>
                </div>
              </FileUpload.Dropzone>
            </FileUpload.Root>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Disabled state
export const DisabledState: Story = {
  render: () => {
    const [files] = useState<FileUploadFile[]>([])
    
    return (
      <div className="w-96">
        <Card>
          <CardHeader>
            <CardTitle>Disabled Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload.Root
              files={files}
              onFilesChange={() => {}}
              disabled={true}
            >
              <FileUpload.Dropzone className="min-h-32">
                <div className="text-center">
                  <Icon name="upload" size="l" className="mx-auto mb-2 text-[var(--color-text-tertiary)]" />
                  <p className="text-body-sm font-medium mb-1">Upload disabled</p>
                  <p className="text-caption-sm text-[var(--color-text-secondary)]">
                    File upload is temporarily unavailable
                  </p>
                </div>
              </FileUpload.Dropzone>
            </FileUpload.Root>
            
            <div className="p-3 bg-[var(--color-background-neutral-subtlest)] rounded-l">
              <p className="text-caption-sm text-[var(--color-text-secondary)]">
                Upload functionality is disabled in this state.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  },
}

// Compact file list
export const CompactFileList: Story = {
  render: () => {
    const [files, setFiles] = useState<FileUploadFile[]>([])
    
    return (
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Project Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileUpload.Root
              files={files}
              onFilesChange={setFiles}
              maxFiles={20}
            >
              <div className="flex gap-4">
                <FileUpload.Dropzone className="flex-1 min-h-20">
                  <div className="text-center">
                    <Icon name="upload" className="mx-auto mb-1" />
                    <p className="text-body-sm">Drop files or click to browse</p>
                  </div>
                </FileUpload.Dropzone>
                
                <div className="flex items-center gap-2">
                  <FileUpload.Trigger>
                    Add Files
                  </FileUpload.Trigger>
                  <Button variant="ghost" onClick={() => setFiles([])}>
                    Clear
                  </Button>
                </div>
              </div>
              
              {files.length > 0 && (
                <div className="border rounded-l">
                  <div className="p-3 border-b bg-[var(--color-background-neutral-subtlest)]">
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm font-medium">
                        {files.length} file{files.length !== 1 ? 's' : ''}
                      </span>
                      <span className="text-caption-sm text-[var(--color-text-secondary)]">
                        {files.reduce((total, file) => total + file.file.size, 0) / 1024 / 1024 < 1 
                          ? `${Math.round(files.reduce((total, file) => total + file.file.size, 0) / 1024)} KB`
                          : `${(files.reduce((total, file) => total + file.file.size, 0) / 1024 / 1024).toFixed(1)} MB`
                        } total
                      </span>
                    </div>
                  </div>
                  
                  <FileUpload.List className="divide-y">
                    {files.map((file) => (
                      <FileUpload.Item key={file.id} file={file} className="border-0 p-3">
                        <FileUpload.ItemPreview file={file} />
                        <FileUpload.ItemMetadata file={file} />
                        <FileUpload.ItemDelete file={file} />
                      </FileUpload.Item>
                    ))}
                  </FileUpload.List>
                </div>
              )}
            </FileUpload.Root>
          </CardContent>
        </Card>
      </div>
    )
  },
}