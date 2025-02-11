import { Component } from 'react';
import './CustomThermometer.css';

class CustomThermometer extends Component {
    render() {
        this.options = this._generateOptions();
        const theme = `thermometer--theme-${this.options.theme()}`;
        const size = `thermometer--${this.options.size()}`;
        const height = { height: `${this.options.height}px` };
        const heightPercent = { height: `${this.options.percent()}%` };
        const heightBgColor = { height: `calc(${this.options.height}px - 57px)` };
        const valstr = this._formatCurrency(this.options.value);
        this._createIntervals();
        const stepIntervals = this._createIntervalsUI(this.options.intervals);

        return (
            <div style={height} className={`thermometer ${size} ${theme}`}>
                <div className="thermometer__draw-a"></div>
                <div className="thermometer__draw-b"></div>
                <div className="thermometer__meter">
                    <ul className="thermometer__statistics">{stepIntervals}</ul>
                    <div style={heightPercent} className="thermometer__mercury">
                        <div className="thermometer__percent-current">{valstr}</div>
                        <div className="thermometer__mask">
                            <div className="thermometer__bg-color" style={heightBgColor}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _generateOptions() {
        return {
            theme: () => (['light', 'dark'].includes(this.props.theme) ? this.props.theme : 'light'),
            value: this.props.value || 0,
            max: this.props.max || 100,
            steps: this.props.steps,
            currency: this.props.currency || 'USD',
            size: () => (['small', 'normal', 'large'].includes(this.props.size) ? this.props.size : 'normal'),
            height: this.props.height+50 || 200,
            percent: () => ((this.options.value / this.options.max) * 100) + 5,
            intervals: []
        };
    }

    _formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: this.options.currency
        }).format(value);
    }

    _createIntervals() {
        if (this.options.steps) {
            for (let step = 1; step <= this.options.steps; step += 3) {
                let val = ((this.options.max / this.options.steps) * step).toFixed(2);
                let percent = ((val / this.options.max) * 100) + 5;
                let interval = { percent: percent, label: this._formatCurrency(val) };
                this.options.intervals.push(interval);
            }
        }
    }

    _createIntervalsUI(intervals) {
        return intervals.map((step, i) => (
            <li key={i} style={{ bottom: `calc(${step.percent}% - 1px)`, height: '9px' }}>
                {i % 2 === 0 ? (
                    <>
                        <span className="scale-line left"></span>
                        <span className="label left">{step.label}</span>
                    </>
                ) : (
                    <>
                        <span className="label right">{step.label}</span>
                        <span className="scale-line right"></span>
                    </>
                )}
            </li>
        ));
    }

}

export default CustomThermometer;
