import React, { useEffect } from 'react';

function CanvasBackground() {
    useEffect(() => {
        const canvasElements = document.querySelectorAll("#bg canvas"),
            background = canvasElements[0],
            foreground1 = canvasElements[1],
            foreground2 = canvasElements[2],
            config = {
                cell: {
                    amount: 40,
                    layer: 3,
                    color: [138, 92, 92],
                    alpha: 0.6
                },
                speed: 0.5,
                angle: 0
            };

        if (background.getContext) {
            const bctx = background.getContext("2d"),
                fctx1 = foreground1.getContext("2d"),
                fctx2 = foreground2.getContext("2d"),
                M = Math, // Cached Math
                degree = config.angle / 360 * M.PI * 2,
                cells = [];
            let wWidth, wHeight, timer;

            const requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                function(callback) {
                    setTimeout(callback, 1000 / 60);
                };

            const cancelAnimationFrame = window.cancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.msCancelAnimationFrame ||
                window.oCancelAnimationFrame ||
                clearTimeout;

            const setCanvasSize = () => {
                wWidth = window.innerWidth;
                wHeight = window.innerHeight;
                canvasElements.forEach(c => {
                    c.width = wWidth;
                    c.height = wHeight;
                });
            };

            const drawCell = (x, y, radius, color, alpha) => {
                const gradient = fctx1.createRadialGradient(x, y, radius, x, y, 0);
                gradient.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${alpha})`);
                gradient.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},${alpha - 0.1})`);

                fctx1.beginPath();
                fctx1.arc(x, y, radius, 0, M.PI * 2, true);
                fctx1.fillStyle = gradient;
                fctx1.fill();
            };

            const drawBack = () => {
                bctx.clearRect(0, 0, wWidth, wHeight);

                const gradient = bctx.createRadialGradient(
                    wWidth * 0.5, wHeight * 0.5, 0, wWidth * 0.5, wHeight * 0.5, wWidth * 0.5
                );
                gradient.addColorStop(0, "#d9d5d5");
                gradient.addColorStop(1, "#bcb8b8");

                bctx.fillStyle = gradient;
                bctx.fillRect(0, 0, wWidth, wHeight);
            };

            const animate = () => {
                const sin = M.sin(degree),
                    cos = M.cos(degree);

                if (config.cell.amount > 0 && config.cell.layer > 0) {
                    fctx1.clearRect(0, 0, wWidth, wHeight);
                    for (let i = 0, len = cells.length; i < len; i++) {
                        let item = cells[i],
                            x = item.x,
                            y = item.y,
                            radius = item.radius,
                            speed = item.speed;

                        if (x > wWidth + radius) {
                            x = -radius;
                        } else if (x < -radius) {
                            x = wWidth + radius;
                        } else {
                            x += sin * speed;
                        }

                        if (y > wHeight + radius) {
                            y = -radius;
                        } else if (y < -radius) {
                            y = wHeight + radius;
                        } else {
                            y -= cos * speed;
                        }

                        item.x = x;
                        item.y = y;
                        drawCell(x, y, radius, item.color, item.alpha);
                    }
                }

                timer = requestAnimationFrame(animate);
            };

            const createCells = () => {
                cells.length = 0;

                if (config.cell.amount > 0 && config.cell.layer > 0) {
                    for (let i = 0; i < config.cell.amount / config.cell.layer; i++) {
                        for (let j = 0; j < config.cell.layer; j++) {
                            cells.push({
                                x: M.random() * wWidth,
                                y: M.random() * wHeight,
                                radius: M.random() * (20 + j * 5) + (20 + j * 5),
                                color: config.cell.color,
                                alpha: M.random() * 0.2 + (config.cell.alpha - j * 0.1),
                                speed: config.speed * (1 + j * 0.5)
                            });
                        }
                    }
                }

                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(animate);
                drawBack();
            };

            // Initialize canvas size and cells
            setCanvasSize();
            createCells();

            // Resize event
            const onResize = () => {
                setCanvasSize();
                createCells();
            };

            window.addEventListener('resize', onResize);

            // Cleanup on unmount
            return () => {
                window.removeEventListener('resize', onResize);
                cancelAnimationFrame(timer);
            };
        }
    }, []);

    return (
        <div id="bg">
            <canvas></canvas>
            <canvas></canvas>
            <canvas></canvas>
        </div>
    );
}

export default CanvasBackground;
