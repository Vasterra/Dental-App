import { useState } from 'react';

const useModal = () => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [funcName, setFuncName] = useState('');
  const [confirm, setConfirm] = useState<'yes' | 'no'>('no');
  function toggle() {
    setVisible(!visible);    
  }
  return { toggle, visible, text, setText, confirm, setConfirm, funcName, setFuncName }
};

export default useModal;