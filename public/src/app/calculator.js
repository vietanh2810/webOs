import MyStorage from '../MyStorage.js';

class CalculatorApp extends HTMLElement {
  constructor() {
    super();
    this.style.display = 'none';
  }

  connectedCallback() {
    this.innerHTML = `
            <div>
                <div id="top-bar" draggable="true">
                    <p>Calculator</p>
                    <button id="close-button">X</button>
                </div>
                <div id="calculator-display">
                    <input type="text" id="calculator-input" disabled>
                </div>
                <div id="calculator-buttons">
                    <div>
                        <button id="calculator-btn-7" class="calculator-btn">7</button>
                        <button id="calculator-btn-8" class="calculator-btn">8</button>
                        <button id="calculator-btn-9" class="calculator-btn">9</button>
                        <button id="calculator-btn-div" class="calculator-btn">/</button>
                        <button id="calculator-btn-del" class="calculator-btn">Del</button>
                    </div>
                    <div>
                        <button id="calculator-btn-4" class="calculator-btn">4</button>
                        <button id="calculator-btn-5" class="calculator-btn">5</button>
                        <button id="calculator-btn-6" class="calculator-btn">6</button>
                        <button id="calculator-btn-mult" class="calculator-btn">*</button>
                        <button id="calculator-btn-clear" class="calculator-btn">C</button>
                    </div>
                    <div>
                        <button id="calculator-btn-1" class="calculator-btn">1</button>
                        <button id="calculator-btn-2" class="calculator-btn">2</button>
                        <button id="calculator-btn-3" class="calculator-btn">3</button>
                        <button id="calculator-btn-minus" class="calculator-btn">-</button>
                        <button id="calculator-btn-ans" class="calculator-btn">Ans</button>
                    </div>
                    
                    <div>
                        <button id="calculator-btn-0" class="calculator-btn">0</button>
                        <button id="calculator-btn-ans" class="calculator-btn">.</button>
                        <button id="calculator-btn-plus" class="calculator-btn">+</button>
                        <button id="calculator-btn-equal" class="calculator-btn">=</button>
                        <button id="calculator-btn-percent" class="calculator-btn">%</button>
                    </div>
                </div>
            </div>
        `;

    this.querySelector('#close-button').addEventListener('click', () => {
      this.style.display = 'none';
    });

    const calculatorInput = this.querySelector('#calculator-input');

    let tmp = 0;

    this.querySelectorAll('.calculator-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.id === 'calculator-btn-del') {
          calculatorInput.value = calculatorInput.value.slice(0, -1);
          calculatorInput.innerHTML = ` ${calculatorInput.value}`;
        } else if (btn.id === 'calculator-btn-clear') {
          calculatorInput.value = '';
          calculatorInput.innerHTML = calculatorInput.value;
        } else if (btn.id === 'calculator-btn-equal') {
          calculatorInput.value = calculatorInput.value.replace('Ans', tmp);
          calculatorInput.value = eval(calculatorInput.value);
          calculatorInput.innerHTML = ` ${calculatorInput.value}`;
          tmp = calculatorInput.value;
        } else if (btn.id === 'calculator-btn-ans') {
          calculatorInput.innerHTML += 'Ans';
          calculatorInput.value += 'Ans';
        } else if (btn.id === 'calculator-btn-percent') {
          calculatorInput.value += '/100';
          calculatorInput.innerHTML = calculatorInput.value;
        } else {
          calculatorInput.value += btn.innerHTML;
          calculatorInput.innerHTML = ` ${calculatorInput.value}`;
        }
        if (MyStorage.getItem('vibrating') === 'true') {
          navigator.vibrate(50);
        }
      });
    });
  }
}

customElements.define('my-calculator', CalculatorApp);
