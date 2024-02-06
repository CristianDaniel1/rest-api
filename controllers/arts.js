import { ArtModel } from '../models/local-file-system/art.js';
import { validateArt, validatePartialArt } from '../schemas/arts.js';

export class ArtController {
  static async getAll(req, res) {
    const { categories } = req.query;
    const arts = await ArtModel.getAll({ categories });

    res.json(arts);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const art = await ArtModel.getById({ id });

    if (art) return res.json(art);

    res.status(404).json({ message: 'Art not Found' });
  }

  static async create(req, res) {
    const result = validateArt(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newArt = await ArtModel.create({ input: result.data });

    res.status(201).json(newArt);
  }

  static async delete(req, res) {
    const { id } = req.params;

    const result = await ArtModel.delete({ id });

    if (!result) {
      return res.status(404).json({ message: 'Art not Found' });
    }

    return res.json({ message: 'Art deleted' });
  }

  static async update(req, res) {
    const result = validatePartialArt(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updatedArt = await ArtModel.update({ id, input: result.data });

    return res.json(updatedArt);
  }
}
