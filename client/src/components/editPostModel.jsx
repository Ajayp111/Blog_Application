/* eslint-disable react/prop-types */

import { Modal, Button } from "react-bootstrap";

const EditPostModal = ({ editPost, handleSaveEdit, handleCloseEditModal }) => {
  const handleSave = (e) => {
    e.preventDefault();
    handleSaveEdit(
      editPost._id,
      e.target.editpostText.value,
      handleCloseEditModal
    );
  };

  return (
    <Modal
      show={editPost !== null}
      onHide={handleCloseEditModal}
      dialogClassName="modal-90w"
      centered
      backdrop="static"
      keyboard={false}
      enforceFocus={true}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
        <form onSubmit={handleSave}>
          <div className="d-flex justify-content-center align-items-center mb-3 text-center">
            <textarea
              type="text"
              className="form-control my-2 border border-spacing-10 border-cyan-900 px-3"
              name="editpostText"
              placeholder="Edit your post here"
              defaultValue={editPost?.description}
            />
          </div>
          <div className="d-flex justify-content-center text-center pb-8">
            <Button
              type="submit"
              className="p-2"
              style={{ backgroundColor: "#e86100", color: "#ffffff" }}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              className="ml-4"
              style={{ backgroundColor: " #4CAF50", color: "#ffffff" }}
              onClick={handleCloseEditModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditPostModal;
