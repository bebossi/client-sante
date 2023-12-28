import Slider from 'react-slick';
import { Category } from '../interfaces';

interface SliderProps {
  category: Category;
}

const SimpleSlider: React.FC<SliderProps> = ({ category }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <p className="shrink-0">{category.name}</p>
      </div>
    </Slider>
  );
};

export default SimpleSlider;
