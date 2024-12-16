// RainBackground.tsx
import React from 'react';
import "./styles.css"; // 引入CSS文件

const RainBackground: React.FC = () => (
    <div className="rain-background">
        {/* 创建多个雨滴 */}
        {[...Array(9)].map((_, i) => (
            <div key={i} className="raindrop" style={{
                left: `${10 + i * 10}%`,
                animationDelay: `${Math.random() * 2}s`, // 随机延迟
                top: `${Math.random() * -100}vh` // 随机初始位置
            }}></div>
        ))}
    </div>
);

export default RainBackground;