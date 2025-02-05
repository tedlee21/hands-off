import Hand from './hand.js'

export default class RightHand extends Hand {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture, false);
    }
}