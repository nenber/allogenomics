import { promises as fs } from 'fs';
import path from 'path';
import archiver from 'archiver';
import { defineEventHandler, createError } from 'h3'; // Nuxt 3 API utilities

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const pipelinePath = runtimeConfig.public.PIPELINE;
  console.log(pipelinePath);

  const { result } = event.context.params;
  const resultPath = path.resolve(`${pipelinePath}/output/runs/${result}`);
  
  // Liste des mots-clés pour filtrer les fichiers
  const keywords = ['D0', 'R0', 'mismatches', 'transcripts'];
  
  // Créer un stream pour l'archive ZIP
  const zipStream = archiver('zip', {
    zlib: { level: 9 } // Compression maximale
  });
  
  // Définir les headers pour renvoyer un fichier ZIP
  event.node.res.setHeader('Content-Disposition', 'attachment; filename="files.zip"');
  event.node.res.setHeader('Content-Type', 'application/zip');
  
  // Pipe l'archive vers la réponse HTTP
  zipStream.pipe(event.node.res);

  // Lire tous les fichiers dans le répertoire des résultats
  try {
    const files = await fs.readdir(resultPath);
    
    // Filtrer les fichiers en fonction des mots-clés
    for (const file of files) {
      if (keywords.some(keyword => file.includes(keyword))) {
        const filePath = path.join(resultPath, file);
        
        // Vérifiez si le fichier existe avant de l'ajouter
        await fs.access(filePath);
        
        // Ajouter le fichier à l'archive ZIP
        zipStream.file(filePath, { name: file });
        
        // Supprimer le fichier après l'avoir ajouté à l'archive
        try {
          await fs.unlink(filePath); // Supprimer le fichier
        } catch (unlinkError) {
          console.error(`Failed to delete file: ${filePath}`, unlinkError);
        }
      }
    }
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Failed to read files from the directory'
    });
  }
  
  // Finaliser l'archive et fermer le stream
  let res = await zipStream.finalize();
    return {
        value:res
    }
});
