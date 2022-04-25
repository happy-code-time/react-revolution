import React from 'react';

import { Link } from 'react-router-dom';
import PropsCheck from '../functions/PropsCheck';
import isString from '../functions/isString';

class Astronaut404 extends React.Component< { [key: string]: any }, { [key: string]: any }> {
    private canvasRef: any;

    constructor(props) {
        super(props);
        this.animate = this.animate.bind(this);
        this.drawVisor = this.drawVisor.bind(this);
        this.canvasRef = React.createRef();

        this.state = {
            /**
             * User
             */
            
            defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Astronaut404',
            
            reactRouter: typeof true == typeof props.reactRouter ? props.reactRouter : false,
            link: props.link && typeof {} == typeof props.link ? props.link : {},
            text404: props.text404 && typeof '8' == typeof props.text404 ? props.text404 : '404',
            text1: props.text1 && typeof '8' == typeof props.text1 ? props.text1 : 'requested page',
            text2: props.text2 && typeof '8' == typeof props.text2 ? props.text2 : 'was not found',
        }
    }

    /**
     * Force re-rendering of this component based
     * on keysChangeListners keys
     * @param {object} props 
     * @param {object} state 
     */
    static getDerivedStateFromProps(props, state) {
        if (PropsCheck(['moduleStyle', 'globalStyle', 'addClass',  'defaultClass', 'id', 'reactRouter', 'link', 'text404', 'text1', 'text2'], props, state)) {
            return {
                defaultClass: isString(props.defaultClass) ? props.defaultClass : 'Astronaut404',
                
                style: (typeof true == typeof props.style) ? props.style : true,
                
                
                reactRouter: typeof true == typeof props.reactRouter ? props.reactRouter : false,
                link: props.link && typeof {} == typeof props.link ? props.link : {},
                text404: props.text404 && typeof '8' == typeof props.text404 ? props.text404 : '404',
                text1: props.text1 && typeof '8' == typeof props.text1 ? props.text1 : 'requested page',
                text2: props.text2 && typeof '8' == typeof props.text2 ? props.text2 : 'was not found',
            };
        }

        return null;
    }

    componentDidMount(): void {

        this.drawVisor();
        this.animate();
    }

    drawVisor() {

        if (!this.canvasRef || !this.canvasRef.current) {
            return null;
        }

        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.moveTo(5, 45);
        ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);

        ctx.lineTo(55, 20);
        ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);

        ctx.lineTo(15, 10);

        ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
        ctx.lineTo(5, 45);

        ctx.fillStyle = '#2f3640';
        ctx.strokeStyle = '#f5f6fa';
        ctx.fill();
        ctx.stroke();
    }

    animate() {

        if (!this.canvasRef || !this.canvasRef.current) {
            return null;
        }

        const cordCanvas = this.canvasRef.current;
        const ctx = cordCanvas.getContext('2d');

        let y1 = 160;
        let y2 = 100;
        let y3 = 100;

        let y1Forward = true;
        let y2Forward = false;
        let y3Forward = true;

        window.requestAnimationFrame(this.animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        ctx.beginPath();
        ctx.moveTo(130, 170);
        ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 8;
        ctx.stroke();


        if (y1 === 100) {
            y1Forward = true;
        }

        if (y1 === 300) {
            y1Forward = false;
        }

        if (y2 === 100) {
            y2Forward = true;
        }

        if (y2 === 310) {
            y2Forward = false;
        }

        if (y3 === 100) {
            y3Forward = true;
        }

        if (y3 === 317) {
            y3Forward = false;
        }

        y1Forward ? y1 += 1 : y1 -= 1;
        y2Forward ? y2 += 1 : y2 -= 1;
        y3Forward ? y3 += 1 : y3 -= 1;
    }

    render() {
        const { reactRouter, link, defaultClass, addClass, id, text404, text1, text2 } = this.state;
        const { href, text, props } = link;

        return (
            <div className='' >
                <div className="moon"></div>
                <div className="moon__crater moon__crater1"></div>
                <div className="moon__crater moon__crater2"></div>
                <div className="moon__crater moon__crater3"></div>
                <div className="star star1"></div>
                <div className="star star2"></div>
                <div className="star star3"></div>
                <div className="star star4"></div>
                <div className="star star5"></div>
                <div className="error">
                    <div className="error__title">
                        {
                            text404
                        }
                    </div>
                    <div className="error__subtitle">
                        {
                            text1
                        }
                    </div>
                    <div className="error__description mb-3">
                        {
                            text2
                        }
                    </div>
                    {
                        reactRouter &&
                        <Link to={href} className="error__button error__button--active" {...props}>
                            {
                                text
                            }
                        </Link>
                    }
                    {
                        !reactRouter &&
                        <a href={href} className="error__button error__button--active" {...props}>
                            {
                                text
                            }
                        </a>
                    }
                </div>
                <div className="astronaut">
                    <div className="astronaut__backpack"></div>
                    <div className="astronaut__body"></div>
                    <div className="astronaut__body__chest"></div>
                    <div className="astronaut__arm-left1"></div>
                    <div className="astronaut__arm-left2"></div>
                    <div className="astronaut__arm-right1"></div>
                    <div className="astronaut__arm-right2"></div>
                    <div className="astronaut__arm-thumb-left"></div>
                    <div className="astronaut__arm-thumb-right"></div>
                    <div className="astronaut__leg-left"></div>
                    <div className="astronaut__leg-right"></div>
                    <div className="astronaut__foot-left"></div>
                    <div className="astronaut__foot-right"></div>
                    <div className="astronaut__wrist-left"></div>
                    <div className="astronaut__wrist-right"></div>
                    <div className="astronaut__cord">
                        <canvas ref={this.canvasRef} id="cord" height="500px" width="500px"></canvas>
                    </div>
                    <div className="astronaut__head">
                        <canvas id="visor" width="60px" height="60px"></canvas>
                        <div className="astronaut__head-visor-flare1"></div>
                        <div className="astronaut__head-visor-flare2"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Astronaut404;
