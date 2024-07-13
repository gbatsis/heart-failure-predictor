import React, { useEffect, useRef } from 'react';

const CanvasBackground = () => {
    const canvasRef = useRef(null);
    let animationFrameId;

    const createBackground = (ctx, width, height) => {
        // Draw gradient background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#d9d5d5');
        gradient.addColorStop(1, '#802e2e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Draw abstract shapes
        const shapes = [
            { x: 200, y: 300, radius: 200, color: 'rgba(128, 46, 46, 0.2)' },
            { x: 600, y: 500, radius: 300, color: 'rgba(217, 213, 213, 0.3)' },
            { x: 1000, y: 200, radius: 150, color: 'rgba(128, 46, 46, 0.1)' },
        ];

        shapes.forEach(shape => {
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = shape.color;
            ctx.fill();
        });
    };

    const addMovingNoise = (ctx, width, height, time) => {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const noise = Math.random() * 30 + Math.sin(i + time) * 10;
            data[i] += noise; // Red
            data[i + 1] += noise; // Green
            data[i + 2] += noise; // Blue
        }
        ctx.putImageData(imageData, 0, 0);
    };

    const animateNoise = (ctx, width, height) => {
        let time = 0;

        const render = () => {
            time += 0.05;
            createBackground(ctx, width, height);
            addMovingNoise(ctx, width, height, time);
            animationFrameId = requestAnimationFrame(render);
        };

        render();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const width = canvas.width;
        const height = canvas.height;

        animateNoise(ctx, width, height);

        const handleResize = () => {
            cancelAnimationFrame(animationFrameId);
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            animateNoise(ctx, canvas.width, canvas.height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />
    );
};

export default CanvasBackground;
