
import Carousel from 'react-bootstrap/Carousel';
import Imagemcarro1 from '../assets/avareal.png';
import Imagemcarro2 from '../assets/avareal2.png';
import './Carousel.css'

function Carrossel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
         className="d-block w-100 imagem-carrossel"
         src={Imagemcarro1} 
         alt="slide"
         />
        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img 
        className="d-block w-100 imagem-carrossel"
        src={Imagemcarro2}
        alt='slide2' />
        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      
    </Carousel>
  );
}

export default Carrossel;