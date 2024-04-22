import { LitElement, PropertyValueMap, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { game } from "./game";
import { AudioController } from "./audio/audio_controller";

@customElement("main-menu")
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
  @state()
  private loadState: "loading" | "loaded" | "done" = "loading";

  protected override firstUpdated(): void {
    game.preload().then(() => {
      this.loadState = "loaded";
    });
  }

  protected override render() {
    if (this.loadState === "loading") {
      return this.renderLoadingScreen();
    }
    if (this.loadState === "loaded") {
      return this.renderLoadedScreen();
    }
    if (this.settingsOpen) {
      return this.renderSettings();
    }

    return html`
      <h1>Power Lifter</h1>
      <button @click=${this.startGame}>Play</button>
      <button @click=${() => (this.settingsOpen = true)}>Settings</button>
    `;
  }

  private renderLoadingScreen() {
    return html` <h1>Loading...</h1> `;
  }

  private renderLoadedScreen() {
    return html`
      <h1>Loaded.</h1>
      <button @click=${this.launch}>Start</button>
    `;
  }

  private renderSettings() {
    return html`
      <h1>Settings</h1>
      <button @click=${() => (this.settingsOpen = false)}>Back</button>
    `;
  }

  private startGame() {
    this.remove();
    game.start();
  }

  private launch() {
    // At this point we forced the user to interact with the page
    // so we can now play music.
    game.audioController.playTitleScreenMusic();
    this.loadState = "done";
  }
}
