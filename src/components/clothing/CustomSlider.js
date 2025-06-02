import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import './CustomSlider.css';

const CustomSlider = ({ value, onChange }) => {
  return (
    <Slider.Root
      className="SliderRoot"
      value={[value]}
      min={-10}
      max={10}
      step={1}
      onValueChange={([val]) => onChange(val)}
    >
      <Slider.Track className="SliderTrack">
        <Slider.Range className="SliderRange" />
      </Slider.Track>
      <Slider.Thumb className="SliderThumb" />
    </Slider.Root>
  );
};

export default CustomSlider;