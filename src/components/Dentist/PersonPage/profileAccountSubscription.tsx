import React from "react";
import GalleryPerson from "src/components/Gallery/GalleryPerson";

type Props = {
  currentDentist: any,
  currentAvatar: any,
  services: any,
  images: any,
  oldIMages: any,
  setImages: Function,
  downloadImages: Function,
}

const ProfileAccountSubscription: React.FunctionComponent<Props> = ({currentDentist, oldIMages, images, currentAvatar, services, setImages, downloadImages}) => {
  const lastName = currentDentist.lastName === null ? '' : currentDentist.lastName
  const firstName = currentDentist.firstName === null ? '' : currentDentist.firstName
  const filterImagesByService = (e: { target: { value: string; }; }) => {
    if (e.target.value === 'All Service') return downloadImages()
    let newListImages: any[] = [];
    const filterImages = oldIMages.map((img: any[]) => img.filter((item: { service: string; }) => item.service === e.target.value));

    filterImages.forEach((arr: any) => {
      if (arr.length !== 0) {
        // @ts-ignore
        newListImages.push(arr)
      }
    });
    // @ts-ignore
    setImages(newListImages)
  }
  const fullName = firstName + ' ' + lastName
  const adress = currentDentist.postIndex + ' ' + currentDentist.city + ' ' + currentDentist.street

  return (
    <>
      <section className="container page">
        <div className="flex-menu">
          <div className="index-leftmenu">
            <img className="leftmenu-index-cover-image" src="../../../../images/cover-image.jpg" alt="cover image" />
            <div className="index-leftmenu-profile-information">
              <img className="index-leftmenu-profile-photo" src={currentAvatar} alt=""/>
              <div>
                <p className="form-login-title green px20 mt-30 row-content">
                  {fullName}
                  <img className="index-gallery-image-watermark-img relative-img" src="../../../../images/check_circle.svg" alt="check" />
                </p>
                <p className="form-login-subtitle gray px12 m-none">{currentDentist.qualifications}</p>
                <p className="form-login-subtitle gray px12 m-none">GDC No: </p>
              </div>
              <div className="index-leftmenu-text">
                <p>Bio</p>
                <p>Nulla eu tempor tortor. Sed iaculis sit amet purus eu pharetra. Maecenas eu risus sem. Fusce
                  sollicitudin sollicitudin sapien.</p>
                <p className="button-list">
                  {
                    currentDentist.services.items.map((el: any, key: any) => {
                      return (
                        <button className="index-green-button" key={key}>{el.name}</button>
                      )
                    })
                  }
                </p>
                <p>Contact </p>
                <p>
                  <span><strong>Phone:</strong>{currentDentist.phone}</span><br />
                  <span><strong>Email: </strong>{currentDentist.email}</span><br />
                  <span> <strong>Website:</strong>{currentDentist.website}</span>
                </p>
                <p>Locations</p>
                <p>
                  <span><strong>{currentDentist.city}</strong>{currentDentist.adress}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="index-box-to-box">
            <div className="main-index index-main-box relative">
              <select className="gallery-select arrows bg-gray" name="services" id="services" onChange={filterImagesByService}>
                <option value="All Service" selected>All Service</option>
                {services && services.map((item: any, key: any) => (
                  <option key={key} value={item.name}>{item.name}</option>
                ))}
              </select>
              {// @ts-ignore
                images && <GalleryPerson images={images}/>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  )
};

export default ProfileAccountSubscription
