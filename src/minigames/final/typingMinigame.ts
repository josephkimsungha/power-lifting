import { Trie, TrieNode } from "@datastructures-js/trie";
import { KeyboardMinigame } from "../keyboardMinigame";
import { Assets, Sprite } from "pixi.js";
import { MINIGAME_ASSET_ALIASES } from "../assets";
import { game } from "../../game";

const TARGET_SENTENCES = [
  "the pain you feel today is the strength you feel tomorrow",
  "no pain no gain no train no muscle #power #grind #alpha",
  "they told me racoons could not do it they said racoons would fail, we ignored them and kept going #bulk #swole",
];

export class TypingMinigame extends KeyboardMinigame {
  protected override tutorialAlias = MINIGAME_ASSET_ALIASES.TYPING_TUTORIAL;
  private trie = new Trie();
  private currentNode?: TrieNode;
  private remainingWords = new Set<string>();
  private leftCol = document.createElement("div");
  private rightCol = document.createElement("div");
  private postText = document.createElement("p");
  protected lifetime = 20_000;

  override async attach() {
    super.attach();

    for (const col of [this.leftCol, this.rightCol]) {
      col.style.position = "absolute";
      col.style.height = `${this.app.screen.height}px`;
      col.style.width = `${this.app.screen.width * 0.3}px`;
      col.style.display = "flex";
      col.style.flexDirection = "column";
      col.style.alignItems = "center";
      col.style.justifyContent = "center";
      col.style.textAlign = "center";
      col.style.gap = "4px";
      col.style.pointerEvents = "none";
    }

    const canvasBB = this.app.canvas.getBoundingClientRect();
    const screenWidth = this.app.screen.width;
    const screenHeight = this.app.screen.height;
    const postWidth = screenWidth * 0.22;
    this.postText.style.padding = "0";
    this.postText.style.position = "absolute";
    this.postText.style.height = `${screenHeight * 0.27}px`;
    this.postText.style.width = `${postWidth}px`;
    this.postText.style.left =
      canvasBB.left +
      screenWidth / 2 -
      postWidth / 2 +
      screenWidth * 0.027 +
      "px";
    this.postText.style.top = canvasBB.top + screenHeight * 0.63 + "px";
    this.postText.style.position = "absolute";
    this.postText.style.fontFamily = `'Poppins'`;
    this.postText.style.fontSize = "var(--font-size-x-sm)";
    this.postText.style.color = "#58676f";
    this.postText.style.textAlign = "center";
    this.postText.style.margin = "0";
    this.postText.style.pointerEvents = "none";
    this.leftCol.style.left = `${canvasBB.left}px`;
    this.rightCol.style.right = `${canvasBB.right - screenWidth}px`;

    document.body.append(this.leftCol, this.rightCol, this.postText);
  }

  override detach() {
    super.detach();

    this.leftCol.remove();
    this.rightCol.remove();
    this.postText.remove();
  }

  protected override async populateContainer() {
    const phonescreenTexture = await Assets.load(
      MINIGAME_ASSET_ALIASES.PHONE_SCREEN,
    );
    const bg = new Sprite(phonescreenTexture);
    bg.setSize(this.app.screen);
    this.container.addChild(bg);

    const postImageTexture = await Assets.load(
      [
        MINIGAME_ASSET_ALIASES.INSTA_POST_1,
        MINIGAME_ASSET_ALIASES.INSTA_POST_2,
        MINIGAME_ASSET_ALIASES.INSTA_POST_3,
      ][this.week],
    );
    const post = new Sprite(postImageTexture);
    const aspectRatio = post.height / post.width;
    const postWidth = this.app.screen.width * 0.22;
    post.width = postWidth;
    post.height = postWidth * aspectRatio;
    post.anchor = 0.5;
    post.x = this.app.screen.width / 2 + this.app.screen.width * 0.028;
    post.y = this.app.screen.height * 0.38;
    this.container.addChild(post);

    this.remainingWords.clear();
    for (const word of TARGET_SENTENCES[this.week].split(" ")) {
      if (this.remainingWords.has(word)) continue;
      this.remainingWords.add(word);
      this.trie.insert(word);
      this.addWordToScreen(word);
      const displayWord = document.createElement("span");
      displayWord.dataset.word = word;
      displayWord.style.opacity = "0";
      displayWord.innerText = word + " ";
      this.postText.append(displayWord);
    }

    this.trie.insert("");
    this.currentNode = this.trie.find("");
  }

  protected override onKeyDown(key: string, e: KeyboardEvent) {
    if (e.repeat) {
      return;
    }
    game.audioController.playTrack("key");
    if (!this.currentNode.hasChild(key)) {
      // No words match the current string. Reset the search from the beginning.
      this.currentNode = this.trie.find("");
      // Try match the key that was just pressed, for a smoother gameplay experience.
      // Note this means we don't support any one-letter words.
      if (this.currentNode.hasChild(key)) {
        this.currentNode = this.currentNode.getChild(key);
      }
      this.highlightSubString(this.getString(this.currentNode));
      return;
    }

    this.currentNode = this.currentNode.getChild(key);
    if (this.currentNode.isEndOfWord()) {
      const word = this.getString(this.currentNode);

      this.remainingWords.delete(word);
      (
        document.querySelector(`[data-word="${word}"]`) as HTMLElement
      ).style.opacity = "1";
      this.currentNode = this.trie.find("");

      if (document.getElementById(word))
        document.getElementById(word).style.opacity = "0.2";
      if (this.remainingWords.size === 0) {
        this.finishMinigame(true, new Promise((r) => setTimeout(r, 2_000)));
      }
    }
    this.highlightSubString(this.getString(this.currentNode));
  }

  private getString(node: TrieNode) {
    let string = "";
    let infiniteLoopPreventer = 999999;
    while (!node.isRoot() && infiniteLoopPreventer-- > 0) {
      string = node.getChar() + string;
      node = node.getParent();
    }
    return string;
  }

  private addWordToScreen(word: string) {
    const target = Math.random() > 0.5 ? this.rightCol : this.leftCol;
    const node = document.createElement("div");
    const substringLayer = document.createElement("div");
    node.id = word;
    for (const n of [node, substringLayer]) {
      n.style.fontFamily = `'Poppins'`;
      n.style.fontSize = "var(--font-size-sm)";
      n.style.fontWeight = "bold";
      n.style.color = "#58676f";
      n.style.position = "relative";
    }

    node.innerText = word;
    substringLayer.style.position = "absolute";
    substringLayer.style.top = "0";
    substringLayer.style.left = "0";
    substringLayer.style.zIndex = "1";
    substringLayer.style.color = "#A0484C";
    substringLayer.innerText = "";
    node.append(substringLayer);
    target.append(node);
  }

  private highlightSubString(substring: string) {
    for (const child of [
      ...Array.from(this.leftCol.children),
      ...Array.from(this.rightCol.children),
    ] as HTMLElement[]) {
      if (
        child.id.startsWith(substring) &&
        this.remainingWords?.has(child.id)
      ) {
        (child.children[0] as HTMLElement).innerText = substring;
      } else {
        (child.children[0] as HTMLElement).innerText = "";
      }
    }
  }
}
