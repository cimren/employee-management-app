import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import './date-picker.js';

describe('DatePicker', () => {
  it('renders a date input', async () => {
    const el = await fixture(html`<date-picker></date-picker>`);
    const input = el.shadowRoot.querySelector('input[type="date"]');
    expect(input).to.exist;
  });

  it('sets the label correctly', async () => {
    const labelText = 'Select Date';
    const el = await fixture(
      html`<date-picker label="${labelText}"></date-picker>`
    );
    const label = el.shadowRoot.querySelector('label');
    expect(label).to.exist;
    expect(label.textContent).to.include(labelText);
  });

  it('sets the name attribute on the input', async () => {
    const name = 'my-date';
    const el = await fixture(html`<date-picker name="${name}"></date-picker>`);
    const input = el.shadowRoot.querySelector('input[type="date"]');
    expect(input.name).to.equal(name);
  });

  it('sets the value attribute on the input', async () => {
    const value = '2023-10-26';
    const el = await fixture(
      html`<date-picker selectedDate="${value}"></date-picker>`
    );
    const input = el.shadowRoot.querySelector('input[type="date"]');
    expect(input.value).to.equal(value);
  });

  it('dispatches a change event when the input value changes', async () => {
    const el = await fixture(html`<date-picker></date-picker>`);
    const input = el.shadowRoot.querySelector('input[type="date"]');
    const newValue = '2024-01-01';

    let dispatchedValue = null;
    el.addEventListener('date-selected', (event) => {
      dispatchedValue = event.detail.date;
    });

    input.value = newValue;
    input.dispatchEvent(new Event('change'));

    expect(dispatchedValue).to.equal(newValue);
  });
});
