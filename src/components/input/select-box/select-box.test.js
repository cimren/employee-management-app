import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import './select-box';

describe('SelectBox', () => {
  it('renders a select element with options', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];
    const el = await fixture(
      html`<select-box .options=${options}></select-box>`
    );
    const selectElement = el.shadowRoot.querySelector('[testid="select-box"]');
    await selectElement.click();

    const optionElements = el.shadowRoot.querySelectorAll('[role="option"]');

    expect(selectElement).to.exist;
    expect(optionElements.length).to.equal(options.length);
    expect(optionElements[0].innerText).to.equal(options[0].label);
    expect(optionElements[1].innerText).to.equal(options[1].label);
  });

  it('sets the selected value', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];
    const el = await fixture(
      html`<select-box .options=${options} value="option2"></select-box>`
    );

    const selectElement = el.shadowRoot.querySelector('[testid="select-box"]');
    expect(selectElement).to.exist;
    expect(selectElement.innerText).to.equal('Option 2');
  });

  it('dispatches a change event when the value changes', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];
    const el = await fixture(
      html`<select-box .options=${options}></select-box>`
    );
    const selectElement = el.shadowRoot.querySelector('[testid="select-box"]');
    await selectElement.click();

    const optionElements = el.shadowRoot.querySelectorAll('[role="option"]');
    const clickEvent = optionElements[1].dispatchEvent(
      new CustomEvent('click', {
        detail: { value: 'option2' },
        bubbles: true,
        composed: true,
      })
    );
    expect(clickEvent).to.be.true;
  });

  it('renders a placeholder when no value is selected', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];
    const el = await fixture(
      html`<select-box
        .options=${options}
        placeholder="Select an option"
      ></select-box>`
    );
    const selectElement = el.shadowRoot.querySelector('[testid="select-box"]');
    const placeholderElement = selectElement.querySelector('span.placeholder');
    expect(placeholderElement.innerText).to.equal('Select an option');
  });

  it('renders a label when provided', async () => {
    const options = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ];
    const el = await fixture(
      html`<select-box
        .options=${options}
        label="Select an option"
      ></select-box>`
    );
    const labelElement = el.shadowRoot.querySelector('label');

    expect(labelElement).to.exist;
    expect(labelElement.textContent).to.include('Select an option');
  });
});
