import React, { useState, useEffect } from "react";
const carImage = "/carrr.png";
const mercedesImage = "/mersedess.png";

const MovingCar: React.FC = () => {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1); // 1 - вправо, -1 - влево
  const [isFullscreen, setIsFullscreen] = useState(false); // Режим полноэкранного просмотра

  useEffect(() => {
    if (isFullscreen) return; // Если полноэкранный режим - анимация остановлена

    const container = document.querySelector(".car-container") as HTMLElement;
    if (!container) return;

    const maxWidth = container.clientWidth - 200; // Длина движения машины

    const interval = setInterval(() => {
      setPosition((prev) => {
        if (prev >= maxWidth) {
          setDirection(-1); // Разворот влево
        } else if (prev <= 0) {
          setDirection(1); // Разворот вправо
        }
        return prev + 5 * direction; // Двигаем машину
      });
    }, 50);

    return () => clearInterval(interval);
  }, [direction, isFullscreen]);

  // Функция переключения режима
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`car-container ${isFullscreen ? "fullscreen" : "relative overflow-hidden flex-grow"}`}
    >
      <img
        src={isFullscreen ? mercedesImage : carImage}
        alt="Car"
        className={`transition-transform duration-200 ${isFullscreen ? "w-full h-full object-cover fixed top-20 left-0 z-50"
            : "absolute top-1/2 left-0 w-[150px] transform -translate-y-1/2 moving-car"
          }`}
        onClick={toggleFullscreen}
        style={!isFullscreen
          ? { left: `${position}px`, top: "30px", transform: `scaleX(${direction})` }
          : {}}
      />
    </div>
  );
};

export default MovingCar;
