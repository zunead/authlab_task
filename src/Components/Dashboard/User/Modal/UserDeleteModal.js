import React from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Modal, ModalBody, ModalContainer, ModalContent, ModalFooter, ModalFooterCloseBtn,  ModalFooterSubmitBtn,  ModalHeader, ModalHeaderClose, ModalHeaderCloseIcon, ModalHeaderTitle, ModalOverlay } from '../../All-feature-Request/Modal/Modal_CSS';

const UserDeleteModal = ({ showDeleteModal, setShowDeleteModal, deleteId , features}) => {

  let url ='https://sorting-functionality-authlab.herokuapp.com/user/'
  let history = useHistory();
  const handleDelete = (e) => {
      e.preventDefault()
        fetch(url + deleteId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data){                
                toast.success(data.message, {
                    position: "bottom-right",
                });
                history.push('/dashboard/user');
                setShowDeleteModal(false);
                features()
            }
        })
  };
  return (
      <>
        {showDeleteModal && (
          <>
            <Modal>
              <ModalContainer>
                {/*content*/}
                <ModalContent>
                  {/*header*/}

                  <ModalHeader>
                    <ModalHeaderTitle> Delete User</ModalHeaderTitle>
                    <ModalHeaderClose onClick={() => setShowDeleteModal(false)} >
                      <ModalHeaderCloseIcon title='modal close'>
                        <AiFillCloseCircle/>
                      </ModalHeaderCloseIcon>
                    </ModalHeaderClose>
                  </ModalHeader>


                  {/*body*/}
                    <ModalBody>
                        <p>
                            Are you confirm to delete this user?
                        </p>
                    </ModalBody>

                    <ModalFooter>
                        <ModalFooterCloseBtn
                            type="button" onClick={() => setShowDeleteModal(false)} >
                            Close
                        </ModalFooterCloseBtn>
                        <ModalFooterSubmitBtn onClick={(e) => handleDelete(e)} >
                            Delete 
                        </ModalFooterSubmitBtn>
                    </ModalFooter>
                </ModalContent>

              </ModalContainer>
            </Modal>
            <ModalOverlay></ModalOverlay>
          </>
        )}
      </>
    );
};

export default UserDeleteModal;