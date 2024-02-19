export default class PathHelper {
  static getMapPath(cardId: string) {
    return `/maps/${cardId}`;
  }

  static getCardPath(cardId: string) {
    return `/cards/${cardId}`;
  }
}
