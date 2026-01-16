import { cloneElement, useEffect, useState } from 'react';
import Modal from './Modal';
import { MonitorX } from 'lucide-react';

interface NotImplementProps {
  openModal?: boolean;
  children: React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>;
}

const NotImplement = ({ openModal = false, children }: NotImplementProps) => {
  const [isOpen, setIsOpen] = useState(openModal);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(openModal);
  }, [openModal]);

  return (
    <>
      {cloneElement(children, {
        onClick: (e: React.MouseEvent) => {
          setIsOpen(true);
          const originalOnClick = children.props.onClick;
          if (originalOnClick) {
            originalOnClick(e);
          }
        },
      })}

      <Modal isOpen={isOpen} onClose={handleClose} contentClassName="w-[300px]">
        <div className="flex flex-col items-center justify-center gap-2">
          <MonitorX size={40} className="text-gray-500" />
          <h1 className="text-center text-gray-800 text-2xl font-bold">Not Implemented</h1>
          <p className="text-gray-500 text-sm">This feature is not implemented yet.</p>
        </div>
      </Modal>
    </>
  );
};

export default NotImplement;
