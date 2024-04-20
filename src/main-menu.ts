import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { game } from './game';

@customElement('main-menu')
export class MainMenu extends LitElement {
  static styles = css`
    :host {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  `;

  @property({ type: Boolean })
  settingsOpen = false;

  startGame() {
    this.remove();
    game.start();
  }

  renderSettings() {
    return html`
      <h1> Settings </h1>
      <button @click=${() => (this.settingsOpen = false)}> Back </button>
    `;
  }

  render() {
    if (this.settingsOpen) {
      return this.renderSettings();
    }

    return html`
      <h1> Power Lifter </h1>
      <button @click=${this.startGame}> Play </button>
      <button @click=${() => (this.settingsOpen = true)}> Settings </button>
    `;
  }
}
