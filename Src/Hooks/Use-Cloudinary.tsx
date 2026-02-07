import { useCallback, useEffect, useState } from 'react';

interface CloudinaryResult {
  event: string;
  info: {
    secure_url: string;
  };
}

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (config: Record<string, unknown>, callback: (error: Error | null, result: CloudinaryResult) => void) => {
        open: () => void;
        close: () => void;
      };
    };
  }
}

const waitForCloudinary = (): Promise<void> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.cloudinary) {
      resolve();
    } else {
      const checkCloudinary = setInterval(() => {
        if (typeof window !== 'undefined' && window.cloudinary) {
          clearInterval(checkCloudinary);
          resolve();
        }
      }, 100);
      
      // Timeout After 10 Seconds
      setTimeout(() => {
        clearInterval(checkCloudinary);
        resolve();
      }, 10000);
    }
  });
};

export const useCloudinary = () => {
  const [isCloudinaryLoaded, setIsCloudinaryLoaded] = useState(false);

  useEffect(() => {
    waitForCloudinary().then(() => {
      setIsCloudinaryLoaded(true);
    });
  }, []);

  const uploadImage = useCallback((onSuccess: (url: string) => void) => {
    if (!isCloudinaryLoaded || typeof window === 'undefined' || !window.cloudinary) {
      console.error('Cloudinary Is Not Loaded Yet');
      return;
    }

    try {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'dowpfbq4w', // Replace With Your Cloud Name
          uploadPreset: 'ml_default', // Replace With Your Upload Preset
          sources: ['local', 'url', 'camera'],
          multiple: false,
          resourceType: 'image',
          clientAllowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
          maxFileSize: 10000000, // 10MB
          maxImageWidth: 2000,
          maxImageHeight: 2000,
          cropping: true,
          croppingAspectRatio: 1,
          croppingShowDimensions: true,
          theme: 'minimal',
          zIndex: 9999,
          styles: {
            palette: {
              window: '#1a1a1a',
              windowBorder: '#3b82f6',
              tabIcon: '#3b82f6',
              menuIcons: '#3b82f6',
              textDark: '#ffffff',
              textLight: '#ffffff',
              link: '#3b82f6',
              action: '#3b82f6',
              inactiveTabIcon: '#6b7280',
              error: '#ef4444',
              inProgress: '#3b82f6',
              complete: '#10b981',
              sourceBg: '#1f2937'
            },
            fonts: {
              default: null,
              "'Poppins', sans-serif": {
                url: 'https://fonts.googleapis.com/css?family=Poppins',
                active: true
              }
            }
          }
        },
        (error: Error | null, result: CloudinaryResult) => {
          if (error) {
            console.error('Cloudinary Upload Error:', error);
            return;
          }
          if (result) {
            console.log('Cloudinary Event:', result.event);
            if (result.event === 'success') {
              console.log('Upload Successful! URL:', result.info.secure_url);
              onSuccess(result.info.secure_url);
            }
          }
        }
      );
      widget.open();
      // Fix Pointer Events/Z-Index After Widget Opens
      setTimeout(() => {
        // Try To Select The Cloudinary Widget Root
        const widgetEls = document.querySelectorAll('[id^="cloudinary"]');
        widgetEls.forEach((el) => {
          (el as HTMLElement).style.zIndex = '99999';
          (el as HTMLElement).style.pointerEvents = 'auto';
        });
      }, 200);
    } catch (error) {
      console.error('Error Creating Cloudinary Widget:', error);
    }
  }, [isCloudinaryLoaded]);

  const uploadVideo = useCallback((onSuccess: (url: string) => void) => {
    if (!isCloudinaryLoaded || typeof window === 'undefined' || !window.cloudinary) {
      console.error('Cloudinary Is Not Loaded Yet');
      return;
    }

    try {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'dowpfbq4w', // Replace With Your Cloud Name
          uploadPreset: 'ml_default', // Replace With Your Upload Preset
          sources: ['local', 'url'],
          multiple: false,
          resourceType: 'video',
          clientAllowedFormats: ['mp4', 'mov', 'avi', 'webm'],
          maxFileSize: 100000000, // 100MB
          theme: 'minimal',
          zIndex: 9999,
          styles: {
            palette: {
              window: '#1a1a1a',
              windowBorder: '#3b82f6',
              tabIcon: '#3b82f6',
              menuIcons: '#3b82f6',
              textDark: '#ffffff',
              textLight: '#ffffff',
              link: '#3b82f6',
              action: '#3b82f6',
              inactiveTabIcon: '#6b7280',
              error: '#ef4444',
              inProgress: '#3b82f6',
              complete: '#10b981',
              sourceBg: '#1f2937'
            },
            fonts: {
              default: null,
              "'Poppins', sans-serif": {
                url: 'https://fonts.googleapis.com/css?family=Poppins',
                active: true
              }
            }
          }
        },
        (error: Error | null, result: CloudinaryResult) => {
          if (error) {
            console.error('Cloudinary Video Upload Error:', error);
            return;
          }
          if (result) {
            console.log('Cloudinary Video Event:', result.event);
            if (result.event === 'success') {
              console.log('Video Upload Successful! URL:', result.info.secure_url);
              onSuccess(result.info.secure_url);
            }
          }
        }
      );
      widget.open();
      // Fix Pointer Events/Z-Index After Widget Opens
      setTimeout(() => {
        const widgetEls = document.querySelectorAll('[id^="cloudinary"]');
        widgetEls.forEach((el) => {
          (el as HTMLElement).style.zIndex = '99999';
          (el as HTMLElement).style.pointerEvents = 'auto';
        });
      }, 200);
    } catch (error) {
      console.error('Error Creating Cloudinary Video Widget:', error);
    }
  }, [isCloudinaryLoaded]);

  return { uploadImage, uploadVideo, isCloudinaryLoaded };
};
