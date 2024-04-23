import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { game } from "./game";

@customElement("main-menu")
export class MainMenu extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      aspect-ratio: 16 / 9;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background: rgb(240, 200, 98);
    }
    .large-title {
      font-family: "Poppins", sans-serif;
      font-size: 12vw;
      position: absolute;
      margin: 0;
      top: 5%;
      color: #d69b04;
    }
    .text-button {
      position: absolute;
      background: none;
      border: none;
      font-size: 3vw;
      font-weight: bold;
      color: #644903;
      cursor: pointer;
      opacity: 60%;
      transition: all 0.25s ease-in-out;
    }
    .text-button:hover {
      opacity: 100%;
    }
    #play-button {
      left: 50%;
      top: 50%;
      padding: 0 15vw 15vw 15vw;
      transform: translate(-50%);
    }
    #settings-button {
      right: 8%;
      top: 35%;
      padding-bottom: 25vw;
    }
    :host([play-hovered]) #play-button {
      opacity: 100%;
    }
    :host([settings-hovered]) #settings-button {
      opacity: 100%;
    }
    .bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .bg svg {
      width: 100%;
      height: 100%;
    }
    #barbell {
      transition: all 0.25s ease-in-out;
    }
    :host([play-hovered]) #barbell {
      transform: translateY(-5%);
    }
    #mirror-sheen {
      transform-origin: 0 0;
      transition: all 0.25s ease-in-out;
    }
    :host([settings-hovered]) #mirror-sheen {
      transform: translate(30px, -40px);
    }
  `;

  @property({ type: Boolean, reflect: true, attribute: "play-hovered" })
  private playHovered = false;
  @property({ type: Boolean, reflect: true, attribute: "settings-hovered" })
  private settingsHovered = false;

  @state()
  private settingsOpen = false;
  /**
   * If the game is currently loading or not. The "loaded" state
   * accounts for the state when all assets are loaded but we are
   * waiting on the user to click "start" to launch the main menu.
   * Note that this state is needed so we can force a user
   * interaction before showing the main menu which will
   * attempt to play audio. Something we can not do before first
   * user interaction.
   * */
  @state()
  private loadState: "loading" | "loaded" | "done" = "loading";

  protected override async firstUpdated() {
    await game.preload();
    this.loadState = "loaded";
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
      <div class="bg">
        <svg
          viewBox="0 0 1600 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_61_2)">
            <rect width="1600" height="900" fill="#F0C862" />
            <rect
              x="-28"
              y="653"
              width="1656"
              height="315"
              fill="#D3AE72"
              stroke="#B3935D"
              stroke-width="10"
            />
            <rect
              x="-4.71411"
              y="862"
              width="1632.71"
              height="106"
              fill="#C7A567"
              stroke="#B3935D"
              stroke-width="10"
            />
            <rect
              x="9.33789"
              y="673"
              width="8"
              height="165"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="73.3379"
              y="673"
              width="8"
              height="165"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="137.338"
              y="715"
              width="8"
              height="123"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="137.338"
              y="673"
              width="8"
              height="36"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="201.338"
              y="673"
              width="8"
              height="165"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="265.338"
              y="673"
              width="8"
              height="122"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="265.338"
              y="802"
              width="8"
              height="36"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="329.338"
              y="715"
              width="8"
              height="123"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="329.338"
              y="673"
              width="8"
              height="36"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="393.338"
              y="673"
              width="8"
              height="68"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="393.338"
              y="747"
              width="8"
              height="36"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="393.338"
              y="789"
              width="8"
              height="49"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="457.338"
              y="673"
              width="8"
              height="165"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="521.338"
              y="673"
              width="8"
              height="165"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="585.338"
              y="715"
              width="8"
              height="123"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="585.338"
              y="673"
              width="8"
              height="36"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="649.338"
              y="673"
              width="8"
              height="165"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="713.338"
              y="673"
              width="8"
              height="122"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="713.338"
              y="802"
              width="8"
              height="36"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="777.338"
              y="673"
              width="8"
              height="122"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="777.338"
              y="802"
              width="8"
              height="36"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="841.338"
              y="673"
              width="8"
              height="68"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="841.338"
              y="747"
              width="8"
              height="36"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="841.338"
              y="789"
              width="8"
              height="49"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="905.338"
              y="673"
              width="8"
              height="165"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="969.338"
              y="673"
              width="8"
              height="165"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1033.34"
              y="715"
              width="8"
              height="123"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1033.34"
              y="673"
              width="8"
              height="36"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1097.34"
              y="673"
              width="8"
              height="165"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1161.34"
              y="673"
              width="8"
              height="122"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1161.34"
              y="802"
              width="8"
              height="36"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1225.34"
              y="673"
              width="8"
              height="122"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1225.34"
              y="802"
              width="8"
              height="36"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1289.34"
              y="673"
              width="8"
              height="68"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1289.34"
              y="747"
              width="8"
              height="36"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1289.34"
              y="789"
              width="8"
              height="49"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1353.34"
              y="715"
              width="8"
              height="123"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1353.34"
              y="673"
              width="8"
              height="36"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1417.34"
              y="673"
              width="8"
              height="68"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1417.34"
              y="747"
              width="8"
              height="36"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1417.34"
              y="789"
              width="8"
              height="49"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1481.34"
              y="673"
              width="8"
              height="165"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="1545.34"
              y="673"
              width="8"
              height="165"
              rx="4"
              fill="#B3935D"
            />
            <rect
              x="152.727"
              y="686.399"
              width="40.9657"
              height="39.3901"
              rx="7.87802"
              fill="#B77938"
              stroke="#835035"
              stroke-width="9.45363"
            />
            <rect
              x="250.414"
              y="686.399"
              width="40.9657"
              height="39.3901"
              rx="7.87802"
              fill="#B77938"
              stroke="#835035"
              stroke-width="9.45363"
            />
            <rect
              x="148"
              y="428"
              width="148.107"
              height="272.58"
              rx="12.6048"
              fill="#DFB97F"
            />
            <path
              d="M148 514.658V687.975C148 694.936 153.643 700.58 160.605 700.58H283.502C290.463 700.58 296.107 694.936 296.107 687.975V440.605C296.107 433.643 290.463 428 283.502 428H160.605C153.643 428 148 433.643 148 440.605V496.145"
              stroke="#835035"
              stroke-width="9.45363"
              stroke-linecap="round"
            />
            <rect
              x="153.563"
              y="447.447"
              width="145.764"
              height="27.9749"
              rx="13.9874"
              fill="#F4D776"
            />
            <path
              d="M179.329 459.436C182.274 458.437 190.814 457.038 201.415 459.436C212.016 461.834 218.101 460.435 219.819 459.436"
              stroke="#EDC76A"
              stroke-width="5.88945"
              stroke-linecap="round"
            />
            <path
              d="M225.708 468.754C228.653 467.755 237.193 466.356 247.794 468.754C258.395 471.152 264.481 469.753 266.198 468.754"
              stroke="#EDC76A"
              stroke-width="5.88945"
              stroke-linecap="round"
            />
            <path
              d="M276.505 460.55C273.56 459.551 265.02 458.152 254.419 460.55C243.818 462.948 237.733 461.549 236.015 460.55"
              stroke="#EDC76A"
              stroke-width="5.88945"
              stroke-linecap="round"
            />
            <path
              d="M178.593 447.447H167.55C159.825 447.447 153.563 453.709 153.563 461.434V461.434C153.563 469.159 159.825 475.422 167.55 475.422H285.339C293.064 475.422 299.327 469.159 299.327 461.434V461.434C299.327 453.709 293.064 447.447 285.339 447.447H190.372"
              stroke="#835243"
              stroke-width="8.83417"
              stroke-linecap="round"
            />
            <circle
              cx="120.435"
              cy="461.435"
              r="39.0176"
              fill="#C9BDA6"
              stroke="#7A4A3B"
              stroke-width="8.83417"
            />
            <circle
              cx="326.565"
              cy="461.435"
              r="39.0176"
              fill="#C9BDA6"
              stroke="#7A4A3B"
              stroke-width="8.83417"
            />
            <mask id="path-57-inside-1_61_2" fill="white">
              <rect x="207" y="469" width="29" height="25" rx="7" />
            </mask>
            <rect
              x="207"
              y="469"
              width="29"
              height="25"
              rx="7"
              fill="#B77938"
              stroke="#835035"
              stroke-width="16"
              mask="url(#path-57-inside-1_61_2)"
            />
            <rect
              x="153.563"
              y="542.447"
              width="145.764"
              height="27.9749"
              rx="13.9874"
              fill="#F4D776"
            />
            <path
              d="M179.329 554.436C182.274 553.437 190.814 552.038 201.415 554.436C212.016 556.834 218.101 555.435 219.819 554.436"
              stroke="#EDC76A"
              stroke-width="5.88945"
              stroke-linecap="round"
            />
            <path
              d="M225.708 563.754C228.653 562.755 237.193 561.356 247.794 563.754C258.395 566.152 264.481 564.753 266.198 563.754"
              stroke="#EDC76A"
              stroke-width="5.88945"
              stroke-linecap="round"
            />
            <path
              d="M276.505 555.55C273.56 554.551 265.02 553.152 254.419 555.55C243.818 557.948 237.733 556.549 236.015 555.55"
              stroke="#EDC76A"
              stroke-width="5.88945"
              stroke-linecap="round"
            />
            <path
              d="M178.593 542.447H167.55C159.825 542.447 153.563 548.709 153.563 556.434V556.434C153.563 564.159 159.825 570.422 167.55 570.422H285.339C293.064 570.422 299.327 564.159 299.327 556.434V556.434C299.327 548.709 293.064 542.447 285.339 542.447H190.372"
              stroke="#835243"
              stroke-width="8.83417"
              stroke-linecap="round"
            />
            <circle
              cx="120.435"
              cy="556.435"
              r="39.0176"
              fill="#C9BDA6"
              stroke="#7A4A3B"
              stroke-width="8.83417"
            />
            <circle
              cx="326.565"
              cy="556.435"
              r="39.0176"
              fill="#C9BDA6"
              stroke="#7A4A3B"
              stroke-width="8.83417"
            />
            <mask id="path-65-inside-2_61_2" fill="white">
              <rect x="207" y="564" width="29" height="25" rx="7" />
            </mask>
            <rect
              x="207"
              y="564"
              width="29"
              height="25"
              rx="7"
              fill="#B77938"
              stroke="#835035"
              stroke-width="16"
              mask="url(#path-65-inside-2_61_2)"
            />
            <rect
              x="153.563"
              y="637.447"
              width="145.764"
              height="27.9749"
              rx="13.9874"
              fill="#F4D776"
            />
            <path
              d="M179.329 649.436C182.274 648.437 190.814 647.038 201.415 649.436C212.016 651.834 218.101 650.435 219.819 649.436"
              stroke="#EDC76A"
              stroke-width="5.88945"
              stroke-linecap="round"
            />
            <path
              d="M225.708 658.754C228.653 657.755 237.193 656.356 247.794 658.754C258.395 661.152 264.481 659.753 266.198 658.754"
              stroke="#EDC76A"
              stroke-width="5.88945"
              stroke-linecap="round"
            />
            <path
              d="M276.505 650.55C273.56 649.551 265.02 648.152 254.419 650.55C243.818 652.948 237.733 651.549 236.015 650.55"
              stroke="#EDC76A"
              stroke-width="5.88945"
              stroke-linecap="round"
            />
            <path
              d="M178.593 637.447H167.55C159.825 637.447 153.563 643.709 153.563 651.434V651.434C153.563 659.159 159.825 665.422 167.55 665.422H285.339C293.064 665.422 299.327 659.159 299.327 651.434V651.434C299.327 643.709 293.064 637.447 285.339 637.447H190.372"
              stroke="#835243"
              stroke-width="8.83417"
              stroke-linecap="round"
            />
            <circle
              cx="120.435"
              cy="651.435"
              r="39.0176"
              fill="#C9BDA6"
              stroke="#7A4A3B"
              stroke-width="8.83417"
            />
            <circle
              cx="326.565"
              cy="651.435"
              r="39.0176"
              fill="#C9BDA6"
              stroke="#7A4A3B"
              stroke-width="8.83417"
            />
            <mask id="path-73-inside-3_61_2" fill="white">
              <rect x="207" y="659" width="29" height="25" rx="7" />
            </mask>
            <rect
              x="207"
              y="659"
              width="29"
              height="25"
              rx="7"
              fill="#B77938"
              stroke="#835035"
              stroke-width="16"
              mask="url(#path-73-inside-3_61_2)"
            />
            <rect
              x="535.727"
              y="667.727"
              width="530.546"
              height="61.5464"
              rx="7.87802"
              fill="#B77938"
              stroke="#835035"
              stroke-width="9.45363"
            />
            <g id="barbell">
              <rect
                x="728.563"
                y="620.447"
                width="145.764"
                height="27.9749"
                rx="13.9874"
                fill="#F4D776"
              />
              <path
                d="M754.329 632.436C757.274 631.437 765.814 630.038 776.415 632.436C787.016 634.834 793.101 633.435 794.819 632.436"
                stroke="#EDC76A"
                stroke-width="5.88945"
                stroke-linecap="round"
              />
              <path
                d="M800.708 641.754C803.653 640.755 812.193 639.356 822.794 641.754C833.395 644.152 839.481 642.753 841.198 641.754"
                stroke="#EDC76A"
                stroke-width="5.88945"
                stroke-linecap="round"
              />
              <path
                d="M851.505 633.55C848.56 632.551 840.02 631.152 829.419 633.55C818.818 635.948 812.733 634.549 811.015 633.55"
                stroke="#EDC76A"
                stroke-width="5.88945"
                stroke-linecap="round"
              />
              <path
                d="M753.593 620.447H742.55C734.825 620.447 728.563 626.709 728.563 634.434V634.434C728.563 642.159 734.825 648.422 742.55 648.422H860.339C868.064 648.422 874.327 642.159 874.327 634.434V634.434C874.327 626.709 868.064 620.447 860.339 620.447H765.372"
                stroke="#835243"
                stroke-width="8.83417"
                stroke-linecap="round"
              />
              <circle
                cx="695.435"
                cy="634.435"
                r="39.0176"
                fill="#C9BDA6"
                stroke="#7A4A3B"
                stroke-width="8.83417"
              />
              <circle
                cx="901.565"
                cy="634.435"
                r="39.0176"
                fill="#C9BDA6"
                stroke="#7A4A3B"
                stroke-width="8.83417"
              />
            </g>
            <rect
              x="1296.73"
              y="679.399"
              width="40.9657"
              height="39.3901"
              rx="7.87802"
              fill="#B77938"
              stroke="#835035"
              stroke-width="9.45363"
            />
            <rect
              x="1394.41"
              y="679.399"
              width="40.9657"
              height="39.3901"
              rx="7.87802"
              fill="#B77938"
              stroke="#835035"
              stroke-width="9.45363"
            />
            <rect
              x="1292"
              y="421"
              width="148.107"
              height="272.58"
              rx="12.6048"
              fill="#C3D2D6"
            />
            <path
              d="M1292 507.658V680.975C1292 687.936 1297.64 693.58 1304.6 693.58H1427.5C1434.46 693.58 1440.11 687.936 1440.11 680.975V433.605C1440.11 426.643 1434.46 421 1427.5 421H1304.6C1297.64 421 1292 426.643 1292 433.605V489.145"
              stroke="#835035"
              stroke-width="9.45363"
              stroke-linecap="round"
            />
            <mask
              id="mask0_61_2"
              style="mask-type:alpha"
              maskUnits="userSpaceOnUse"
              x="1295"
              y="426"
              width="140"
              height="262"
            >
              <rect
                x="1295"
                y="426"
                width="140"
                height="262"
                rx="6"
                fill="#C3D2D6"
              />
            </mask>
            <g mask="url(#mask0_61_2)">
              <g id="mirror-sheen">
                <rect
                  width="14.0505"
                  height="16.5682"
                  rx="7.02523"
                  transform="matrix(0.709637 0.704568 -0.709637 0.704568 1427.62 595)"
                  fill="white"
                  fill-opacity="0.68"
                />
                <rect
                  width="14.0505"
                  height="241.245"
                  rx="7.02523"
                  transform="matrix(0.709637 0.704568 -0.709637 0.704568 1412.1 610.635)"
                  fill="white"
                  fill-opacity="0.68"
                />
                <rect
                  width="160.272"
                  height="253.774"
                  rx="16"
                  transform="matrix(0.709637 0.704568 -0.709637 0.704568 1495.05 561.645)"
                  fill="white"
                  fill-opacity="0.68"
                />
              </g>
            </g>
          </g>
          <defs>
            <clipPath id="clip0_61_2">
              <rect width="1600" height="900" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <h1 class="large-title">Power Lifter</h1>
      <button
        @click=${this.startGame}
        @mouseenter=${() => (this.playHovered = true)}
        @mouseleave=${() => (this.playHovered = false)}
        id="play-button"
        class="text-button"
      >
        Play
      </button>
      <button
        @mouseenter=${() => (this.settingsHovered = true)}
        @mouseleave=${() => (this.settingsHovered = false)}
        @click=${() => (this.settingsOpen = true)}
        id="settings-button"
        class="text-button"
      >
        Settings
      </button>
    `;
  }

  private renderLoadingScreen() {
    return html`<h1 class="large-title">Loading...</h1> `;
  }

  private renderLoadedScreen() {
    return html`
      <h1 class="large-title">Loaded.</h1>
      <button class="text-button" @click=${this.launch}>Start</button>
    `;
  }

  private renderSettings() {
    return html`
      <h1 class="large-title">Settings</h1>
      <button class="text-button" @click=${() => (this.settingsOpen = false)}>
        Back
      </button>
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
