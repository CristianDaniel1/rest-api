import { Router } from 'express';

import { ArtController } from '../controllers/arts.js';

export const artsRouter = Router();

artsRouter.get('/', ArtController.getAll);
artsRouter.post('/', ArtController.create);

artsRouter.get('/:id', ArtController.getById);
artsRouter.delete('/:id', ArtController.delete);
artsRouter.patch('/:id', ArtController.update);
