import { Minigame } from "./Minigame";

export class KeyboardMinigame extends Minigame {
  private keyDownListener = (e: KeyboardEvent) => void this.onKeyDown(e.key);

  protected onKeyDown(key: string) {
    console.log(key, 'pressed');
  }

  override attach() {
    super.attach();
    window.addEventListener('keydown', this.keyDownListener);
  }

  override detach() {
    window.removeEventListener('keydown', this.keyDownListener);
    super.detach();
  }
}
