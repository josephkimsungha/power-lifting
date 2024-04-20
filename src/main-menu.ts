import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
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

  @state()
  private settingsOpen = false;

  // Hello world this is a long comment and i want it to blow past 80 characters yes sir. maybe i did not and that's ok.
  protected override render() {
    if (this.settingsOpen) {
      return this.renderSettings();
    }

    return html`
      <h1> Power Lifter </h1>
      <button @click=${this.startGame}> Play </button>
      <button @click=${() => (this.settingsOpen = true)}> Settings </button>
    `;
  }

  private renderSettings() {
    return html`
      <h1> Settings </h1>
      <button @click=${() => (this.settingsOpen = false)}> Back </button>
    `;
  }

  private startGame() {
    this.remove();
    game.start();
  }
}
