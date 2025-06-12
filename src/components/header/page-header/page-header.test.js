import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import './page-header.js';

describe('PageHeader', () => {
  it('renders with a title', async () => {
    const el = await fixture(
      html`<page-header title="Test Title"></page-header>`
    );
    expect(el.shadowRoot.querySelector('h1')).to.have.text('Test Title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(
      html`<page-header title="Test Title"></page-header>`
    );
    await expect(el).shadowDom.to.be.accessible();
  });
});
