import Hand from "./hand";

export default class LeftHand extends Hand {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture, true);
    }
}