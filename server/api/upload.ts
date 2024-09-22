import { defineEventHandler, readMultipartFormData } from 'h3';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  console.log(formData);
  
  if (!formData) {
    throw new Error('No form data received');
  }

  const file = formData.find(part => part.name === 'file');

  if (!file || !file.filename) {
    throw new Error('No file uploaded');
  }

  const filename = `${Date.now()}-${file.filename}`;
  const path = join(process.cwd(), 'public', 'uploads', filename);

  await writeFile(path, file.data);

  return { message: 'File uploaded successfully', filename };
});

