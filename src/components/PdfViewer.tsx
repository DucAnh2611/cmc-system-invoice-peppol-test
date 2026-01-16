import { useEffect, useState, type JSX } from 'react';
import { AlertCircle } from 'lucide-react';

interface PdfViewerProps {
  url: string;
}

export const PdfViewer = ({ url }: PdfViewerProps): JSX.Element => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = (): void => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = (): void => {
    setIsLoading(false);
    setHasError(true);
  };

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
  }, [url]);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-800 text-white p-8">
        <AlertCircle size={48} className="mb-4 text-red-400" />
        <h3 className="text-xl font-semibold mb-2">Failed to load PDF</h3>
        <p className="text-gray-400 text-center mb-4">
          The PDF file could not be loaded. Please check the URL or try again later.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Open in new tab
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-800 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading PDF...</p>
          </div>
        </div>
      )}
      <iframe
        src={`${url}#toolbar=1&navpanes=0&scrollbar=0`}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        onLoad={handleLoad}
        onError={handleError}
        title="PDF Viewer"
      />
    </div>
  );
};
