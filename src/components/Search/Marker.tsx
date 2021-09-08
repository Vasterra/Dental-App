import React, { useState, useEffect } from 'react';
import AvatarForMapComponent from './AvatarForMap';

type Props = {
  selected: any
  dent: any
}

const Marker: React.FunctionComponent<Props> = ({ selected, dent }) => {

  const [classes, setClasses] = useState('map-heart-white');
  const [icon, setIcon] = useState('../images/heart-white.png');
  const [block, setBlock] = useState('none');
  const cardDentistMap: any = document.getElementsByClassName('cardDentistMap');

  useEffect(() => {
    if (selected) {
      clickOnSelect()
    }
  }, [selected])

  function clickOnSelect() {
    for (let i = 0; i < cardDentistMap.length; ++i) {
      if (cardDentistMap[i].id === dent.id) {
        cardDentistMap[i].style.display = 'block'
        cardDentistMap[i].parentElement.children[1].className = `map-heart-green`
        cardDentistMap[i].parentElement.children[1].src = `${global.origin}/images/heart-green.png`
      } else {
        cardDentistMap[i].style.display = 'none'
        cardDentistMap[i].parentElement.children[1].className = `map-heart-white`
        cardDentistMap[i].parentElement.children[1].src = `${global.origin}/images/heart-white.png`
      }
    }
  }

  return (
    <div onClick={clickOnSelect} style={{cursor: 'pointer'}}>
      <div style={{ display: block }} className='cardDentistMap' id={dent.id}>
        <div className='map-dentist-block'>
          <AvatarForMapComponent dentist={dent} />
          <p className='map-dentist-block-title'>Dr. {dent.firstName}</p>
          <p className='map-dentist-block-subtitle'>{dent.address}</p>
        </div>
      </div>
      <img className={classes} src={icon} alt='heart green' />
    </div>
  );
};

export default Marker;