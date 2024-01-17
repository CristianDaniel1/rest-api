import { randomUUID } from 'node:crypto';
import { readJSON } from '../../utils.js';

const arts = readJSON('./arts.json');

export class ArtModel {
  static async getAll({ categories }) {
    if (categories) {
      return arts.filter(art =>
        art.categories.some(
          cate => cate.toLowerCase() === categories.toLowerCase()
        )
      );
    }

    return arts;
  }

  static async getById({ id }) {
    const art = arts.find((art = art.id === id));
    return art;
  }

  static async create({ input }) {
    const newArt = {
      id: randomUUID(),
      ...input,
    };

    // depois ajustar
    arts.push(newArt);

    return newArt;
  }

  static async delete({ id }) {
    const artIndex = arts.findIndex(art => art.id === id);

    if (artIndex === -1) return false;

    arts.splice(artIndex, 1);
    return true;
  }

  static async update({ id, input }) {
    const artIndex = arts.findIndex(art => art.id === id);

    if (artIndex === -1) return false;

    arts[artIndex] = {
      ...arts[artIndex],
      ...input,
    };

    return arts[artIndex];
  }
}
