import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("game-over")
export class GameOver extends LitElement {
  static styles = css`
    :host {
      aspect-ratio: 16 / 9;
      width: 100%;
      position: absolute;
      display: grid;
      background-image: url("./assets/sprites/gameover.png");
      background-size: cover;
    }

    .text-button {
      background: none;
      font-size: var(--font-size-sm);
      font-weight: bold;
      color: #a0484c;
      cursor: pointer;
      opacity: 60%;
      transition: all 0.25s ease-in-out;
    }

    .text-button:hover {
      opacity: 100%;
    }

    @media (min-aspect-ratio: 16/9) {
      :host {
        height: 100%;
        width: unset;
      }
    }
  `;

  protected override render() {
    return html`
      <button
        @click=${() => {
          game.audioController.playTrack("pop");
          window.location.reload();
        }}
        class="text-button"
      >
        Try again?
      </button>
    `;
  }
}
