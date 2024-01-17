import zod from 'zod';

const artSchema = zod.object({
  title: zod.string({
    invalid_type_error: 'Art title must be a string',
    required_error: 'Art title is required.',
  }),
  artist: zod.string(),
  date: zod.string(),
  prompt: zod.string().default('Prompt não informado.'),
  art: zod.string().url({
    message: 'Art must be a valid URL',
  }),
  categories: zod.array(
    zod.enum([
      'Anime',
      'Personagem',
      'Comida',
      'Animais',
      'Ficção Científica',
      'Paisagem',
    ]),
    {
      required_error: 'Art category is required.',
      invalid_type_error: 'Art category must be an array of enum Categories',
    }
  ),
});

export function validateArt(input) {
  return artSchema.safeParse(input);
}

export function validatePartialArt(input) {
  return artSchema.partial().safeParse(input);
}
