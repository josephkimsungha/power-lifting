import { Trie, TrieNode } from "@datastructures-js/trie";
import { KeyboardMinigame } from "./keyboardMinigame";
import { Point, Text, TextStyle } from "pixi.js";

// TODO: Update this list later.
const ALL_WORDS = ["act", "ale", "all", "and", "ball", "bang", "bat"];

export class TypingMinigame extends KeyboardMinigame {
  private trie = new Trie();
  private currentNode?: TrieNode;
  private remainingWords = new Set(ALL_WORDS);

  protected override populateContainer(): void {
    ALL_WORDS.forEach((word) => {
      this.trie.insert(word);

      const text = new Text({
        label: word,
        text: word,
        style: new TextStyle({ fill: "#de3249" }),
      });

      const x = (this.app.screen.width - 100) * Math.random() + 50;
      const y = (this.app.screen.height - 100) * Math.random() + 50;
      text.position = new Point(x, y);

      this.container.addChild(text);
    });

    this.trie.insert("");
    this.currentNode = this.trie.find("");
  }

  protected override onKeyDown(key: string) {
    if (!this.currentNode.hasChild(key)) {
      // No words match the current string. Reset the search from the beginning.
      this.currentNode = this.trie.find("");
      // Try match the key that was just pressed, for a smoother gameplay experience.
      // Note this means we don't support any one-letter words.
      if (this.currentNode.hasChild(key)) {
        this.currentNode = this.currentNode.getChild(key);
      }
      return;
    }

    this.currentNode = this.currentNode.getChild(key);
    if (this.currentNode.isEndOfWord()) {
      const word = this.getString(this.currentNode);
      const text = this.container.getChildByLabel(word);
      text.alpha = 0.2;

      this.remainingWords.delete(word);
      if (this.remainingWords.size === 0) {
        this.finishMinigame(true);
      }
    }
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
}