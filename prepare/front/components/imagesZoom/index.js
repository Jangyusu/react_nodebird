import { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Slick from 'react-slick'
import {
  Overlay,
  Header,
  CloseButton,
  SlickWrapper,
  ImgWrapper,
  Indicator,
  Global,
} from './style'

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setcurrentSlide] = useState(0)

  const handleKeyDown = useCallback(e => {
    if (e.key === 'Escape') {
      onClose()
    }
  }, [])

  return (
    <Overlay onKeyDown={handleKeyDown}>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseButton onClick={onClose}>X</CloseButton>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={slide => setcurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map(v => (
              <ImgWrapper key={v.src}>
                <img src={v.src} alt={v.src}></img>
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  )
}

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ImagesZoom
