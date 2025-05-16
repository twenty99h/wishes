import React, { useRef, useState } from 'react';
import { Button } from './button';
import { Flex } from './flex';
import { FormControl } from './form';
import { Input } from './input';
import { FileIcon, X } from 'lucide-react';

type FileUploaderProps = {
  value?: string;
  onChange: (value: string) => void;
  accept?: string;
  uploadUrl?: string;
};

type FileInfo = {
  name: string;
  size: number;
  type: string;
  dataUrl?: string;
  isUploading?: boolean;
  uploadProgress?: number;
};

export function FileUploader({ onChange, accept, value, uploadUrl }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Если есть значение, но нет информации о файле, значит это уже загруженный файл
  React.useEffect(() => {
    if (value && !fileInfo) {
      // Предполагаем, что это dataURL или URL файла
      setFileInfo({
        name: 'Загруженный файл',
        size: 0,
        type: '',
        dataUrl: value,
      });
    }
  }, [value, fileInfo]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Сохраняем информацию о файле
    const newFileInfo: FileInfo = {
      name: file.name,
      size: file.size,
      type: file.type,
      isUploading: !!uploadUrl,
    };

    setFileInfo(newFileInfo);

    // Читаем файл как dataURL для превью
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setFileInfo((prev) => (prev ? { ...prev, dataUrl: result } : null));

        // Если нет URL для загрузки, просто передаем dataURL
        if (!uploadUrl) {
          onChange(result);
        }
      }
    };
    reader.readAsDataURL(file);

    // Если указан URL для загрузки, отправляем файл на сервер
    if (uploadUrl) {
      await uploadFile(file);
    }
  };

  const uploadFile = async (file: File) => {
    if (!uploadUrl) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки файла');
      }

      const data = await response.json();

      // Предполагаем, что сервер возвращает URL загруженного файла
      if (data.url) {
        onChange(data.url);
      }
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error);
    } finally {
      setIsUploading(false);
      setFileInfo((prev) => (prev ? { ...prev, isUploading: false } : null));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFileInfo(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Функция для форматирования размера файла
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Байт';
    const k = 1024;
    const sizes = ['Байт', 'КБ', 'МБ', 'ГБ'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <FormControl>
      <div className="w-full">
        <Input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept={accept} />

        {!fileInfo ? (
          <Flex gap={2}>
            <Button type="button" variant="outline" onClick={handleButtonClick} disabled={isUploading}>
              Выбрать файл
            </Button>
          </Flex>
        ) : (
          <div className="border rounded-md p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileIcon size={20} />
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-[200px]">{fileInfo.name}</span>
                {fileInfo.size > 0 && <span className="text-xs text-gray-500">{formatFileSize(fileInfo.size)}</span>}
                {fileInfo.isUploading && <span className="text-xs text-blue-500">Загрузка...</span>}
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleRemoveFile}
              disabled={isUploading}
              className="h-8 w-8 p-0"
            >
              <X size={16} />
            </Button>
          </div>
        )}
      </div>
    </FormControl>
  );
}
