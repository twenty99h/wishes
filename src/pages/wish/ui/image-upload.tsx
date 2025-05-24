import type React from 'react';

import { cn } from '@/shared/lib/utils';
import { Button, Input } from '@/shared/ui';
import { Upload, X } from 'lucide-react';
import { useRef, useState, type ChangeEvent } from 'react';
import { toast } from 'sonner';

interface ImageUploadProps {
  imageUrl?: string;
  value?: string;
  onChange: (value: File | null) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, imageUrl, className }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(imageUrl ?? value ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Функция для обработки загрузки файла
  const handleFileUpload = async (file: File) => {
    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      toast('Ошибка', {
        description: 'Пожалуйста, загрузите изображение',
      });
      return;
    }

    // Проверка размера файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast('Ошибка', {
        description: 'Размер файла не должен превышать 5MB',
      });
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    onChange(file);
  };

  // Обработчик изменения input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // Обработчики drag-and-drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Обработчик клика по кнопке
  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  // Обработчик удаления изображения
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <Input ref={inputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />

      {previewUrl ? (
        <div className="relative rounded-lg overflow-hidden border border-border">
          <div className="h-full relative">
            <img src={previewUrl} alt="Предпросмотр" className="w-full h-128 object-cover" />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
            dragActive ? 'border-primary bg-primary/5' : 'border-border',
            'hover:border-primary hover:bg-primary/5 cursor-pointer'
          )}
          onClick={handleButtonClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="rounded-full bg-primary/10 p-3">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-medium">Перетащите изображение сюда или нажмите для выбора</p>
              <p className="text-sm text-muted-foreground mt-1">PNG, JPG или GIF (макс. 5MB)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
