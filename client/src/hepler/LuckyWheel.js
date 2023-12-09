import React, { useState, useEffect } from "react";
import { Stage, Layer, Wedge, Text } from "react-konva";

const LuckyWheel = ({ items, defaultSelectedItem }) => {
  const [rotation, setRotation] = useState(0);
  const [spinCount, setSpinCount] = useState(0);
  const [isButtonHidden, setButtonHidden] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSpin = () => {
    if (spinCount === 0) {
      setSpinCount(1);
      setButtonHidden(true);

      // Dừng vòng quay sau 5 giây
      setTimeout(() => {
        handleSpinComplete();
      }, 5000);
    }
  };

  const handleSpinComplete = () => {
    setSpinCount(0);
    setButtonHidden(false);

    // Chọn ngẫu nhiên một phần tử hoặc sử dụng phần tử mặc định
    const randomIndex = Math.floor(Math.random() * items.length);
    const selectedItem = items[randomIndex] || defaultSelectedItem;
    setSelectedItem(selectedItem);

    console.log(`Selected: ${selectedItem.label}`);
  };

  useEffect(() => {
    const updateRotation = () => {
      if (spinCount > 0) {
        const newRotation = rotation + 10;
        setRotation(newRotation);
      }
    };

    const interval = setInterval(updateRotation, 16);
    if (spinCount === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [rotation, spinCount]);

  return (
    <>
      <Stage
        width={400}
        height={400}
        onClick={handleSpin}
        disabled={spinCount > 0 || isButtonHidden}
        style={{ cursor: isButtonHidden ? "not-allowed" : "pointer" }}
      >
        <Layer>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <Wedge
                x={200}
                y={200}
                radius={100}
                angle={360 / items.length}
                fill={item.color}
                rotation={index * (360 / items.length) + rotation}
              />
              <Text
                x={200}
                y={200}
                text={item.label}
                fontSize={14}
                fill="black"
                align="center"
                verticalAlign="middle"
                offsetX={
                  Math.cos(((2 * Math.PI) / items.length) * index + rotation) *
                  50
                }
                offsetY={
                  Math.sin(((2 * Math.PI) / items.length) * index + rotation) *
                  50
                }
              />
            </React.Fragment>
          ))}
          <Text
            x={200}
            y={200}
            text="Spin"
            fontSize={20}
            fill="white"
            align="center"
            verticalAlign="middle"
            listening={false}
          />
        </Layer>
      </Stage>
      {selectedItem && (
        <div>
          <p>Selected Item: {selectedItem.label}</p>
          <p>Additional Info: {selectedItem.additionalInfo}</p>
        </div>
      )}
    </>
  );
};

export default LuckyWheel;
