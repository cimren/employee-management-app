import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import './text-field';

describe('TextField', () => {
  // it('renders with a label and input', async () => {
  //   const el = await fixture(
  //     html`<text-field label="Test Label"></text-field>`
  //   );
  //   const label = el.shadowRoot.querySelector('label');
  //   const input = el.shadowRoot.querySelector('input');

  //   expect(label).to.exist;
  //   expect(label.textContent).to.equal('Test Label');
  //   expect(input).to.exist;
  // });

  it('sets the input value', async () => {
    const el = await fixture(
      html`<text-field value="Initial Value"></text-field>`
    );
    const input = el.shadowRoot.querySelector('input');

    expect(input.value).to.equal('Initial Value');
  });

  it('updates the value when input changes', async () => {
    const el = await fixture(html`<text-field></text-field>`);
    const input = el.shadowRoot.querySelector('input');

    input.value = 'New Value';
    input.dispatchEvent(new Event('input'));

    expect(el.value).to.equal('New Value');
  });

  it('handles required attribute', async () => {
    const el = await fixture(html`<text-field isRequired></text-field>`);
    const input = el.shadowRoot.querySelector('input');

    expect(input.required).to.be.true;
  });

  // it('handles disabled attribute', async () => {
  //   const el = await fixture(html`<text-field disabled></text-field>`);
  //   const input = el.shadowRoot.querySelector('input');

  //   expect(input.disabled).to.be.true;
  // });

  it('handles placeholder attribute', async () => {
    const el = await fixture(
      html`<text-field placeholder="Enter text"></text-field>`
    );
    const input = el.shadowRoot.querySelector('input');

    expect(input.placeholder).to.equal('Enter text');
  });

  // it('is accessible', async () => {
  //   const el = await fixture(
  //     html`<text-field label="Accessible Test"></text-field>`
  //   );
  //   await expect(el).to.be.accessible();
  // });

  it('renders error message when provided', async () => {
    const el = await fixture(
      html`<text-field errorMessage="This field is required"></text-field>`
    );
    const errorDiv = el.shadowRoot.querySelector('.error');

    expect(errorDiv).to.exist;
    expect(errorDiv.textContent).to.equal('This field is required');
  });
  it('does not render error message when not provided', async () => {
    const el = await fixture(html`<text-field></text-field>`);
    const errorDiv = el.shadowRoot.querySelector('.error');

    expect(errorDiv).to.not.exist;
  });
  it('renders required indicator when isRequired is true', async () => {
    const el = await fixture(
      html`<text-field label="Required" isRequired></text-field>`
    );
    const requiredIndicator = el.shadowRoot.querySelector(
      '.required-indicator'
    );

    expect(requiredIndicator).to.exist;
    expect(requiredIndicator.textContent).to.equal('*');
  });
  it('does not render required indicator when isRequired is false', async () => {
    const el = await fixture(
      html`<text-field label="Not Required"></text-field>`
    );
    const requiredIndicator = el.shadowRoot.querySelector(
      '.required-indicator'
    );

    expect(requiredIndicator).to.not.exist;
  });
  it('renders with custom type', async () => {
    const el = await fixture(html`<text-field type="email"></text-field>`);
    const input = el.shadowRoot.querySelector('input');

    expect(input.type).to.equal('email');
  });
});
