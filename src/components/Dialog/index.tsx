import React, { SyntheticEvent } from 'react';
import { Modal, ModalBody, ModalFooter, Container, ModalHeader } from './style';

interface IModalXProps{
  visible: boolean
  toggle: ()=> void
  text: string
  setConfirm: (ans: 'yes' | 'no')=> void
}

export const ModalConfirm = ({ visible, toggle, text, setConfirm }: IModalXProps) => {
  const onSubmit = (e: SyntheticEvent)=>{
    e.preventDefault()
    setConfirm('yes')
    toggle()
  }
  return (
    <>
      {visible && 
        <Container>
          <Modal>
          <ModalBody>
              <h4>{text}</h4>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="cancel" onClick={toggle}>
              Cancel
            </button>
            <button type="button" className="submit" onClick={onSubmit}>
              Yes
            </button>
          </ModalFooter>
        </Modal>
      </Container>
    }
   </>
  )
}