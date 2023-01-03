import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

export const ConnectionsModal = ({open, handleClose}) => {
  return (
    <div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="rounded-lg modal p-10 w-10/12 sm:w-7/12 lg:w-6/12"><h3>Connections modal</h3></Box>
        
      </Modal>
      </div>
  )
}
